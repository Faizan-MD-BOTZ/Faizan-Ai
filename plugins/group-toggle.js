const { cmd } = require("../command");

const OWNER_NAME = "𝐅𝐀𝐈𝐙𝐀𝐍•𝐀𝐈"; // YOUR NAME HERE

cmd({
  pattern: "close",
  desc: "Close group for a specific time",
  category: "group",
  filename: __filename,
  use: "<time>",
}, async (conn, m, store, { from, args, reply, isAdmin, isBotAdmin }) => {

  try {
    if (!isAdmin) return reply("❌ Only *Admins* can use this command.");
    if (!isBotAdmin) return reply("❌ Bot must be *Admin* to lock the group.");

    let timeInput = args.join("").trim(); // remove spaces

    if (!timeInput) 
      return reply(`⏳ Example:\n.close 10s\n.close10s\n\n✨ Powered By ${OWNER_NAME}`);

    let time = parseInt(timeInput);
    let unit = timeInput.replace(time, "").toLowerCase();

    let multiplier = { s: 1000, m: 60000, h: 3600000, d: 86400000 }[unit];
    if (!multiplier) return reply("❌ Invalid format (use s,m,h,d)");

    let ms = time * multiplier;

    await conn.groupSettingUpdate(from, "announcement");

    reply(`🔒 Group Closed for *${time}${unit}*\n✨ Powered By ${OWNER_NAME}`);

    setTimeout(async () => {
      try {
        await conn.groupSettingUpdate(from, "not_announcement");
        await conn.sendMessage(from, { text: `🔓 Group is now open.\n✨ Powered By ${OWNER_NAME}` });
      } catch {}
    }, ms);

  } catch {
    reply("❌ Error while processing command.");
  }
});


cmd({
  pattern: "open",
  desc: "Open group manually",
  category: "group",
  filename: __filename,
  use: "<time>",
}, async (conn, m, store, { from, args, reply, isAdmin, isBotAdmin }) => {

  try {
    if (!isAdmin) return reply("❌ Only *Admins* can use this command.");
    if (!isBotAdmin) return reply("❌ Bot must be *Admin* to unlock the group.");

    let timeInput = args.join("").trim();
    if (!timeInput) 
      return reply(`⏳ Example:\n.open 10s\n.open10s\n\n✨ Powered By ${OWNER_NAME}`);

    let time = parseInt(timeInput);
    let unit = timeInput.replace(time, "").toLowerCase();

    let multiplier = { s: 1000, m: 60000, h: 3600000, d: 86400000 }[unit];
    if (!multiplier) return reply("❌ Invalid format (use s,m,h,d)");

    let ms = time * multiplier;

    await conn.groupSettingUpdate(from, "not_announcement");

    reply(`🔓 Group opened for *${time}${unit}*\n✨ Powered By ${OWNER_NAME}`);

    setTimeout(async () => {
      try {
        await conn.groupSettingUpdate(from, "announcement");
        await conn.sendMessage(from, { text: `🔒 Group closed again.\n✨ Powered By ${OWNER_NAME}` });
      } catch {}
    }, ms);

  } catch {
    reply("❌ Error processing command.");
  }
});
