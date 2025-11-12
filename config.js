const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "ANAYAT-AI~eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRUYveGZPS24vakFNSXlVQWJpNmFkUXRZaWtEZG1RV3gydXJHZnRhalBGaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMVBOcjQrMXpxQmFpLzhHTjR1T3gycVU2YSt6RXhPVXNiazJyRlRPMmZRRT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzSURJRWxjaWxTb1k4OW1pMlNlOHVPZmE4K1VRTktTV1ZrNlJJVXphWFhJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJPbkVFaDZBN2lxQXpRMG5aaVF5UmJZZHZNelRQT2wvaExySFN3MktkOTM4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InlERkdOZm9TQTdRZ3lERWhwNFNsUVhhdzJZY2NHOHAyU1I2UWNYdTBJVmM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkdUS3Y1UWVwZHVmVFVDUFJaeVJjL2pUbGNzQ3VWOVE5L09HeUxkZ2Z6eEE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMEtnN2lkNWUzWWVxc2F0ZEZLbllUS0pKNkQ3MEkzRnc2aEFxa2VhRVAyUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiN1l2Z0lZOWdSZFJudjh2WE5IV21uMm51dU9HVmcrQWttS0lIVVVCamptMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkFyc2ZhU1M2ZmlVVzErcjVWU0o2L2N1MnU3ZmZ5cXRVWGkwS1dFajdFdVUyaEsvME5LT3pYTmhLQm91cHpsZGxSWk8xUnJSclV0WE5qbVVOWk9PbERBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTA4LCJhZHZTZWNyZXRLZXkiOiJlV0VTTjBHTlJVN2dHODRuYTV1OHNUajNPa3NIbE9SaSt4Nys2MTVyRHdJPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6Ijk3Nzk3MDIwMDAzMzVAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQTVEM0M2N0IwMDdEMkYzMjM4ODExQ0NFRDg2RjExOTMifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc2Mjk3NjI3MH1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiRUxBSU5BTUQiLCJtZSI6eyJpZCI6Ijk3Nzk3MDIwMDAzMzU6MTBAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiZmF6aSBqdXR04oG54oG34oG3IiwibGlkIjoiMjA4MTA0NzA0NzEyODE1OjEwQGxpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSnp1b2UwQ0VQM0QwOGdHR0FzZ0FTZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiSkFFRXpOV25RbjN5dTdoQWhVSUhLSkwzeUhFTGoxS2daZHVCOVFDbTBFQT0iLCJhY2NvdW50U2lnbmF0dXJlIjoibWtoSktTekcvcjNOc2d5RlM2NW1Db3BxQXB1c3IrWDBneW5FaTNWWEJVNEcrWnNvYTNSRVNEc0Q4NGRGWGJqUDBIemdNZ0JxMEEzcUVvNVRRem5UQ0E9PSIsImRldmljZVNpZ25hdHVyZSI6IkUxUW0vSFRhd05FWUMrQWN1c3ppQ2ZYRE9NUStxZFljeXk0T0pUdnlORVpkdHppNjVITzM0R2xpWXV3aEE2bG44dE5UMEtjWjJMYnRzOHprMm5kbEJRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTc3OTcwMjAwMDMzNToxMEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJTUUJCTXpWcDBKOThydTRRSVZDQnlpUzk4aHhDNDlTb0dYYmdmVUFwdEJBIn19XSwicGxhdGZvcm0iOiJzbWJhIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQVVJQWdnSSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NjI5NzYyNjcsImxhc3RQcm9wSGFzaCI6IjJWNzdxVSIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBQzI3In0=",
// add your Session Id 
AUTO_STATUS_SEEN: process.env.AUTO_STATUS_SEEN || "true",
// make true or false status auto seen
AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || "false",
// make true if you want auto reply on status 
AUTO_STATUS_REACT: process.env.AUTO_STATUS_REACT || "true",
// make true if you want auto reply on status 
AUTO_STATUS_MSG: process.env.AUTO_STATUS_MSG || "*SEEN YOUR STATUS BY FAIZAN-AI 🤍*",
// set the auto reply massage on status reply  
ANTI_DELETE: process.env.ANTI_DELETE || "true",
// set true false for anti delete     
ANTI_DEL_PATH: process.env.ANTI_DEL_PATH || "inbox", 
// change it to 'same' if you want to resend deleted message in same chat     
WELCOME: process.env.WELCOME || "false",
// true if want welcome and goodbye msg in groups    
ADMIN_EVENTS: process.env.ADMIN_EVENTS || "false",
// make true to know who dismiss or promoted a member in group
ANTI_LINK: process.env.ANTI_LINK || "true",
// make anti link true,false for groups 
MENTION_REPLY: process.env.MENTION_REPLY || "false",
// make true if want auto voice reply if someone menetion you 
MENU_IMAGE_URL: process.env.MENU_IMAGE_URL || "https://i.ibb.co/9mdHyGDL/shaban-md.jpg",
// add custom menu and mention reply image url
PREFIX: process.env.PREFIX || ".",
// add your prifix for bot   
BOT_NAME: process.env.BOT_NAME || "*𝐹𝒶𝒾𝓏𝒶𝓃-𝒜𝒾*",
// add bot namw here for menu
STICKER_NAME: process.env.STICKER_NAME || "*𝐹𝒶𝒾𝓏𝒶𝓃-𝒜𝒾*",
// type sticker pack name 
CUSTOM_REACT: process.env.CUSTOM_REACT || "true",
// make this true for custum emoji react    
CUSTOM_REACT_EMOJIS: process.env.CUSTOM_REACT_EMOJIS || "💝,💖,💗,❤️‍🩹,❤️,🧡,💛,💚,💙,💜,🤎,🖤,🤍",
// chose custom react emojis by yourself 
DELETE_LINKS: process.env.DELETE_LINKS || "false",
// automatic delete links witho remove member 
OWNER_NUMBER: process.env.OWNER_NUMBER || "923266105873",
// add your bot owner number
OWNER_NAME: process.env.OWNER_NAME || "*FAIZAN-AI*",
// add bot owner name
DESCRIPTION: process.env.DESCRIPTION || "*© ✨ ᴾᵒʷᵉʳᵉᵈ ᵇʸ *𝐹𝒶𝒾𝓏𝒶𝓃-𝒜𝒾* ✨💫",
// add bot owner name    
ALIVE_VID: process.env.ALIVE_VID || "https://i.ibb.co/9mdHyGDL/shaban-md.jpg",
// add img for alive msg
LIVE_MSG: process.env.LIVE_MSG || "> Zinda Hun Yar ⚡",
// add alive msg here 
READ_MESSAGE: process.env.READ_MESSAGE || "false",
// Turn true or false for automatic read msgs
AUTO_REACT: process.env.AUTO_REACT || "false",
// make this true or false for auto react on all msgs
ANTI_BAD: process.env.ANTI_BAD || "false",
// false or true for anti bad words  
MODE: process.env.MODE || "public",
// make bot public-private-inbox-group 
ANTI_LINK_KICK: process.env.ANTI_LINK_KICK || "false",
// make anti link true,false for groups 
AUTO_STICKER: process.env.AUTO_STICKER || "false",
// make true for automatic stickers 
AUTO_REPLY: process.env.AUTO_REPLY || "false",
// make true or false automatic text reply 
ALWAYS_ONLINE: process.env.ALWAYS_ONLINE || "false",
// maks true for always online 
PUBLIC_MODE: process.env.PUBLIC_MODE || "true",
// make false if want private mod
AUTO_TYPING: process.env.AUTO_TYPING || "false",
// true for automatic show typing   
READ_CMD: process.env.READ_CMD || "false",
// true if want mark commands as read 
DEV: process.env.DEV || "923266105873",
//replace with your whatsapp number        
ANTI_VV: process.env.ANTI_VV || "true",
// true for anti once view 
AUTO_RECORDING: process.env.AUTO_RECORDING || "false"
// make it true for auto recoding 
};
