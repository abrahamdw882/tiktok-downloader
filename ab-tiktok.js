 async function fetchTikTokData() {
      const tiktokUrl = document.getElementById('tiktokUrl').value;
      const errorDiv = document.getElementById('error');
      const videoContainer = document.getElementById('videoContainer');
      const loadingDiv = document.getElementById('loading');
      const downloadAudioLink = document.getElementById('downloadAudioLink');

      errorDiv.textContent = '';
      videoContainer.style.display = 'none';
      loadingDiv.style.display = 'block';

      if (!tiktokUrl) {
        errorDiv.textContent = 'Please enter a TikTok video URL!';
        loadingDiv.style.display = 'none';
        return;
      }

      try {
        const proxyUrl = "https://broken-star-6439.abrahamdw882.workers.dev/?u=";
        const apiUrl = `https://api.giftedtech.my.id/api/download/tiktokdlv1?apikey=gifted&url=${encodeURIComponent(tiktokUrl)}`;

        const response = await fetch(`${proxyUrl}${encodeURIComponent(apiUrl)}`);
        const data = await response.json();

        if (!data.success) {
          throw new Error('Failed to fetch video details. Please check the URL or try again later.');
        }

        const result = data.result;
        document.getElementById('videoThumbnail').src = result.video.cover;
        document.getElementById('videoTitle').textContent = result.title;
        document.getElementById('downloadVideoLink').href = result.video.noWatermark;

        if (result.music && result.music.play_url) {
          downloadAudioLink.style.display = 'inline-block';
          downloadAudioLink.href = result.music.play_url;
        } else {
          downloadAudioLink.style.display = 'none';
        }

        document.getElementById('likeCount').textContent = result.stats.likeCount;
        document.getElementById('commentCount').textContent = result.stats.commentCount;
        document.getElementById('shareCount').textContent = result.stats.shareCount;
        document.getElementById('playCount').textContent = result.stats.playCount;

        videoContainer.style.display = 'block';
      } catch (error) {
        console.error(error);
        errorDiv.textContent = 'An error occurred: ' + error.message;
      } finally {
        loadingDiv.style.display = 'none';
      }
    }
