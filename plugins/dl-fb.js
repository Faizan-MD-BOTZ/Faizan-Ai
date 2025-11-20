const axios = require("axios");
const { cmd } = require("../command");

cmd({
  pattern: "fb",
  alias: ["facebook", "fbdl"],
  desc: "Download Facebook videos",
  category: "download",
  filename: __filename,
  use: "<Facebook URL>",
}, async (conn, m, store, { from, args, q, reply }) => {
  try {
    if (!q || !q.startsWith("http")) {
      return reply("*`Need a valid Facebook URL`*\n\nExample: `.fb https://www.facebook.com/...`");
    }

    await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });

    // ✅ ONLY THIS LINE CHANGED (Correct API)
    const apiUrl = `https://api.giftedtech.co.ke/api/download/facebook?apikey=gifted&url=${encodeURIComponent(q)}`;

    const { data } = await axios.get(apiUrl);

    if (!data.status || !data.data || !data.data.url) {
      return reply("❌ Failed to fetch the video. Please try another link.");
    }

    const videoUrl = data.data.url;

    await conn.sendMessage(from, {
      video: { url: videoUrl },
      caption: "📥 *Facebook Video Downloaded*\n\n- *© 𝙿𝙾𝚆𝙴𝚁𝙴𝙳 𝙱𝚈 𝔽𝕒𝕚𝕫𝕒𝕟-𝔸𝕚 ❣️*",
    }, { quoted: m });

  } catch (error) {
    console.error("Error:", error);
    reply("❌ Error fetching the video. Please try again.");
  }
});
