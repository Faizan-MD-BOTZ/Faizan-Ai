const axios = require('axios');
const fs = require('fs');
const path = require('path');

async function facebookCommand(sock, chatId, message) {
    try {
        const text = message.message?.conversation || message.message?.extendedTextMessage?.text;
        const url = text.split(' ').slice(1).join(' ').trim();
        
        if (!url) {
            return await sock.sendMessage(chatId, { 
                text: "Please provide a Facebook video URL.\nExample: .fb https://www.facebook.com/..."
            });
        }

        if (!url.includes('facebook.com')) {
            return await sock.sendMessage(chatId, { 
                text: "That is not a Facebook link."
            });
        }

        await sock.sendMessage(chatId, {
            react: { text: '🔄', key: message.key }
        });

        // 🔥 NEW API (as you requested)
        const response = await axios.get(
            `https://api.giftedtech.co.ke/api/download/facebook?apikey=gifted&url=${encodeURIComponent(url)}`
        );

        const data = response.data;

        if (!data || !data.data || !data.data.sd) {
            return await sock.sendMessage(chatId, { 
                text: "API didn't return video. Try again!"
            });
        }

        const fbvid = data.data.sd;

        if (!fbvid) {
            return await sock.sendMessage(chatId, { 
                text: "No video found!"
            });
        }

        const tmpDir = path.join(process.cwd(), 'tmp');
        if (!fs.existsSync(tmpDir)) {
            fs.mkdirSync(tmpDir, { recursive: true });
        }

        const tempFile = path.join(tmpDir, `fb_${Date.now()}.mp4`);

        const videoResponse = await axios({
            method: 'GET',
            url: fbvid,
            responseType: 'stream'
        });

        const writer = fs.createWriteStream(tempFile);
        videoResponse.data.pipe(writer);

        await new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });

        await sock.sendMessage(chatId, {
            video: { url: tempFile },
            mimetype: "video/mp4",
            caption: "📥 Downloaded via *𝐅𝐀𝐈𝐙𝐀𝐍-𝐀𝐈* 🚀"
        }, { quoted: message });

        try {
            fs.unlinkSync(tempFile);
        } catch (err) {}

    } catch (error) {
        console.error('Error in Facebook command:', error);
        await sock.sendMessage(chatId, { 
            text: "An error occurred: " + error.message
        });
    }
}

module.exports = facebookCommand;
