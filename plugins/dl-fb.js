const axios = require("axios");
const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");
const { cmd } = require("../command");
const { Parser } = require("m3u8-parser");
const child_process = require("child_process");

function runFFmpeg(inputUrl, outPath) {
  return new Promise((resolve, reject) => {
    // -y overwrite, -c copy to avoid re-encode when possible
    const ff = child_process.spawn("ffmpeg", [
      "-y",
      "-i", inputUrl,
      "-c", "copy",
      outPath
    ]);

    ff.on("close", (code) => {
      if (code === 0) return resolve();
      return reject(new Error("ffmpeg exit code " + code));
    });
    ff.on("error", (err) => reject(err));
  });
}

async function tryGetM3U8(url) {
  try {
    const r = await axios.get(url, { headers: { "User-Agent": "Mozilla/5.0" }, timeout: 20000 });
    const body = r.data;
    // naive find m3u8 in page
    const m = body.match(/https?:\/\/[^'"\s]+\.m3u8[^'"\s]*/i);
    if (m) return m[0];
  } catch (e) {}
  return null;
}

async function tryGetDirectFromJson(pageHtml) {
  try {
    // sometimes facebook embeds JSON with "playable_url", "playable_url_quality_hd", etc.
    const jsonMatch = pageHtml.match(/(\{\"config\"\:{"*[^]*?}\})/m) || pageHtml.match(/(window\.__INITIAL_STATE__\s*=\s*\{[^]*?\};)/m);
    if (!jsonMatch) return null;
    const txt = jsonMatch[0];
    // find playable URLs
    const urlMatchHd = txt.match(/playable_url_quality_hd\":\"(https?:\\\/\\\/[^\"]+)\"/);
    const urlMatchSd = txt.match(/playable_url\":\"(https?:\\\/\\\/[^\"]+)\"/);
    if (urlMatchHd) {
      return urlMatchHd[1].replace(/\\\//g, "/");
    }
    if (urlMatchSd) {
      return urlMatchSd[1].replace(/\\\//g, "/");
    }
  } catch (e) {}
  return null;
}

async function extractFromOgTags(html) {
  try {
    const $ = cheerio.load(html);
    let ogVideo = $('meta[property="og:video:secure_url"]').attr('content')
      || $('meta[property="og:video"]').attr('content')
      || $('meta[property="og:video:url"]').attr('content');
    if (ogVideo) return ogVideo;
  } catch (e) {}
  return null;
}

cmd({
  pattern: "fb",
  alias: ["facebook", "fbdl"],
  desc: "Download Facebook videos (custom scraper, no API)",
  category: "download",
  filename: __filename,
  use: "<Facebook URL>",
}, async (conn, m, store, { from, args, q, reply }) => {
  try {
    if (!q || !q.startsWith("http")) {
      return reply("*`Need a valid Facebook URL`*\n\nExample: `.fb https://www.facebook.com/...`");
    }

    // Clean the URL: remove extra query params (fb share params can break extractors)
    let cleanUrl = q.split('?')[0];
    // Common share -> watch conversion
    // Example: https://www.facebook.com/share/v/ID/  -> https://www.facebook.com/watch/?v=ID
    const shareMatch = cleanUrl.match(/facebook\.com\/share\/v\/([0-9A-Za-z_-]+)/i);
    if (shareMatch) {
      cleanUrl = `https://www.facebook.com/watch/?v=${shareMatch[1]}`;
    }

    await conn.sendMessage(from, { react: { text: '🔄', key: m.key } });

    // 1) Try fetch page HTML
    let pageHtml = "";
    try {
      const pageResp = await axios.get(cleanUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
          "Accept-Language": "en-US,en;q=0.9"
        },
        timeout: 20000
      });
      pageHtml = pageResp.data;
    } catch (err) {
      console.error("Error fetching page:", err.message);
      return reply("❌ Could not fetch Facebook page. The content may be private or blocked.");
    }

    // 2) Try multiple extract methods (HD preferred)
    // a) OG tags
    let videoUrl = await extractFromOgTags(pageHtml);

    // b) JSON embedded playable_url fields
    if (!videoUrl) videoUrl = await tryGetDirectFromJson(pageHtml);

    // c) try find any mp4 direct link in HTML
    if (!videoUrl) {
      const mp4Match = pageHtml.match(/https?:\/\/[^"']+\.mp4[^"'\s]*/i);
      if (mp4Match) videoUrl = mp4Match[0];
    }

    // d) try m3u8
    let m3u8 = null;
    if (!videoUrl) {
      m3u8 = await tryGetM3U8(cleanUrl);
      if (m3u8) {
        // if we found m3u8, use ffmpeg to download
      }
    }

    // If still nothing, attempt to fetch mobile basic version (sometimes easier)
    if (!videoUrl && !m3u8) {
      try {
        const mbUrl = cleanUrl.replace("www.facebook.com", "m.facebook.com");
        const r = await axios.get(mbUrl, { headers: { "User-Agent": "Mozilla/5.0" }, timeout: 15000 });
        const mbHtml = r.data;
        const mbMp4 = mbHtml.match(/https?:\/\/[^\s'"]+\.mp4[^\s'"]*/i);
        if (mbMp4) videoUrl = mbMp4[0];
      } catch (e) {}
    }

    if (!videoUrl && !m3u8) {
      return reply("❌ Couldn't extract a direct video URL. The post may be private, region-locked or Facebook changed its layout.");
    }

    // Send thumbnail image from your uploaded file (local path). Developer note: use this path as-is.
    const localThumb = "/mnt/data/A_digital_screenshot_captures_a_WhatsApp_chat_inte.png";
    if (fs.existsSync(localThumb)) {
      try {
        await conn.sendMessage(from, { image: { url: localThumb }, caption: "🔎 Extracting video..." }, { quoted: m });
      } catch (e) {
        console.warn("Could not send local thumbnail:", e.message);
      }
    }

    // Prepare temp folder and file
    const tmpDir = path.join(process.cwd(), "tmp");
    if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });
    const outFile = path.join(tmpDir, `fb_${Date.now()}.mp4`);

    if (videoUrl) {
      // If we have a direct mp4 link, download it
      const writer = fs.createWriteStream(outFile);
      const resp = await axios({
        method: "GET",
        url: videoUrl,
        responseType: "stream",
        headers: { "User-Agent": "Mozilla/5.0" },
        timeout: 60000
      });

      resp.data.pipe(writer);

      await new Promise((resolve, reject) => {
        writer.on("finish", resolve);
        writer.on("error", reject);
      });

    } else if (m3u8) {
      // Use ffmpeg to convert m3u8 -> mp4
      try {
        await runFFmpeg(m3u8, outFile);
      } catch (e) {
        console.error("ffmpeg failed:", e);
        return reply("❌ Failed to download HLS stream (ffmpeg error). Ensure ffmpeg is installed on the server.");
      }
    }

    // Validate file
    if (!fs.existsSync(outFile) || fs.statSync(outFile).size === 0) {
      return reply("❌ Download failed or file is empty.");
    }

    // Send video to user
    await conn.sendMessage(from, {
      video: { url: outFile },
      mimetype: "video/mp4",
      caption: "📥 Downloaded via custom scraper (no API)."
    }, { quoted: m });

    // Clean up
    try { fs.unlinkSync(outFile); } catch (e) {}

  } catch (error) {
    console.error("Error in FB command (scraper):", error);
    reply("❌ An error occurred while processing the link.");
  }
});
