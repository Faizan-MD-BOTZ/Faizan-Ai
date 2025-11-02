const axios = require("axios");
const { cmd } = require("../command");

cmd({
    pattern: "wallpaper",
    alias: ["hdwallpaper", "wp"],
    use: ".wallpaper <search>",
    desc: "Search and send HD wallpapers (Free API - working)",
    category: "image",
    react: "🖼️",
    filename: __filename
},
async (conn, mek, m, { from, args, reply, q }) => {
    try {
        const text = q || args.join(" ");
        if (!text) return reply("❌ Please type something!\nExample: *.wallpaper car*");

        // New working API (no key needed)
        const apiUrl = `https://api.pexels.com/v1/search?query=${encodeURIComponent(text)}&per_page=1`;

        // Free API key from Pexels (you can make your own)
        const headers = { Authorization: "No5JSekjq2BoLAR3ijQD8hVs0ROq6wGybQBVhTOf8o4OspGwRimd4QlL" };

        const res = await axios.get(apiUrl, { headers });
        if (!res.data.photos || res.data.photos.length === 0) return reply("⚠️ No wallpaper found!");

        const imageUrl = res.data.photos[0].src.original;

        await conn.sendMessage(from, {
            image: { url: imageUrl },
            caption: `🖼️ *HD Wallpaper for:* ${text}\n> Source: Pexels`
        }, { quoted: mek });

    } catch (e) {
        console.error(e);
        reply(`⚠️ Error fetching wallpaper: ${e.message}`);
    }
});
