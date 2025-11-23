const { cmd } = require('../command');
const axios = require('axios');

cmd({
    pattern: 'getpp',
    alias: ['pp','profilepic'],
    desc: 'Get profile picture of a user',
    category: 'tools',
    react: '📸',
    filename: __filename
}, async (conn, mek, m, { args, from, reply }) => {
    try {
        let user = m.quoted ? m.quoted.sender : args[0] ? args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.sender;
        
        let ppUrl = await conn.profilePictureUrl(user).catch(() => null);
        if (!ppUrl) return reply('❌ User has no profile picture.');

        await conn.sendMessage(from, { image: { url: ppUrl }, caption: `📸 Profile picture of @${user.split('@')[0]}` }, { quoted: m });
    } catch (err) {
        console.log(err);
        reply('❌ Failed to fetch profile picture.');
    }
});
