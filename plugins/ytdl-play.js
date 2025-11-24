const config = require('../settings');
const { qadeer } = require('../qadeer');
const yts = require('yt-search');

qadeer({
    pattern: "yt2",
    alias: ["play2", "music"],
    react: "🎵",
    desc: "Download audio from YouTube",
    category: "download",
    use: ".yt2 <query or url>",
    filename: __filename
}, async (qadeer, mek, m, { from, q, reply }) => {
    try {
        if (!q) return await reply(`┌─⭓ *❌ USAGE GUIDE* ⭓
│
│⭔ *Command:* .yt2 <query/url>
│⭔ *Example:* .yt2 https://youtu.be/ox4tmEV6-QU
│⭔ *Example:* .yt2 Alan Walker faded
│
└⭓ ©𝙿𝙾𝚆𝙴𝚁𝙴𝙳 𝙱𝚈 𝚀𝙰𝙳𝙴𝙴𝚁-𝙰𝙸`);

        let videoUrl, title, videoInfo;
        
        // Check if it's a URL
        if (q.match(/(youtube\.com|youtu\.be)/)) {
            videoUrl = q;
            const videoId = q.split(/[=/]/).pop();
            videoInfo = await yts({ videoId });
            if (!videoInfo) {
                return await reply(`┌─⭓ *❌ URL ERROR* ⭓
│
│⭔ *Error:* Invalid YouTube URL
│⭔ *Solution:* Check the link and try again
│
└⭓ ©𝙿𝙾𝚆𝙴𝚁𝙴𝙳 𝙱𝚈 𝚀𝙰𝙳𝙴𝙴𝚁-𝙰𝙸`);
            }
            title = videoInfo.title;
        } else {
            // Search YouTube
            const search = await yts(q);
            if (!search.videos.length) return await reply(`┌─⭓ *❌ SEARCH ERROR* ⭓
│
│⭔ *Error:* No results found
│⭔ *Solution:* Try different keywords
│
└⭓ ©𝙿𝙾𝚆𝙴𝚁𝙴𝙳 𝙱𝚈 𝚀𝙰𝙳𝙴𝙴𝚁-𝙰𝙸`);
            videoInfo = search.videos[0];
            videoUrl = videoInfo.url;
            title = videoInfo.title;
        }

        await reply(`┌─⭓ *⏳ DOWNLOADING* ⭓
│
│⭔ *Title:* ${title}
│⭔ *Status:* Processing audio...
│
└⭓ ©𝙿𝙾𝚆𝙴𝚁𝙴𝙳 𝙱𝚈 𝚀𝙰𝙳𝙴𝙴𝚁-𝙰𝙸`);

        // Use API to get audio
        const apiUrl = `https://api.davidcyriltech.my.id/download/ytmp3?url=${encodeURIComponent(videoUrl)}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (!data.success) return await reply(`┌─⭓ *❌ DOWNLOAD ERROR* ⭓
│
│⭔ *Error:* Failed to download audio
│⭔ *Solution:* Try again later
│
└⭓ ©𝙿𝙾𝚆𝙴𝚁𝙴𝙳 𝙱𝚈 𝚀𝙰𝙳𝙴𝙴𝚁-𝙰𝙸`);

        await qadeer.sendMessage(from, {
            audio: { url: data.result.download_url },
            mimetype: 'audio/mpeg',
            fileName: `${title}.mp3`,
            ptt: false
        }, { quoted: mek });

        await reply(`┌─⭓ *✅ DOWNLOAD SUCCESS* ⭓
│
│⭔ *Title:* ${title}
│⭔ *Duration:* ${videoInfo.timestamp || 'Unknown'}
│⭔ *Status:* Audio downloaded successfully
│
└⭓ ©𝙿𝙾𝚆𝙴𝚁𝙴𝙳 𝙱𝚈 𝚀𝙰𝙳𝙴𝙴𝚁-𝙰𝙸`);

    } catch (error) {
        console.error(error);
        await reply(`┌─⭓ *❌ UNEXPECTED ERROR* ⭓
│
│⭔ *Error:* ${error.message || 'Unknown error occurred'}
│⭔ *Solution:* Try again later
│
└⭓ ©𝙿𝙾𝚆𝙴𝚁𝙴𝙳 𝙱𝚈 𝚀𝙰𝙳𝙴𝙴𝚁-𝙰𝙸`);
    }
});
