const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "FAIZAN-AI~eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia0M4eUlVdlk1VWQ3RzMrS0xsVUdHdWRueXRkaWxEejlNVU40MENmNTRudz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR3llQVdKU3ZleWNtZlRLU1VBTmNLcXhZcm9sT3pqNkxpOFFIY1Rud1J5QT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFR1BPOGxhbC9EQUF3dTB2MzFvWFVWRUM4NUgxY0d0cEdRQjJ1VjVVZlVFPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJnc3JnMmI2bmY1OXRBR25OdlFPRUFMZWg1RWpQVmVhNEZ1ck03bUVFMzBJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkdObWFkYXV5NElyUzFxak15dzB5OW9ReURaWisvVGkyN1dTWnV1bmVHMXc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ijl1S2N3THFnbFlSKzZLUlhCQ3k4SjZ6OStVU1hnWklRaFBwSFUxbm12RkU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRUF6UXV5V0tpTEQxSG9COE03K3RvUlhvMUcxUmdlc0pSR1FwczltOFdFcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieDd6MUxHNndLcFRCYVJOLzZ5cndJWGRKUkxXOXQyTFV1dCtPaEMzOVpTYz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik5GL0Y2ZEZhQldUd0llU3dyTEVIRjlaa0Evc2dZMjIxeFg3TW8xM2szOG82V2YxNU14QUFFTTlDblhEaUZIZElBNlVCTUY3dURKTWZNZ1VPN2tEQWl3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NzksImFkdlNlY3JldEtleSI6ImJaT1JndmRvOEVMdlpFZ0xVYWFjRDI1TkhpRU5mK3hvV1JPKy9wa2JsNVE9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiOTIzNDA4NTc2Njc0QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkFDRkE0QjVFNEVBNTk2QTk1NEU5MzZCMzlFMkNGNUVCIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NjMzMjMyNTJ9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6InRtZTkwbkpUUUl1QUJwVWJDeTEzRkEiLCJwaG9uZUlkIjoiNWRiYWMxMjItZGExZC00YzdkLWE1NTgtYjcwMTJkNTg3MjIxIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImxESFNEby8wQVhGWEh2L0c0ZEpoalMzL1BHZz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJqQUFjWStPM3VnODlGdisvU2ljaVMyaHk2SVk9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiQ0dBNEJDREoiLCJtZSI6eyJpZCI6IjkyMzQwODU3NjY3NDoxN0BzLndoYXRzYXBwLm5ldCIsImxpZCI6IjEyNTQ5MTAwODgxOTQwNzoxN0BsaWQiLCJuYW1lIjoiZmFpemFuanV0dG03NDUxIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNOaVArNndDRU9UYTZNZ0dHQU1nQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJyZzk1ZXVndUVYQlAya3JpSys5U3BmSXRqT1Naam0xU080VnZEL3YwL2tZPSIsImFjY291bnRTaWduYXR1cmUiOiJNU3R6b0FacW1XLzc4cFRkZ0ZRRjFBQ1U3aWs2dXQwK3F2cWgySDUxckFGY0lwY3VodE5veXM5MGw1WmYyamFYTkdiQTZBS3M1eTA3MURlQk00eFZDQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoidFNKaGJnQnZ4NHppZzRXUVNlMDltbUJYeDUyMHVqUmt0Vno2ZWF0QkpVNTBUSUJsUjBnVHJ6cWZ1Qm5IZE4yVkxLSlJWRUl1M3ovMVdTdlpZZ3RnaGc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI5MjM0MDg1NzY2NzQ6MTdAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCYTRQZVhyb0xoRndUOXBLNGl2dlVxWHlMWXprbVk1dFVqdUZidy83OVA1RyJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FJSUNBZ04ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzYzMzIzMjQ5LCJsYXN0UHJvcEhhc2giOiIzUjlaMzkiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQU9EbyJ9",
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
