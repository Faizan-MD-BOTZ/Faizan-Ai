const {
  cmd
} = require("../command");
const DY_SCRAP = require("@dark-yasiya/scrap");
const dy_scrap = new DY_SCRAP();
function replaceYouTubeID(_0x23a32a) {
  const _0x1831d4 = /(?:youtube\.com\/(?:.*v=|.*\/)|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/;
  const _0x33aa15 = _0x23a32a.match(_0x1831d4);
  return _0x33aa15 ? _0x33aa15[0x1] : null;
}
cmd({
  'pattern': "play2",
  'alias': ["mp2", "ytmp2"],
  'react': '🎵',
  'desc': "Download Ytmp3",
  'category': 'download',
  'use': ".song <Text or YT URL>",
  'filename': __filename
}, async (_0x349988, _0x3456aa, _0x1bd284, {
  from: _0x57d2e6,
  q: _0x9edc0b,
  reply: _0x5d3dc1
}) => {
  try {
    if (!_0x9edc0b) {
      return await _0x5d3dc1("❌ Please provide a Query or Youtube URL!");
    }
    let _0x1d592c = _0x9edc0b.startsWith('https://') ? replaceYouTubeID(_0x9edc0b) : null;
    if (!_0x1d592c) {
      const _0x5270ca = await dy_scrap.ytsearch(_0x9edc0b);
      if (!_0x5270ca?.["results"]?.["length"]) {
        return await _0x5d3dc1("❌ No results found!");
      }
      _0x1d592c = _0x5270ca.results[0x0].videoId;
    }
    const _0x1918a4 = await _0x5d3dc1("⏳ Processing your audio...");
    const _0x4513fe = await dy_scrap.ytmp3('https://youtube.com/watch?v=' + _0x1d592c);
    let _0x28db19 = _0x4513fe?.["result"]?.["download"]?.['url'];
    if (!_0x28db19) {
      await _0x349988.sendMessage(_0x57d2e6, {
        'text': "❌ Download link not found!",
        'edit': _0x1918a4.key
      });
      return;
    }
    await _0x349988.sendMessage(_0x57d2e6, {
      'audio': {
        'url': _0x28db19
      },
      'mimetype': 'audio/mpeg',
      'fileName': "audio.mp3"
    }, {
      'quoted': _0x1bd284
    });
  } catch (_0x2d022b) {
    console.error(_0x2d022b);
    await _0x349988.sendMessage(_0x57d2e6, {
      'react': {
        'text': '❌',
        'key': _0x1bd284.key
      }
    });
    await _0x5d3dc1("❌ An error occurred: " + (_0x2d022b.message || 'Error!'));
  }
});
