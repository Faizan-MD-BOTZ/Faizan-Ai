cmd({
  pattern: 'video',
  alias: ["song", "play"],
  desc: "Download YouTube Video",
  category: 'downloader',
  react: '🪄',
  filename: __filename
}, async (sock, msg, args, { from, q, reply }) => {
  try {

    if (!q) {
      return reply("Please provide a YouTube link or search query.\n\nExample: .video Pasoori");
    }

    let url;

    // Search or direct link
    if (q.includes("youtube.com") || q.includes("youtu.be")) {
      url = q;
    } else {
      const search = await yts(q);
      if (!search.videos || search.videos.length === 0) {
        return reply("No results found.");
      }
      url = search.videos[0].url;
    }

    // First fetch details (thumbnail, title, views, channel)
    const info = await yts(url);
    const videoData = info.videos[0];

    const title = videoData.title || "Unknown Title";
    const channel = videoData.author?.name || "Unknown Channel";
    const views = videoData.views || "N/A";
    const thumbnail = videoData.thumbnail;

    // Send preview info first
    await sock.sendMessage(from, {
      image: { url: thumbnail },
      caption: `🎬 *${title}*\n📺 *${channel}*\n👁️ *Views:* ${views}`
    });

    // Now fetch real downloadable video
    const res = await fetch(
      "https://gtech-api-xtp1.onrender.com/api/video/yt?apikey=APIKEY&url=" +
      encodeURIComponent(url)
    );

    const json = await res.json();

    if (!json.status) return reply("Failed to fetch video.");

    let { video_url_hd, video_url_sd } = json.result.media;

    let finalVideo = video_url_hd !== "No HD video URL available"
      ? video_url_hd
      : video_url_sd;

    if (!finalVideo || finalVideo.includes("No")) {
      return reply("No downloadable video found.");
    }

    // Send final video
    await sock.sendMessage(from, {
      video: { url: finalVideo },
      caption: `${title}`
    }, { quoted: msg });

  } catch (err) {
    reply("Error while fetching video.");
    console.log(err);
  }
});
