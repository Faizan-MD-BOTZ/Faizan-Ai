const axios = require("axios");
const { cmd } = require("../command");

cmd({
  pattern: "fb",
  alias: ["facebook", "fbdl"],
  react: '📥',
  desc: "Download videos from Facebook (API vreden)",
  category: "download",
  use: ".fb5 <Facebook video URL>",
  filename: __filename
}, async (conn, mek, m, { from, reply, args }) => {
  try {
    const fbUrl = args[0];
    if (!fbUrl || !fbUrl.includes("facebook.com")) {
      return reply('❌ Please provide a valid Facebook video URL.\n\nExample:\n.fb5 https://facebook.com/...');
    }

    // React loading
    await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });

    // --- API URL (FIXED) ---
    const apiUrl = `https://api.vreden.my.id/api/v1/download/facebook?url=${encodeURIComponent(fbUrl)}`;
    const { data } = await axios.get(apiUrl);

    if (!data || data.status !== 200 || !data.data) {
      await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
      return reply('❌ Failed to fetch video. API error.');
    }

    // Extract HD/SD URLs
    const result = data.data;
    let videoUrl = result.hd || result.sd;
    let quality = result.hd ? "HD" : "SD";

    if (!videoUrl) {
      await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
      return reply("❌ Couldn't find a downloadable video link.");
    }

    await reply(`📤 *downloading video...*`);

    await conn.sendMessage(from, {
      video: { url: videoUrl },
      caption: `by Rahman md`
    }, { quoted: mek });

    await conn.sendMessage(from, { react: { text: '✅', key: m.key } });

  } catch (error) {
    console.error('FB Downloader Error:', error);
    await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
    reply('⚠️ An error occurred while processing your request. Try again later.');
  }
});
  
