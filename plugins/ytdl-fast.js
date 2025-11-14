const { cmd } = require("../command");
const fetch = require("node-fetch");
const yts = require("yt-search");

/*━━━━━━━━━━━━━━━◆ PLAY (MP3) ◆━━━━━━━━━━━━━━━━*/

cmd({
  pattern: "play",
  alias: ["song", "mp3"],
  desc: "Download YouTube audio in high quality",
  category: "downloader",
  react: "🎧",
  filename: __filename
}, 
async (conn, mek, m, { from, q, reply }) => {
  try {
    if (!q) return reply("🎧 *Please enter a song name or YouTube link.*\n\nExample: `.play Pasoori`");

    // search if no link
    let url;
    if (q.includes("youtube.com") || q.includes("youtu.be")) {
      url = q;
    } else {
      let search = await yts(q);
      if (!search.videos.length) return reply("❌ No results found.");
      url = search.videos[0].url;
    }

    let api = `https://api.giftedtech.co.ke/api/download/ytmp3?apikey=gifted&url=${encodeURIComponent(url)}&quality=128`;

    let res = await fetch(api);
    let data = await res.json();

    if (!data.status) return reply("❌ Error: Unable to fetch MP3.");

    await conn.sendMessage(from, {
      audio: { url: data.result.download_url },
      mimetype: "audio/mpeg"
    }, { quoted: mek });

  } catch (err) {
    console.log(err);
    reply("❌ Error while downloading audio.");
  }
});


/*━━━━━━━━━━━━━━━◆ VIDEO (MP4) ◆━━━━━━━━━━━━━━━━*/

cmd({
  pattern: "video",
  alias: ["ytv", "vid"],
  desc: "Download YouTube video",
  category: "downloader",
  react: "🎬",
  filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
  try {
    if (!q) return reply("🎬 *Please enter a video name or link.*\n\nExample: `.video Alone Marshmello`");

    let url;
    if (q.includes("youtube.com") || q.includes("youtu.be")) {
      url = q;
    } else {
      let search = await yts(q);
      if (!search.videos.length) return reply("❌ No results found.");
      url = search.videos[0].url;
    }

    let api = `https://api.giftedtech.co.ke/api/download/ytmp4?apikey=gifted&url=${encodeURIComponent(url)}&quality=720`;

    let res = await fetch(api);
    let data = await res.json();

    if (!data.status) return reply("❌ Error: Unable to fetch video.");

    await conn.sendMessage(from, {
      video: { url: data.result.download_url },
      caption: `✨ *𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 𝐅𝐚𝐢𝐳𝐚𝐧-𝐀𝐈 𝐎𝐟𝐟𝐢𝐜𝐢𝐚𝐥* ✨`
    }, { quoted: mek });

  } catch (err) {
    console.log(err);
    reply("❌ Error while downloading video.");
  }
});
