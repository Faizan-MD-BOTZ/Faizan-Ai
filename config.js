const fs = require('fs');
const path = require('path');
const { getConfig } = require("./lib/configdb");

if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}

module.exports = {
    // ===== BOT CORE SETTINGS =====
    SESSION_ID: process.env.SESSION_ID || "",  // Your bot's session ID (keep it secure)
    PREFIX: getConfig("PREFIX") || ".",  // Command prefix (e.g., "., / ! * - +")
    CHATBOT: getConfig("CHATBOT") || "on", // on/off chat bot 
    BOT_NAME: process.env.BOT_NAME || getConfig("BOT_NAME") || "*♡˚𝐅𝐀𝐈𝐙𝐀𝐍-𝐌𝐃⁸⁷³⋆𓏲̟*",  // Bot's display name
    MODE: getConfig("MODE") || process.env.MODE || "public",        // Bot mode: public/private/group/inbox
    REPO: process.env.REPO || "https://github.com/Faizan-MD-BOTZ/Faizan-Ai",  // Bot's GitHub repo
    BAILEYS: process.env.BAILEYS || "@whiskeysockets/baileys",  // Bot's BAILEYS
    
    // ===== AUTO STATUS SETTINGS =====
    AUTO_STATUS_SEEN: process.env.AUTO_STATUS_SEEN || "true",  // Auto view statuses
    AUTO_STATUS_REACT: process.env.AUTO_STATUS_REACT || "true",  // Auto react to statuses
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || "false",  // Auto reply to statuses
    AUTO_STATUS_MSG: process.env.AUTO_STATUS_MSG || "*SEEN YOUR STATUS BY 𝐅𝐀𝐈𝐙𝐀𝐍-𝐌𝐃 🇵🇰*",  // Auto reply message
    
    // ===== AUTO DOWNLOADER =====
    AUTO_DOWNLOADER: process.env.AUTO_DOWNLOADER || "true",  // Auto download videos from URLs
    // Options: true (all chats), false (disabled), inbox (only private), group (only groups), owner (only owner)
    
    // ===== ANTI-DELETE SETTINGS =====
    ANTI_DELETE: process.env.ANTI_DELETE || "true",  // Recover deleted messages
    ANTI_DEL_PATH: process.env.ANTI_DEL_PATH || "inbox",  // Where to send deleted messages
    
    // ===== WELCOME SETTINGS =====
    WELCOME: process.env.WELCOME || "false",  // Welcome/Goodbye messages in groups
    
    // ===== ADMIN EVENTS =====
    ADMIN_EVENTS: process.env.ADMIN_EVENTS || "false",  // Know who promoted/demoted
    
    // ===== ANTI-LINK SETTINGS =====
    ANTI_LINK: process.env.ANTI_LINK || "true",  // Block links in groups
    ANTI_LINK_KICK: process.env.ANTI_LINK_KICK || "false",  // Kick on link
    DELETE_LINKS: process.env.DELETE_LINKS || "false",  // Auto delete links
    
    // ===== MENTION REPLY =====
    MENTION_REPLY: process.env.MENTION_REPLY || "false",  // Reply when mentioned
    
    // ===== MENU SETTINGS =====
    MENU_IMAGE_URL: process.env.MENU_IMAGE_URL || "https://files.catbox.moe/ejufwa.jpg",  // Menu image URL
    
    // ===== STICKER SETTINGS =====
    STICKER_NAME: process.env.STICKER_NAME || "- _♡˚𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 𝙵𝚊𝚒𝚣𝚊𝚗-𝙼𝚍𝙵𝚊𝚒𝚣𝚊𝚗-𝙰𝚒🫀𝙾𝚏𝚏𝚒𝚌𝚒𝚊𝚕⋆𓏲̟_",  // Sticker pack name
    AUTO_STICKER: process.env.AUTO_STICKER || "false",  // Auto create stickers
    
    // ===== REACTION SETTINGS =====
    AUTO_REACT: process.env.AUTO_REACT || "false",  // Auto react to messages
    CUSTOM_REACT: process.env.CUSTOM_REACT || "false",  // Use custom emojis
    CUSTOM_REACT_EMOJIS: process.env.CUSTOM_REACT_EMOJIS || "🪄,💖,💗,❤️‍🩹,🫀,🧡,💛,💚,💙,💜,🤎,🖤,🤍",  // Custom react emojis
    
    // ===== OWNER SETTINGS =====
    OWNER_NUMBER: process.env.OWNER_NUMBER || "923266105873",  // Owner's WhatsApp number
    OWNER_NAME: process.env.OWNER_NAME || "*⋆𓏲̟𝐅𝐀𝐈𝐙𝐀𝐍♡˚-𝐉𝐔𝐓𝐓⁸⁷³⋆𓏲̟*",  // Owner's name
    DEV: process.env.DEV || "923266105873",  // Developer's number
    
    // ===== DESCRIPTION =====
    DESCRIPTION: process.env.DESCRIPTION || "- _©𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 𝙵𝚊𝚒𝚣𝚊𝚗-𝙼𝚍🫀𝙾𝚏𝚏𝚒𝚌𝚒𝚊𝚕⋆𓏲̟♡˚_",  // Bot description
    
    // ===== ALIVE SETTINGS =====
    ALIVE_IMG: process.env.ALIVE_IMG || "https://files.catbox.moe/ejufwa.jpg",  // Alive image URL
    LIVE_MSG: process.env.LIVE_MSG || "> I'm alive*𝐅𝐀𝐈𝐙𝐀𝐍-𝐌𝐃*🇵🇰",  // Alive message
    
    // ===== READ SETTINGS =====
    READ_MESSAGE: process.env.READ_MESSAGE || "false",  // Auto read messages
    READ_CMD: process.env.READ_CMD || "false",  // Auto read commands
    
    // ===== AUTO TYPING/RECORDING =====
    AUTO_TYPING: process.env.AUTO_TYPING || "false",  // Show typing indicator
    AUTO_RECORDING: process.env.AUTO_RECORDING || "false",  // Show recording indicator
    
    // ===== AUTO REPLY =====
    AUTO_REPLY: process.env.AUTO_REPLY || "false",  // Auto reply to messages
    
    // ===== ANTI-BAD WORDS =====
    ANTI_BAD: process.env.ANTI_BAD || "true",  // Block bad words
    
    // ===== ALWAYS ONLINE =====
    ALWAYS_ONLINE: process.env.ALWAYS_ONLINE || "false",  // Always show online
    
    // ===== PUBLIC MODE =====
    PUBLIC_MODE: process.env.PUBLIC_MODE || "true",  // Public/Private mode
    
    // ===== ANTI-VIEW ONCE =====
    ANTI_VV: process.env.ANTI_VV || "true",  // Save view once messages
};
