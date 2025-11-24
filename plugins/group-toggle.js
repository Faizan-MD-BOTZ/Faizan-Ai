// group-toggle.js
// Requires: @adiwajshing/baileys (or compatible fork)
// Usage: integrate in your message handler

const { GroupSettingChange } = require('@adiwajshing/baileys'); // if TS/ESM adjust imports
// or const { proto } = require('@adiwajshing/baileys') and use proto enums depending on version

// In-memory timers (for persistent timers use DB or file)
const timers = new Map(); // key: groupId, value: NodeJS.Timeout

function parseDuration(token) {
  // token examples: "10s", "1m", "2h"
  const m = token.match(/^(\d+)(s|m|h)$/i);
  if (!m) return null;
  const val = parseInt(m[1], 10);
  const unit = m[2].toLowerCase();
  if (unit === 's') return val * 1000;
  if (unit === 'm') return val * 60 * 1000;
  if (unit === 'h') return val * 60 * 60 * 1000;
  return null;
}

/**
 * Call this inside your message handler
 * @param {any} sock - your baileys socket (conn)
 * @param {any} msg - incoming message object
 */
async function handleToggleCommands(sock, msg) {
  try {
    const from = msg.key.remoteJid;
    if (!from || !from.endsWith('@g.us')) return; // only groups

    const isText = msg.message && (msg.message.conversation || msg.message.extendedTextMessage);
    const text = (msg.message.conversation || (msg.message.extendedTextMessage && msg.message.extendedTextMessage.text) || '').trim();
    if (!text) return;

    const sender = msg.key.participant || msg.key.remoteJid; // participant for groups
    // get group admins
    const meta = await sock.groupMetadata(from);
    const admins = (meta.participants || []).filter(p => p.isAdmin || p.isSuperAdmin).map(p => p.id);

    // Only allow group admins to use commands
    if (!admins.includes(sender)) {
      // optional: also allow bot owner by checking sender === BOT_OWNER_JID
      await sock.sendMessage(from, { text: 'Sirf group admins ye command use kar sakte hain.' }, { quoted: msg });
      return;
    }

    // match commands: .close <dur>  or  .open <dur>
    const parts = text.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const arg = parts[1] || null;

    if (cmd === '.close') {
      // if no duration, make it permanent close (but here we require duration)
      if (!arg) {
        await sock.sendMessage(from, { text: 'Use: .close <duration>  (e.g. .close 10s | .close 1m | .close 1h)' }, { quoted: msg });
        return;
      }
      const ms = parseDuration(arg);
      if (ms === null) {
        await sock.sendMessage(from, { text: 'Invalid duration. Use s/m/h e.g. 10s, 1m, 2h' }, { quoted: msg });
        return;
      }

      // change group: only admins can send messages
      await sock.groupSettingChange(from, GroupSettingChange.messageSend, true);
      await sock.sendMessage(from, { text: `Group closed for ${arg}. Only admins can send now.` });

      // clear existing timer for this group
      if (timers.has(from)) {
        clearTimeout(timers.get(from));
        timers.delete(from);
      }

      // schedule reopen
      const t = setTimeout(async () => {
        try {
          await sock.groupSettingChange(from, GroupSettingChange.messageSend, false); // allow all
          await sock.sendMessage(from, { text: `Group reopened. Everyone can send messages now.` });
          timers.delete(from);
        } catch (e) {
          console.error('Failed to reopen group', e);
        }
      }, ms);

      timers.set(from, t);
      return;
    }

    if (cmd === '.open') {
      // immediate open
      if (timers.has(from)) {
        clearTimeout(timers.get(from));
        timers.delete(from);
      }
      await sock.groupSettingChange(from, GroupSettingChange.messageSend, false);
      await sock.sendMessage(from, { text: 'Group is now open. Everyone can send messages.' }, { quoted: msg });

      // optional: if user passed a duration after .open, re-close after duration
      if (arg) {
        const ms = parseDuration(arg);
        if (!ms) {
          await sock.sendMessage(from, { text: 'Invalid duration after .open. Use e.g. .open 10s' }, { quoted: msg });
          return;
        }
        const t = setTimeout(async () => {
          try {
            await sock.groupSettingChange(from, GroupSettingChange.messageSend, true);
            await sock.sendMessage(from, { text: `Group auto-closed after ${arg}. Only admins can send now.` });
            timers.delete(from);
          } catch (e) {
            console.error('Failed to auto-close after open', e);
          }
        }, ms);
        timers.set(from, t);
      }
      return;
    }

  } catch (err) {
    console.error('toggle plugin error', err);
  }
}

module.exports = { handleToggleCommands };
