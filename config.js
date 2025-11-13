const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "FAIZAN-AI~eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic056L0ZublZHMmtCMTNqV2xibEEvUFRrY2pxT0hYTStZQS96WVlzQ0hYOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUmpNNzF0d2I5N0J2TDBSRXl0dW5SVWFHWmtteHZ5MFBSc3FEeG4rcDhtMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJjTE1FV2I2SVlZdFVoYm9iR1I1cDVBbGVTN1VaajRsSVdZbEJRRmc5MDA4PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJVd0tuMFB2Sko2VmI3NFdQQ1g3OUp4b3I2RUlFSFQvMzlWenNhTWlPSnpRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjBGbWxuR0txRVE0OUVMMW55TWNCNmtjQndFOUFMYkN3dWVra092KzV0ME09In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InJDcU1lN3RwRG03ZlcrZGFRTy9xRzY0WEtsNGtKM1FYYzIrVmR1NnBGbkU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic002amZvbU16d3JMeHhWR2xPOENqdGxRang1TnJBTVJGTXYvcytURHNWaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQWVHQU5nMGk1MDlWZHhlb2JEV1pRWkNxVGNzRHhpKzFvR21nU3BDeW5Hdz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkhrS2JXODQ4eFJVSEF2YlFWTWpYelFNVWFNaTFXK0ZmaFR4ejNpNFdZM1FRTGMvR0RRZS9UTkRyN3ZvVGFiVnBKWjRJdVR3cnNTU29zWERHbElUZGhBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjEsImFkdlNlY3JldEtleSI6IjV3MFJzZW1icUIxNFlCVTIrQlpTU281NUt2UXg4TzhWMC9VNSs0T2U0OFU9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiOTIzMzQwOTI4NzEwQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkFDOUJFNTVGM0EwRDJBM0RBMEE0Qjk2MThFQjQzNTI4In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NjMwNjA4ODN9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6Ii1xci15RTdPVDlLTzBTSDJja1BCMHciLCJwaG9uZUlkIjoiZTM3ODg5ZjItZGE5ZS00OGMzLTk0NTktY2E0OGUwOTJmODhhIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNNOS9EYU5GTW1vMmRjUVhZUTloSzZvMnR2VT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJsQzgzeWJGOTVrUnY0ZFJnWkx3QmYwVldBVXM9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiNTY4R0JDUDkiLCJtZSI6eyJpZCI6IjkyMzM0MDkyODcxMDozNkBzLndoYXRzYXBwLm5ldCIsImxpZCI6Ijk2Mzc1Mzc1MTUxMjY5OjM2QGxpZCIsIm5hbWUiOiJmIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNMeVFtYzBDRUlQWjJNZ0dHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJiUTY4ODhncjJDaGZ4Q2VROUwwMzhyY2R4ekl4Y1p6WDgxQWhuZVQwcEFZPSIsImFjY291bnRTaWduYXR1cmUiOiJZYmliN1F4Qk5XZGFtTGRkRDNBKzUxUk5na1N1aCsyRHpCcGN4N0Y5dTErU2tWczA1eVpTT1E2ekdpR2Z3NjJsTkNuSGJaWklMenZQSHlKd09tVlpBZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoianpTTTJXVi9LT3NlTmNZMjMyRDdGaWZacUJ2VFJEWjlXWklXV2lxNm5LOWVzdCtJb2thY0RnNlVYeXBGNnEyMk1lZng0N0Yvb2hWUjhUSmtYL0dJaFE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI5MjMzNDA5Mjg3MTA6MzZAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCVzBPdlBQSUs5Z29YOFFua1BTOU4vSzNIY2N5TVhHYzEvTlFJWjNrOUtRRyJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FVSUVnZ0MifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzYzMDYwODgyLCJsYXN0UHJvcEhhc2giOiJQV2s1QiIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBSmpXIn0=",
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
WELCOME: process.env.WELCOME || "true",
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
BOT_NAME: process.env.BOT_NAME || "FAIZAN-AI",
// add bot namw here for menu
STICKER_NAME: process.env.STICKER_NAME || "FAIZAN-AI",
// type sticker pack name 
CUSTOM_REACT: process.env.CUSTOM_REACT || "false",
// make this true for custum emoji react    
CUSTOM_REACT_EMOJIS: process.env.CUSTOM_REACT_EMOJIS || "💝,💖,💗,❤️‍🩹,❤️,🧡,💛,💚,💙,💜,🤎,🖤,🤍",
// chose custom react emojis by yourself 
DELETE_LINKS: process.env.DELETE_LINKS || "false",
// automatic delete links witho remove member 
OWNER_NUMBER: process.env.OWNER_NUMBER || "923266105873",
// add your bot owner number
OWNER_NAME: process.env.OWNER_NAME || "*FAIZAN-AI*",
// add bot owner name
DESCRIPTION: process.env.DESCRIPTION || "*© ᴘᴏᴡᴇʀᴇᴅ ʙʏ FAIZAN-AI ❣️*",
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
