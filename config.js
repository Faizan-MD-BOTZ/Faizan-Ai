const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "FAIZAN-AI~eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU0ZBMHdsOVhoTlhKa25ZMndQVFBXQzBNQ2NoK1BRRzhOSlpmMXZOTFNsYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSmxmaUwzaTRodk5zK3F3QXNuTERTY29ZN3VYWE1BcWxQQlQra1N0bVVRTT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNTk8zNlVEeEU3aVRkUEhyYitDVERkMnAvRnZBQmt1MzdWcnU5Ylc4Q1ZBPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2THEyTmo2TU5scFVLOE5NV1k4VytEV2wxSExzdko2Y1NpdWRqM1k2eTNNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktEU1NoNWJVTm5kTC9laXBpajMzSk1yajNMTmVqS1Q5WmVFSFRkVXdMVzA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlJiV2FpT0JkaXluNUNmZGJuVXAwczZORHNJNEk4RnBIWi9qZG1yejlTRjg9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRUo4clFMeEtydThwMGJRT0R6bG02NWx4NVl3YzVmZVFjcXpyVVNJekNscz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoickJRaDhvNDl5aEYwdjRCajcyU2RmWFhQZXVlaDV2aUY0eSs5aU5VY0tWUT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik91WGhQN1lyOXhqWXBEUmpVWDd4dldGTVFrMkNiV0E2K1h0cVpzeEZiYmtXazVHY2ZsTXJ4czN6SFpWWmFYRVdQcmdxMU50Q3BQWHJVb1FxMkJNK0JBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6ODQsImFkdlNlY3JldEtleSI6IndOb1NETW1jNlJXdWtMd0FMUlpiL3JKTjhUWjJkQmgzZDlkdG9nazhiRmc9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiOTIzMDg5NDk3ODUzQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkE1OTlCRUIzRjQwODFGOTZBNzFDOUVENDlEMjYyQTMzIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3Njc0NjkzMzd9LHsia2V5Ijp7InJlbW90ZUppZCI6IjkyMzA4OTQ5Nzg1M0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJBNThGNzNGMTgzOTMyRTJBOTA3RTIzRjQ4Q0M1Q0RBMyJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzY3NDY5MzM3fV0sIm5leHRQcmVLZXlJZCI6ODEzLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6ODEzLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6dHJ1ZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiWVVQUkFERVYiLCJtZSI6eyJpZCI6IjkyMzA4OTQ5Nzg1Mzo0QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IvCdmbXwnZqK8J2ao/CdmpLigbjigbXCs1xu44CHXG7jgIdcbuOAh1xu44CHXG7jgIdcbuOAh1xu44CHXG7jgIdcbuOAh1xu44CHXG7jgIdcbuOAh1xu44CHXG7jgIdcbuOAh1xu44CHXG7jgIdcbuOAh1xu44CHXG7jgIdcbuOAh1xu44CHXG7wnZqT8J2anvCdmp3wnZqdXG7jgIdcbuOAh1xu44CHXG7jgIdcbuOAhyIsImxpZCI6IjI3NTc4NDc5OTM1ODk5MDo0QGxpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDUGo1MG9BREVJZmk1Y29HR0FjZ0FTZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoidHVvUGJETkNpTlIyQlJmWW5PbnE3YkZFMjNoQVlsNzFOOXh0QmlhakowMD0iLCJhY2NvdW50U2lnbmF0dXJlIjoiNTVjRi9tdTN4ZU95MEJIVkJEaHFNYUdlcmJEVGpldkI0V2pIS0xXWTQxSjVuaitlV3Nvb21ENzdCaUw4RmVhNDNXUUFRTVJObmZwellKVTVaSHg3QlE9PSIsImRldmljZVNpZ25hdHVyZSI6IjNtKzA0bTd2MmhKbkQwUTFyNEI2QmJCL2djUGdHOHhNR1I2Yk9JTHpWS1ExL0p2ZTRZQnZUSXRobVh0a0xVUEh4NmgvRzJ0d3FyWlIrNkxZSlNMeUFRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTIzMDg5NDk3ODUzOjRAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCYmJxRDJ3elFvalVkZ1VYMkp6cDZ1MnhSTnQ0UUdKZTlUZmNiUVltb3lkTiJ9fV0sInBsYXRmb3JtIjoic21iYSIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FVSUVnZ04ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzY3NDY5MzMyLCJsYXN0UHJvcEhhc2giOiJQV2s1QiIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBSnJLIn0=",
// add your Session Id 
AUTO_STATUS_SEEN: process.env.AUTO_STATUS_SEEN || "true",
// make true or false status auto seen
AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || "false",
// make true if you want auto reply on status 
AUTO_STATUS_REACT: process.env.AUTO_STATUS_REACT || "true",
// make true if you want auto reply on status 
AUTO_STATUS_MSG: process.env.AUTO_STATUS_MSG || "*SEEN YOUR STATUS BY 𝐅𝐀𝐈𝐙𝐀𝐍-𝐀𝐈 🇵🇰*",
// set the auto reply massage on status reply  
ANTI_DELETE: process.env.ANTI_DELETE || "false",
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
MENU_IMAGE_URL: process.env.MENU_IMAGE_URL || "https://files.catbox.moe/ejufwa.jpg",
// add custom menu and mention reply image url
PREFIX: process.env.PREFIX || ".",
// add your prifix for bot   
BOT_NAME: process.env.BOT_NAME || "𝐅𝐀𝐈𝐙𝐀𝐍-𝐀𝐈",
// add bot namw here for menu
AUTO_STATUS_REACT: process.env.AUTO_STATUS_REACT || "true",
// true to get auto status react
STICKER_NAME: process.env.STICKER_NAME || "𝐅𝐀𝐈𝐙𝐀𝐍-𝐀𝐈",
// type sticker pack name 
CUSTOM_REACT: process.env.CUSTOM_REACT || "false",
// make this true for custum emoji react    
CUSTOM_REACT_EMOJIS: process.env.CUSTOM_REACT_EMOJIS || "💝,💖,💗,❤️‍🩹,❤️,🧡,💛,💚,💙,💜,🤎,🖤,🤍",
// chose custom react emojis by yourself 
DELETE_LINKS: process.env.DELETE_LINKS || "false",
// automatic delete links witho remove member 
OWNER_NUMBER: process.env.OWNER_NUMBER || "923266105873",
// add your bot owner number
OWNER_NAME: process.env.OWNER_NAME || "𝐅𝐀𝐈𝐙𝐀𝐍-𝐀𝐈",
// add bot owner name
DESCRIPTION: process.env.DESCRIPTION || "*©ᴘᴏᴡᴇʀᴇᴅ ʙʏ 𝐅𝐀𝐈𝐙𝐀𝐍-𝐀𝐈*",
// add bot owner name    
ALIVE_IMG: process.env.ALIVE_IMG || "https://files.catbox.moe/ejufwa.jpg",
// add img for alive msg
LIVE_MSG: process.env.LIVE_MSG || "> I'm alive*FAIZAN-AI*🇵🇰",
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

