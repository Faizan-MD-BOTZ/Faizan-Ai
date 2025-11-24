const { cmd } = require("../command");

cmd({
  pattern: "close",
  alias: ["lock", "gcclose"],
  desc: "Close group for a specific time",
  category: "group",
  filename: __filename,
  use: "<10s | 1m | 1h>",
}, async (conn, m, store, { from, args, reply }) => {

  if (!from.endsWith("@g.us")) return;

  if (!args[0]) return reply("🛑 *Use:* .close 10s | 1m | 1h");

  const match = args[0].match(/(\d+)(s|m|h)/i);
  if (!match) return reply("❌ Invalid time! Use: 10s / 1m / 1h");

  let num = parseInt(match[1]);
  let unit = match[2].toLowerCase();
  let duration =
    unit === "s" ? num * 1000 :
    unit === "m" ? num * 60000 :
    unit === "h" ? num * 3600000 : null;

  if (!duration) return reply("❌ Invalid time format.");

  await conn.groupSettingUpdate(from, "announcement");
  await reply(`🔒 *Group closed for ${args[0]}*`);

  setTimeout(async () => {
    await conn.groupSettingUpdate(from, "not_announcement");
    await conn.sendMessage(from, { text: "🔓 *Group auto-opened now!*" });
  }, duration);

});

// ===================== OPEN COMMAND ======================

cmd({
  pattern: "open",
  alias: ["unlock", "gcopen"],
  desc: "Open group immediately",
  category: "group",
  filename: __filename,
  use: "<optional time>",
}, async (conn, m, store, { from, args, reply }) => {

  if (!from.endsWith("@g.us")) return;

  await conn.groupSettingUpdate(from, "not_announcement");
  await reply("🔓 *Group is now OPEN!*");

  if (args[0]) {
    const match = args[0].match(/(\d+)(s|m|h)/i);
    if (!match) return reply("❌ Invalid time! Use: 10s / 1m / 1h");

    let num = parseInt(match[1]);
    let unit = match[2].toLowerCase();
    let duration =
      unit === "s" ? num * 1000 :
      unit === "m" ? num * 60000 :
      unit === "h" ? num * 3600000 : null;

    setTimeout(async () => {
      await conn.groupSettingUpdate(from, "announcement");
      await conn.sendMessage(from, { text: "🔒 *Group auto-closed now!*" });
    }, duration);
  }

});
