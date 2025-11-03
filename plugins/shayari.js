const axios = require("axios");
const { cmd } = require('../command');

cmd({
  pattern: "shayari",
  alias: ["sadshayari"],
  desc: "Send 5 Urdu Shayari 💫",
  category: "fun",
  react: "💫",
  filename: __filename
},
async (conn, mek, m, { from, reply, text }) => {
  try {
    const args = text ? text.split(" ") : [];
    const category = args[0]?.toLowerCase() || "sad";
    const lang = args[1]?.toLowerCase() || "roman";

    const categoryMap = {
      sad: "shayari",
      romantic: "romantic",
      funny: "funny",
      attitude: "attitude"
    };
    const selected = categoryMap[category] || "shayari";
    const apiUrl = `https://api.giftedtech.co.ke/api/fun/${selected}?apikey=gifted`;

    // helper to translate via meta-llama
    const toUrdu = async (txt) => {
      try {
        const res = await axios.get(
          `https://api.giftedtech.co.ke/api/ai/meta-llama?apikey=gifted&q=Translate this to Urdu: ${encodeURIComponent(txt)}`
        );
        return res.data.result || txt;
      } catch {
        return txt;
      }
    };

    let msg = `💫 *${category.toUpperCase()} SHAYARI COLLECTION* 💫\n\n`;
    for (let i = 0; i < 5; i++) {
      const res = await axios.get(apiUrl);
      let line = res.data.result || "";
      if (lang === "urdu") line = await toUrdu(line);
      msg += `🌙 *${i + 1}.* ${line}\n\n`;
    }
    msg += "💫✨ ᴾᵒʷᵉʳᵉᵈ ᵇʸ *𝐹𝒶𝒾𝓏𝒶𝓃-𝒜𝒾* ✨💫";
    await conn.sendMessage(from, { text: msg }, { quoted: mek });
  } catch (e) {
    console.error(e);
    reply("⚠️ Urdu translation error!");
  }
});
