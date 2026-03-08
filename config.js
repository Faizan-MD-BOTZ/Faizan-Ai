const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}

module.exports = {
    // Session & Auth
    SESSION_ID: process.env.SESSION_ID || "", 
    
    // Bot Configuration
    PREFIX: process.env.PREFIX || ".",
    BOT_NAME: process.env.BOT_NAME || "𝐅𝐀𝐈𝐙𝐀𝐍-𝐌𝐃🪄🎀",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "923408576674",
    OWNER_NAME: process.env.OWNER_NAME || "𝐅𝐀𝐈𝐙𝐀𝐍-𝐌𝐃🪄🎀",
    DESCRIPTION: process.env.DESCRIPTION || "*© 𝐅𝐀𝐈𝐙𝐀𝐍-𝐌𝐃🪄🎀*",
    
    // Alive Message
    ALIVE_IMG: process.env.ALIVE_IMG || "https://files.catbox.moe/ejufwa.jpg",
    LIVE_MSG: process.env.LIVE_MSG || "> FAIZAN-MD⁸⁷³ IS SPARKING ACTIVE AND ALIVE\n\n\nKEEP USING FAIZAN-MD⁸⁷³ FROM FAIZAN-MD⁸⁷³ INC⚡",
    
    // Mode Settings
    MODE: process.env.MODE || "public", // public, private, inbox, groups
    PUBLIC_MODE: process.env.PUBLIC_MODE || "true",
    ALWAYS_ONLINE: process.env.ALWAYS_ONLINE || "true",
    
    // Message Features
    READ_MESSAGE: process.env.READ_MESSAGE || "false",
    AUTO_TYPING: process.env.AUTO_TYPING || "true",
    AUTO_RECORDING: process.env.AUTO_RECORDING || "true",
    AUTO_VOICE: process.env.AUTO_VOICE || "false",
    AUTO_STICKER: process.env.AUTO_STICKER || "true",
    AUTO_REPLY: process.env.AUTO_REPLY || "false",
    
    // Reaction Settings
    AUTO_REACT: process.env.AUTO_REACT || "false",
    HEART_REACT: process.env.HEART_REACT || "false",
    CUSTOM_REACT: process.env.CUSTOM_REACT || "false",
    CUSTOM_REACT_EMOJIS: process.env.CUSTOM_REACT_EMOJIS || "💝,💖,💗,❤️‍🔥,❤️‍🩹,❤️,🩷,🧡,💛,💚,💙,🩵,💜,🤎,🖤,🤍",
    
    // Status Features
    AUTO_STATUS_SEEN: process.env.AUTO_STATUS_SEEN || "true",
    AUTO_STATUS_REACT: process.env.AUTO_STATUS_REACT || "true",
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || "false",
    AUTO_STATUS__MSG: process.env.AUTO_STATUS__MSG || "*🎉👀 Seen by FAIZAN-MD⁸⁷³ 🚀🔥*",
    
    // Anti Features
    ANTI_LINK: process.env.ANTI_LINK || "false",
    ANTI_BAD: process.env.ANTI_BAD || "false",
    ANTI_BAD_WORD: process.env.ANTI_BAD_WORD || process.env.ANTI_BAD || "false", // Alias for ANTI_BAD
    ANTI_DELETE: process.env.ANTI_DELETE || "true",
    ANTI_VV: process.env.ANTI_VV || "true", // Anti View-Once
    DELETE_LINKS: process.env.DELETE_LINKS || "false",
    
    // Anti-Delete Settings
    ANTI_DEL_PATH: process.env.ANTI_DEL_PATH || "log", // 'log' or 'same'
};
