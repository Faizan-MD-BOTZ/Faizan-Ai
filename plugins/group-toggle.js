const { cmd } = require("../command");

// ===================== GROUP CLOSE =========================

cmd({
  pattern: "close",
  alias: ["lock", "gcclose"],
  desc: "Close group for specific time",
  category: "group",
  filename: __filename,
  use: "<10s | 1m | 1h>",
}, async (conn, m, store, { from, args, q, reply }) => {

  if (!from.endsWith("@g.us")) return;

  // ADMIN CHECK
  const groupMetadata = await conn.groupMetadata(from);
  const isAdmin = groupMetadata.participants
    .filter(p => p.admin !== null)
    .map(p => p.id)
    .includes(m.sender);

  if (!isAdmin) return reply("❌ *Only admins can use this command!*");

  // SUPPORT: .close10s, .close 10s, . close 10s
  if (!args[0]) {
    args[0] = q
      .replace(/^\./, "")      // remove first dot
      .replace(/close/i, "")   // remove word close
      .trim();                 // remove spaces
  }

  if (!args[0]) return reply("🛑 *Use:* .close 10s | 1m | 1h");

  const match = args[0].match(/(\d+)(s|m|h)/i);
  if (!match) return reply("❌ *Invalid time format!*");

  const num = parseInt(match[1]);
  const unit = match[2].toLowerCase();

  const duration =
    unit === "s" ? num * 1000 :
    unit === "m" ? num * 60000 :
    unit === "h" ? num * 3600000 : null;

  await conn.groupSettingUpdate(from, "announcement");
  await reply(`🔒 *Group closed for ${args[0]}*`);

  setTimeout(async () => {
    await conn.groupSettingUpdate(from, "not_announcement");
    await conn.sendMessage(from, { text: "🔓 *Group auto-opened now!*" });
  }, duration);

});


// ===================== GROUP OPEN =========================

cmd({
  pattern: "open",
  alias: ["unlock", "gcopen"],
  desc: "Open group",
  category: "group",
  filename: __filename,
  use: "<optional time>",
}, async (conn, m, store, { from, args, q, reply }) => {

  if (!from.endsWith("@g.us")) return;

  // ADMIN CHECK
  const groupMetadata = await conn.groupMetadata(from);
  const isAdmin = groupMetadata.participants
    .filter(p => p.admin !== null)
    .map(p => p.id)
    .includes(m.sender);

  if (!isAdmin) return reply("❌ *Only admins can use this command!*");

  // SUPPORT: .open10s, .open 10s, . open 10s
  if (!args[0]) {
    args[0] = q
      .replace(/^\./, "")      // remove dot
      .replace(/open/i, "")    // remove open word
      .trim();
  }

  await conn.groupSettingUpdate(from, "not_announcement");
  await reply("🔓 *Group is now OPEN!*");

  if (args[0]) {
    const match = args[0].match(/(\d+)(s|m|h)/i);
    if (!match) return reply("❌ Invalid time!");

    const num = parseInt(match[1]);
    const unit = match[2].toLowerCase();

    const duration =
      unit === "s" ? num * 1000 :
      unit === "m" ? num * 60000 :
      unit === "h" ? num * 3600000 : null;

    setTimeout(async () => {
      await conn.groupSettingUpdate(from, "announcement");
      await conn.sendMessage(from, { text: "🔒 *Group auto-closed now!*" });
    }, duration);
  }

});
