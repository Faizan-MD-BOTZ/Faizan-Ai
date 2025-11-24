const { cmd } = require("../command");

// =========================================
// SUPER FLEXIBLE TIME PARSER
// =========================================
function parseTime(input) {
  if (!input) return null;

  // Clean input (allow only num + s/m/h)
  input = input.replace(/[^0-9smh]/gi, "");

  // Extract number & unit
  const numMatch = input.match(/\d+/);
  const unitMatch = input.match(/[smh]/i);

  if (!numMatch || !unitMatch) return null;

  const num = parseInt(numMatch[0]);
  const unit = unitMatch[0].toLowerCase();

  const ms =
    unit === "s" ? num * 1000 :
    unit === "m" ? num * 60000 :
    unit === "h" ? num * 3600000 :
    null;

  return ms;
}

// =========================================
// GROUP CLOSE COMMAND
// =========================================
cmd({
  pattern: "close",
  alias: ["lock", "gcclose"],
  desc: "Close group for a specific time",
  category: "group",
  filename: __filename,
  use: "<10s | 1m | 1h | etc>",
}, async (conn, m, store, { from, args, q, reply }) => {

  if (!from.endsWith("@g.us")) return;

  const group = await conn.groupMetadata(from);
  const admins = group.participants.filter(p => p.admin !== null).map(p => p.id);
  const isAdmin = admins.includes(m.sender);
  const isOwner = m.sender.includes(global.owner);

  if (!isAdmin && !isOwner)
    return reply("❌ *Only Admins or Bot Owner can use this command!*");

  let input = args[0] || q;
  if (!input) return reply("⛔ Example: .close 10s | 1m | 1h");

  const duration = parseTime(input);
  if (!duration) return reply("❌ Invalid time! Try: 10s, 1m, 1h");

  await conn.groupSettingUpdate(from, "announcement");
  await reply(`🔒 *Group closed for ${input.trim()}*`);

  setTimeout(async () => {
    await conn.groupSettingUpdate(from, "not_announcement");
    await conn.sendMessage(from, { text: "🔓 *Group auto-opened!*" });
  }, duration);
});


// =========================================
// GROUP OPEN COMMAND
// =========================================
cmd({
  pattern: "open",
  alias: ["unlock", "gcopen"],
  desc: "Open group for specific time",
  category: "group",
  filename: __filename,
  use: "<optional time>",
}, async (conn, m, store, { from, args, q, reply }) => {

  if (!from.endsWith("@g.us")) return;

  const group = await conn.groupMetadata(from);
  const admins = group.participants.filter(p => p.admin !== null).map(p => p.id);
  const isAdmin = admins.includes(m.sender);
  const isOwner = m.sender.includes(global.owner);

  if (!isAdmin && !isOwner)
    return reply("❌ *Only Admins or Bot Owner can use this command!*");

  await conn.groupSettingUpdate(from, "not_announcement");
  await reply("🔓 *Group is now OPEN!*");

  let input = args[0] || q;

  if (input) {
    const duration = parseTime(input);

    if (!duration) return reply("⛔ Invalid time! Example: 10s, 1m, 1h");

    setTimeout(async () => {
      await conn.groupSettingUpdate(from, "announcement");
      await conn.sendMessage(from, { text: "🔒 *Group auto-closed!*" });
    }, duration);
  }
});
