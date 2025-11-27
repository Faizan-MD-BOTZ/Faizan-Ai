const { cmd } = require("../command");
const axios = require("axios");
const fs = require("fs");

cmd({
  pattern: "copy",
  react: "📋",
  desc: "Copy text from message or image (OCR)",
  category: "tools",
}, async (conn, m, store, { quoted, reply }) => {
  try {
    if (!quoted) return reply("⚠️ Baji kisi message ya image par reply karo.");

    // If replied to TEXT
    if (quoted.text) {
      return reply(`📋 *Copied Text:*\n\n${quoted.text}`);
    }

    // If replied to IMAGE
    let mime = quoted.mimetype || "";
    if (mime.startsWith("image/")) {
      await reply("🔍 *Image se text read ho raha hai, zara rukna…*");

      let buffer = await quoted.download();

      // Save temp image
      fs.writeFileSync("./temp.jpg", buffer);

      // OCR API Request (OCR Space)
      const form = new FormData();
      form.append("file", fs.createReadStream("./temp.jpg"));
      form.append("language", "eng");
      form.append("OCREngine", "2");

      const response = await axios.post(
        "https://api.ocr.space/parse/image",
        form,
        { headers: form.getHeaders() }
      );

      // Delete temp file
      fs.unlinkSync("./temp.jpg");

      const text =
        response.data?.ParsedResults?.[0]?.ParsedText?.trim() || null;

      if (!text) return reply("❌ Image me koi readable text nahi mila.");

      return reply(`📋 *Copied from Image:*\n\n${text}`);
    }

    reply("⚠️ Sirf text ya image par reply karo baji.");

  } catch (err) {
    console.log(err);
    reply("❌ Error aagya baji, try again.");
  }
});
