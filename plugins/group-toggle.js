const { cmd } = require('../command')

cmd({
  pattern: "close",
  desc: "Close group for selected time",
  category: "group",
  filename: __filename
}, async (conn, m, store, { from, args, q, reply, isAdmin, isBotAdmin }) => {

  // Admin check
  if (!isAdmin) return reply("❌ Only Admins can use this command.");

  // Bot admin check
  if (!isBotAdmin) return reply("❌ Bot must be Admin to lock the group.");

  // Remove space issue (.close10s bhi chalega)
  let input = q.replace(/\s+/g, "");

  // Allowed times
  const validTimes = {
    "1s": 1000,
    "5s": 5000,
    "10s": 10000,
    "15s": 15000,
    "30s": 30000,
    "1m": 60000,
    "15m": 900000,
    "1h": 3600000,
    "6h": 21600000,
    "24h": 86400000,
    "55h": 198000000,
  };

  if (!validTimes[input]) {
    return reply(
      "❌ Invalid time!\nUse: 1s, 5s, 10s, 15s, 30s, 1m, 15m, 1h, 6h, 24h, 55h"
    );
  }

  // Close group
  await conn.groupSettingUpdate(from, "announcement");
  reply(`🔒 Group closed for *${input}*\n\n🪄 Powered By 𝐅𝐀𝐈𝐙𝐀𝐍-𝐀𝐈`);

  // Auto open after time
  setTimeout(async () => {
    await conn.groupSettingUpdate(from, "not_announcement");
    await conn.sendMessage(from, {
      text: `🔓 Group is now OPEN!\n\n🪄 Powered By 𝐅𝐀𝐈𝐙𝐀𝐍-𝐀𝐈`
    });
  }, validTimes[input]);

});
