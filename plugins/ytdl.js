const config = require("../config");
const {
  cmd
} = require("../command");
const DY_SCRAP = require('@dark-yasiya/scrap');
const dy_scrap = new DY_SCRAP();
function replaceYouTubeID(_0x2a6a35) {
  const _0x50138c = /(?:youtube\.com\/(?:.*v=|.*\/)|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/;
  const _0x518b86 = _0x2a6a35.match(_0x50138c);
  return _0x518b86 ? _0x518b86[0x1] : null;
}
cmd({
  'pattern': 'play3',
  'alias': ['mp3', "ytmp3"],
  'react': '🥰',
  'desc': "Download Ytmp3",
  'category': "download",
  'use': ".song <Text or YT URL>",
  'filename': __filename
}, async (_0x4be93c, _0x1ad334, _0x4ca6dc, {
  from: _0x2c7589,
  q: _0x4e083e,
  reply: _0x21461c
}) => {
  try {
    if (!_0x4e083e) {
      return await _0x21461c("Please provide a Query or Youtube URL!");
    }
    let _0x82a833 = _0x4e083e.startsWith("https://") ? replaceYouTubeID(_0x4e083e) : null;
    if (!_0x82a833) {
      const _0x26d967 = await dy_scrap.ytsearch(_0x4e083e);
      if (!_0x26d967?.["results"]?.["length"]) {
        return await _0x21461c("No results found!");
      }
      _0x82a833 = _0x26d967.results[0x0].videoId;
    }
    const _0x3b9c50 = await dy_scrap.ytsearch("https://youtube.com/watch?v=" + _0x82a833);
    if (!_0x3b9c50?.["results"]?.["length"]) {
      return await _0x21461c("Failed to fetch video!");
    }
    const {
      url: _0x53641c,
      title: _0x417755,
      image: _0x434dfd,
      timestamp: _0x51f7d2,
      ago: _0x3ea374,
      views: _0x25a862,
      author: _0x2356d
    } = _0x3b9c50.results[0x0];
    let _0x206abf = "αяѕℓαη-м∂ мυℓтιρℓє ρσωєяƒυℓ ωнαтѕαρρ вσт„\n\n" + ("*Title:* " + (_0x417755 || "Unknown") + "\n") + ("*Duration:* " + (_0x51f7d2 || 'Unknown') + "\n") + ("*Views:* " + (_0x25a862 || 'Unknown') + "\n") + ("*Release Ago:* " + (_0x3ea374 || 'Unknown') + "\n") + ("*Author:* " + (_0x2356d?.["name"] || 'Unknown') + "\n") + ("p*Url:* " + (_0x53641c || 'Unknown') + "\n\n") + ('' + (config.FOOTER || "ð“†©REDZONE-MD Official“†ª"));
    const _0x2110e4 = await _0x4be93c.sendMessage(_0x2c7589, {
      'image': {
        'url': _0x434dfd
      },
      'caption': _0x206abf
    }, {
      'quoted': _0x4ca6dc
    });
    await _0x4be93c.sendMessage(_0x2c7589, {
      'react': {
        'text': 'REDZONE-MD',
        'key': _0x2110e4.key
      }
    });
    const _0x5ba87b = await _0x4be93c.sendMessage(_0x2c7589, {
      'text': "Processing audio..."
    }, {
      'quoted': _0x4ca6dc
    });
    const _0x567408 = await dy_scrap.ytmp3('https://youtube.com/watch?v=' + _0x82a833);
    let _0x2dcf42 = _0x567408?.["result"]?.["download"]?.["url"];
    if (!_0x2dcf42) {
      return await _0x21461c("Download link not found!");
    }
    await _0x4be93c.sendMessage(_0x2c7589, {
      'audio': {
        'url': _0x2dcf42
      },
      'mimetype': "audio/mpeg",
      'fileName': _0x417755 + ".mp3"
    }, {
      'quoted': _0x4ca6dc
    });
    await _0x4be93c.sendMessage(_0x2c7589, {
      'text': "Audio Upload Successful âœ…",
      'edit': _0x5ba87b.key
    });
  } catch (_0x58994b) {
    console.error(_0x58994b);
    await _0x4be93c.sendMessage(_0x2c7589, {
      'react': {
        'text': 'âŒ',
        'key': _0x4ca6dc.key
      }
    });
    await _0x21461c("*An error occurred:* " + (_0x58994b.message || "Error!"));
  }
});
