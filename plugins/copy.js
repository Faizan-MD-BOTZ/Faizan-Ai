const { downloadContentFromMessage } = require('@whiskeysockets/baileys')
const Tesseract = require("tesseract.js")

module.exports = {
  name: "copy",
  alias: ["copy", ".copy"],
  desc: "Extract text from an image",
  category: "tools",

  run: async (client, m) => {
    try {
      const msg = m.message?.imageMessage || m.quoted?.message?.imageMessage
      if (!msg) return m.reply("⚠️ Kripya aik image reply karke `.copy` likho.")

      // Download image
      const stream = await downloadContentFromMessage(msg, "image")
      let buffer = Buffer.from([])

      for await (const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk])
      }

      m.reply("⏳ *Copying text… wait!*")

      // OCR (extract text)
      const result = await Tesseract.recognize(buffer, "eng")
      const text = result.data.text.trim()

      if (!text) return m.reply("❌ Image me koi text nahi mila.")

      await m.reply("📄 *Extracted Text:*\n\n" + text)

    } catch (err) {
      console.log(err)
      m.reply("❌ Error aagya. Image clear bhejo.")
    }
  },
}
