const { cmd } = require("../command");
const axios = require('axios');
const fs = require('fs');
const path = require("path");
const AdmZip = require("adm-zip");
const { setCommitHash, getCommitHash } = require('../data/updateDB');

cmd({
    pattern: "update",
    alias: ["upgrade", "sync"],
    react: '🆕',
    desc: "Update the bot to the latest version.",
    category: "misc",
    filename: __filename
}, async (client, message, args, { reply, isOwner }) => {
    if (!isOwner) return reply("This command is only for the bot owner.");

    try {
        await reply("🔍 Checking for FAIZAN-AI updates...");

        // Fetch latest commit from GitHub
        const { data: commitData } = await axios.get("https://api.github.com/repos/Faizan-MD-BOTZ/Faizan-Ai/commits/main");
        const latestCommitHash = commitData.sha;

        const currentHash = await getCommitHash();

        if (latestCommitHash === currentHash) {
            return reply("✅ Your FAIZAN-AI bot is already up-to-date!");
        }

        await reply("🚀 Updating FAIZAN-AI Bot...");

        // Download latest ZIP
        const zipPath = path.join(__dirname, "latest.zip");
        const { data: zipData } = await axios.get("https://github.com/Faizan-MD-BOTZ/Faizan-Ai/archive/main.zip", {
            responseType: "arraybuffer"
        });
        fs.writeFileSync(zipPath, zipData);

        await reply("📦 Extracting the latest code...");
        const extractPath = path.join(__dirname, 'latest');
        const zip = new AdmZip(zipPath);
        zip.extractAllTo(extractPath, true);

        await reply("🔄 Replacing files...");
        const sourcePath = path.join(extractPath, "/Faizan-Ai-main");
        const destinationPath = path.join(__dirname, '..');

        copyFolderSync(sourcePath, destinationPath);

        await setCommitHash(latestCommitHash);

        fs.unlinkSync(zipPath);
        fs.rmSync(extractPath, { recursive: true, force: true });

        await reply("✅ Update complete! Restarting the bot...");
        process.exit(0);

    } catch (error) {
        console.error("Update error:", error);
        return reply("❌ Update failed. Please try manually.");
    }
});

// copy function
function copyFolderSync(source, target) {
    if (!fs.existsSync(target)) fs.mkdirSync(target, { recursive: true });

    const items = fs.readdirSync(source);
    for (const item of items) {
        const srcPath = path.join(source, item);
        const destPath = path.join(target, item);

        if (item === "config.js" || item === "app.json") continue;

        if (fs.lstatSync(srcPath).isDirectory()) {
            copyFolderSync(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}
