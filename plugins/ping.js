const { cmd } = require('../command');

cmd({
    pattern: "ping",
    alias: ["p", "pg", "speed", "fast"],
    react: "🏓",
    desc: "Smart animated ping with edit effect + random react + username.",
    category: "info",
    filename: __filename
}, async (conn, m, store, { reply }) => {
    try {

        const pushname = m.pushName || "User";

        // RANDOM REACT EMOJIS LIST
        const reacts = ["🏓", "⚡", "🔥", "🚀", "💥", "✨", "🌟", "💫", "🎯", "⚡", "⚙️"];

        // Pick random reaction every time ping runs
        const randomReact = reacts[Math.floor(Math.random() * reacts.length)];

        // Send reaction
        await conn.sendMessage(m.chat, {
            react: {
                text: randomReact,
                key: m.key
            }
        });

        const start = Date.now();

        // First message (Before edit)
        let sent = await conn.sendMessage(m.chat, {
            text: `🏓 *Pinging...*`
        }, { quoted: m });

        // Wait
        await new Promise(resolve => setTimeout(resolve, 700));

        const end = Date.now();
        const ping = end - start;

        // EDIT same message
        await conn.sendMessage(
            m.chat,
            {
                text:
`⚡ *Ping:* \`${ping}ms\`
👤 *User:* ${pushname}
🔥 Speed Perfect!`,
                edit: sent.key
            }
        );

    } catch (e) {
        console.error(e);
        reply("❌ Ping Error!");
    }
});
