const { cmd } = require("../command");
const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");

cmd({
  pattern: "copy",
  react: "📋",
  desc: "Copy text from replied image or message",
  category: "tools",
}, 
async (client, m, store, { reply }) => {
  try {
    // Detect quoted message (universal method)
    const quoted =
      m.quoted ||
      m.msg?.contextInfo?.quotedMessage ||
      m.message?.extendedTextMessage?.contextInfo?.quotedMessage;

    if (!quoted) return reply("⚠️ Baji kisi image ya text par reply karo.");

    // If replied to TEXT
    let qText =
      quoted?.conversation ||
      quoted?.extendedTextMessage?.text;

    if (qText) {
      return reply(`📋 *Copied Text:*\n\n${qText}`);
    }

    // If replied to IMAGE
    const img =
      quoted?.imageMessage ||
      quoted?.stickerMessage?.imageMessage ||
      quoted?.message?.imageMessage;

    if (!img) return reply("⚠️ Baji image par reply karo.");

    await reply("🔍 *Image se text read ho raha hai...*");

    // Download quoted image
    const buffer = await client.downloadMediaMessage({ message: { imageMessage: img } });

    // Save temp
    fs.writeFileSync("./temp.jpg", buffer);

    // OCR API
    const form = new FormData();
    form.append("file", fs.createReadStream("./temp.jpg"));
    form.append("language", "eng");
    form.append("OCREngine", "2");

    const res = await axios.post(
      "https://api.ocr.space/parse/image",
      form,
      { headers: form.getHeaders() }
    );

    fs.unlinkSync("./temp.jpg");

    const text = res.data?.ParsedResults?.[0]?.ParsedText?.trim();

    if (!text) return reply("❌ Image me koi readable text nahi mila.");

    reply(`📋 *Image Text:*\n\n${text}`);

  } catch (e) {
    console.log(e);
    reply("❌ Error hogya baji.");
  }
});
