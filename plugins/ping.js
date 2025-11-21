const { cmd } = require('../command');

cmd({
    pattern: "ping",
    alias: ["p", "pg", "speed", "fast"],
    react: "🏓",
    desc: "Smart animated ping with edit effect.",
    category: "info",
    filename: __filename
}, async (conn, m, store, { reply }) => {
    try {
        const start = Date.now();

        // Send first message
        let sent = await conn.sendMessage(m.chat, {
            text: "🏓 *Pinging...*"
        }, { quoted: m });

        // Wait for 600ms
        await new Promise(resolve => setTimeout(resolve, 600));

        const end = Date.now();
        const ping = end - start;

        // EDIT THE SAME MESSAGE
        await conn.sendMessage(
            m.chat,
            {
                text: `⚡ *Ping:* \`${ping}ms\`\n🔥 Speed Stable!`,
                edit: sent.key
            }
        );

    } catch (e) {
        console.error(e);
        reply("❌ Ping Error!");
    }
});
