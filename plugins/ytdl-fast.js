const { cmd } = require("../command");
const fetch = require("node-fetch");
const yts = require("yt-search");

// =========================
//   PLAY / SONG / MP3
// =========================

cmd({
  pattern: "play",
  alias: ["song", "mp3"],
  desc: "Download YouTube Audio",
  category: "downloader",
  react: "✅",
  filename: __filename
}, async (sock, mek, m, { from, q, reply }) => {
  try {
    if (!q) {
      return reply("Please provide a YouTube link or search query.\n\nExample: .play Pasoori");
    }

    let url;
    if (q.includes("youtube.com") || q.includes("youtu.be")) {
      url = q;
    } else {
      let search = await yts(q);
      if (!search.videos || search.videos.length === 0) {
        return reply("No results found.");
      }
      url = search.videos[0].url;
    }

    let res = await fetch('https://gtech-api-xtp1.onrender.com/api/audio/yt?apikey=APIKEY&url=' + encodeURIComponent(url));
    let data = await res.json();

    if (!data.status) {
      return reply("Failed to fetch audio.");
    }

    let audioURL = data.result.media.audio_url;

    await sock.sendMessage(from, {
      audio: { url: audioURL },
      mimetype: "audio/mpeg",
      ptt: false
    }, { quoted: mek });

  } catch (err) {
    reply("❌ Error while fetching audio.");
    console.log(err);
  }
});


// =========================
//     VIDEO / VID / YTV
// =========================

cmd({
  pattern: "video",
  alias: ["vid", "ytv"],
  desc: "Download YouTube Video",
  category: "downloader",
  react: "🪄",
  filename: __filename
}, async (sock, mek, m, { from, q, reply }) => {
  try {
    if (!q) {
      return reply("Please provide a YouTube link or search query.\n\nExample: .video Pasoori");
    }

    let url;

    // If direct link
    if (q.includes("youtube.com") || q.includes("youtu.be")) {
      url = q;
    } else {
      // Search query
      let search = await yts(q);
      if (!search.videos || search.videos.length === 0) {
        return reply("No results found.");
      }
      url = search.videos[0].url;
    }

    // Fetch details first
    let info = await yts(url);
    let video = info.videos[0];

    let title = video.title || "Unknown Title";
    let channel = video.author?.name || "Unknown Channel";
    let views = video.views || "N/A";
    let thumbnail = video.thumbnail;

    // Send preview
    await sock.sendMessage(from, {
      image: { url: thumbnail },
      caption: `🎬 *${title}*\n📺 *${channel}*\n👁️ *Views:* ${views}`
    });

    // Fetch downloadable video
    let res = await fetch("https://gtech-api-xtp1.onrender.com/api/video/yt?apikey=APIKEY&url=" + encodeURIComponent(url));
    let json = await res.json();

    if (!json.status) return reply("Failed to fetch video.");

    let { video_url_hd, video_url_sd } = json.result.media;

    let finalURL = video_url_hd !== "No HD video URL available" ? video_url_hd : video_url_sd;

    if (!finalURL || finalURL.includes("No")) {
      return reply("No downloadable video found.");
    }

    // Send final video
    await sock.sendMessage(from, {
      video: { url: finalURL },
      caption: `${title}`
    }, { quoted: mek });

  } catch (err) {
    reply("Error while fetching video.");
    console.log(err);
  }
});
