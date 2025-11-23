const {
  cmd
} = require("../command");
const fetch = require("node-fetch");
const yts = require("yt-search");
cmd({
  'pattern': "play",
  'alias': ['song', "mp3"],
  'desc': "Download YouTube Audio",
  'category': 'downloader',
  'react': '💓,✅',
  'filename': __filename
}, async (_0x54d9ac, _0x5aa73c, _0x3dc390, {
  from: _0x1d9214,
  q: _0x4b1135,
  reply: _0x13cbf0
}) => {
  try {
    if (!_0x4b1135) {
      return _0x13cbf0("Please provide a YouTube link or search query.\n\nExample: .play Pasoori");
    }
    let _0x2d6fc6;
    if (_0x4b1135.includes('youtube.com') || _0x4b1135.includes("youtu.be")) {
      _0x2d6fc6 = _0x4b1135;
    } else {
      let _0x450784 = await yts(_0x4b1135);
      if (!_0x450784 || !_0x450784.videos || _0x450784.videos.length === 0x0) {
        return _0x13cbf0("No results found.");
      }
      _0x2d6fc6 = _0x450784.videos[0x0].url;
    }
    let _0x2dbca0 = await fetch('https://gtech-api-xtp1.onrender.com/api/audio/yt?apikey=APIKEY&url=' + encodeURIComponent(_0x2d6fc6));
    let _0x2cc18f = await _0x2dbca0.json();
    if (!_0x2cc18f.status) {
      return _0x13cbf0("Failed to fetch audio.");
    }
    let {
      audio_url: _0x5a3e99
    } = _0x2cc18f.result.media;
    await _0x54d9ac.sendMessage(_0x1d9214, {
      'audio': {
        'url': _0x5a3e99
      },
      'mimetype': "audio/mpeg",
      'ptt': false
    }, {
      'quoted': _0x5aa73c
    });
  } catch (_0xf5f4cc) {
    _0x13cbf0("âŒ Error while fetching audio.");
    console.log(_0xf5f4cc);
  }
});
cmd({
  'pattern': 'video',
  'alias': ["vid", "ytv"],
  'desc': "Download YouTube Video",
  'category': 'downloader',
  'react': '🪄',
  'filename': __filename
}, async (_0x291138, _0x40711d, _0x320efe, {
  from: _0x3764b7,
  q: _0x247990,
  reply: _0x5286ec
}) => {
  try {
    if (!_0x247990) {
      return _0x5286ec("Please provide a YouTube link or search query.\n\nExample: .video Pasoori");
    }
    let _0x3460a4;
    if (_0x247990.includes("youtube.com") || _0x247990.includes('youtu.be')) {
      _0x3460a4 = _0x247990;
    } else {
      let _0x145978 = await yts(_0x247990);
      if (!_0x145978 || !_0x145978.videos || _0x145978.videos.length === 0x0) {
        return _0x5286ec("No results found.");
      }
      _0x3460a4 = _0x145978.videos[0x0].url;
    }
    let _0x32732f = await fetch("https://gtech-api-xtp1.onrender.com/api/video/yt?apikey=APIKEY&url=" + encodeURIComponent(_0x3460a4));
    let _0x207ba6 = await _0x32732f.json();
    if (!_0x207ba6.status) {
      return _0x5286ec("Failed to fetch video.");
    }
    let {
      video_url_hd: _0x2500e4,
      video_url_sd: _0x1f2e71
    } = _0x207ba6.result.media;
    let _0x5f2691 = _0x2500e4 !== "No HD video URL available" ? _0x2500e4 : _0x1f2e71;
    if (!_0x5f2691 || _0x5f2691.includes('No')) {
      return _0x5286ec("No downloadable video found.");
    }
    await _0x291138.sendMessage(_0x3764b7, {
      'video': {
        'url': _0x5f2691
      },
      'caption': "𝙿𝙾𝚆𝙴𝚁𝙴𝙳 𝙱𝚈 𝚁𝙴𝚉𝙳𝙾𝙽𝙴-𝙼𝙳"
    }, {
      'quoted': _0x40711d
    });
  } catch (_0x4a5abf) {
    _0x5286ec("Error while fetching video.");
    console.log(_0x4a5abf);
  }
});
