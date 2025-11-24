const { cmd } = require("../command");

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

    // Remove spaces like ".close 10s" or ".close10s"
    let timeInput = args.join("").trim(); 

    if (!timeInput) return reply("⏳ Example: `.close 10s` or `.close10s`");

    // Convert time
    let time = parseInt(timeInput);
    let unit = timeInput.replace(time, "").toLowerCase();

    let multiplier = {
      s: 1000,
      m: 60000,
      h: 3600000,
      d: 86400000
    }[unit];

    if (!multiplier) return reply("❌ Invalid format. Use: s, m, h, d");

    let ms = time * multiplier;

    // Lock group
    await conn.groupSettingUpdate(from, "announcement");
    reply(`🔒 Group Closed for *${time}${unit}*`);

    // Wait then unlock
    setTimeout(async () => {
      try {
        await conn.groupSettingUpdate(from, "not_announcement");
        await conn.sendMessage(from, { text: "🔓 Group is now open automatically." });
      } catch (e) {}
    }, ms);

  } catch (e) {
    console.log(e);
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
    if (!timeInput) return reply("⏳ Example: `.open 10s` or `.open10s`");

    let time = parseInt(timeInput);
    let unit = timeInput.replace(time, "").toLowerCase();

    let multiplier = {
      s: 1000,
      m: 60000,
      h: 3600000,
      d: 86400000
    }[unit];

    if (!multiplier) return reply("❌ Invalid format. Use: s, m, h, d");

    let ms = time * multiplier;

    // Open group
    await conn.groupSettingUpdate(from, "not_announcement");
    reply(`🔓 Group opened for *${time}${unit}*`);

    // Auto re-close
    setTimeout(async () => {
      try {
        await conn.groupSettingUpdate(from, "announcement");
        await conn.sendMessage(from, { text: "🔒 Group automatically closed again." });
      } catch (e) {}
    }, ms);

  } catch (e) {
    console.log(e);
    reply("❌ Error while processing command.");
  }
});
