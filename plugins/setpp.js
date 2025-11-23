const { cmd } = require("../command");

cmd({
    pattern: "setpp",
    alias: ["setprofilepic", "setdp"],
    desc: "Set your own profile picture or group profile picture",
    category: "tools",
    react: "🖼️",
    filename: __filename
}, async (conn, mek, m, { from, isGroup, reply }) => {
    try {
        // Check if an image is sent or replied
        let media = m.quoted ? m.quoted : m;
        if (!media || !media.message || !media.message.imageMessage) {
            return reply("*Please send or reply to an image to set as profile picture!* ❌");
        }

        // Download image
        const buffer = await conn.downloadMediaMessage(media);

        // If command in group and "group" keyword is used
        if (isGroup && m.text.toLowerCase().includes("group")) {
            // Check if sender is admin
            const groupAdmins = (await conn.groupMetadata(from)).participants
                .filter(p => p.admin !== null)
                .map(p => p.id);
            if (!groupAdmins.includes(m.sender)) {
                return reply("*Only group admins can update the group profile picture!* ❌");
            }

            await conn.updateProfilePicture(from, buffer);
            return reply("*✅ Group profile picture updated successfully!*");
        }

        // Update personal profile picture
        await conn.updateProfilePicture(buffer);
        reply("*✅ Your profile picture has been updated successfully!*");
    } catch (err) {
        console.error(err);
        reply("*Error updating profile picture* ❌");
    }
});
