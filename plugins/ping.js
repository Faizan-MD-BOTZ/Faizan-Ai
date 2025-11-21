const { cmd } = require('../command');

cmd({
    pattern: "ping",
    alias: ["p", "pg", "speed", "fast"],
    desc: "Smart animated ping with edit effect + multi-react.",
    category: "info",
    filename: __filename
}, async (conn, m, store, { reply }) => {
    try {

        // 🔥 BIG LIST OF RANDOM EMOJIS
        const reacts = [
            "🏓", "⚡", "🔥", "🚀", "💥", "✨", "⚡", "💫", 
            "🌀", "🌟", "⭐", "🔮", "🎯", "🎉", "💨"
        ];

        // 🔄 Har baar random reaction
        const randomReact = reacts[Math.floor(Math.random() * reacts.length)];

        // Send react
        await conn.sendMessage(m.chat, { react: { text: randomReact, key: m.key } });

        const start = Date.now();

        // First message
        let sent = await conn.sendMessage(m.chat, {
            text: `${randomReact} *Pinging...*`
        }, { quoted: m });

        // Delay
        await new Promise(res => setTimeout(res, 600));

        const end = Date.now();
        const ping = end - start;

        // Final EDIT message
        await conn.sendMessage(
            m.chat,
            {
                text: `⚡ *Ping:* \`${ping}ms\`\n🔥 *Speed Stable!*`,
                edit: sent.key
            }
        );

    } catch (e) {
        console.error(e);
        reply("❌ Ping Error!");
    }
});
