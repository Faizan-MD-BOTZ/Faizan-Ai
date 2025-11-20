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
    // Check if a URL is provided
    if (!q || !q.startsWith("http")) {
      return reply("*`Need a valid Facebook URL`*\n\nExample: `.fb https://www.facebook.com/...`");
    }

    // Add a loading react
    await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });

    // Fetch video URL from the API
    const apiUrl = `https://api.giftedtech.co.ke/api/download/facebook?apikey=gifted&url=https%3A%2F%2Fwww.facebook.com%2Freel%2F402579285704851%3Fmibextid%3DrS40aB7S9Ucbxw6v{encodeURIComponent(q)}`;
    const { data } = await axios.get(apiUrl);

    // Check if the API response is valid
    if (!data.status || !data.data || !data.data.url) {
      return reply("❌ Failed to fetch the video. Please try another link.");
    }

    // Send the video to the user
    const videoUrl = data.data.url;
    await conn.sendMessage(from, {
      video: { url: videoUrl },
      caption: "📥 *Facebook Video Downloaded*\n\n- *© 𝙿𝙾𝚆𝙴𝚁𝙴𝙳 𝙱𝚈 𝔽𝕒𝕚𝕫𝕒𝕟-𝔸𝕚 ❣️*",
    }, { quoted: m });

  } catch (error) {
    console.error("Error:", error); // Log the error for debugging
    reply("❌ Error fetching the video. Please try again.");
  }
});
