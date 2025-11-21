const { cmd } = require('../command');

const reacts = ["🏓", "⚡", "🔥", "💥", "🚀", "✨", "💫", "🎯", "⚙️", "🌪️"];

cmd({
    pattern: "ping",
    alias: ["p", "pg", "speed", "fast"],
    react: "⚡",
    desc: "Smart ping with style, reacts & edit.",
    category: "info",
    filename: __filename
}, async (conn, m, store, { reply }) => {
    try {
        // RANDOM REACT EVERY TIME
        const randomReact = reacts[Math.floor(Math.random() * reacts.length)];
        await conn.sendMessage(m.chat, {
            react: { text: randomReact, key: m.key }
        });

        // USER NAME STYLISH 🌟
        const name = m.pushName || "User";
        const fancyName = `✨『 *${name}* 』✨`;

        const start = Date.now();

        // FIRST MESSAGE
        let sent = await conn.sendMessage(m.chat, {
            text: `🏓 *Pinging...*\n${fancyName}`
        }, { quoted: m });

        await new Promise(r => setTimeout(r, 700));

        const end = Date.now();
        const ping = end - start;

        // EDIT SAME MESSAGE
        await conn.sendMessage(m.chat, {
            text: `⚡ *Ping:* \`${ping}ms\`\n🔥 Speed Stable!\n${fancyName}`,
            edit: sent.key
        });

    } catch (e) {
        console.error(e);
        reply("❌ Ping Error!");
    }
});
