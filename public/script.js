document.addEventListener('DOMContentLoaded', () => {
    // Initialize Telegram Web App
    if (window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.ready();
        window.Telegram.WebApp.expand();
    }

    const audio = document.getElementById('audio-player');
    const playBtn = document.getElementById('play-btn');
    const volumeSlider = document.getElementById('volume-slider');
    const statusText = document.getElementById('status-text');
    const statusDot = document.querySelector('.status-dot');
    const nowPlaying = document.getElementById('now-playing');
    const playIcon = playBtn.querySelector('i');

    let isPlaying = false;

    // Set initial volume
    audio.volume = volumeSlider.value;

    playBtn.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
        } else {
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.then(_ => {
                    // Automatic playback started!
                }).catch(error => {
                    console.error("Playback failed:", error);
                    nowPlaying.textContent = "Stream unavailable";
                });
            }
        }
    });

    volumeSlider.addEventListener('input', (e) => {
        audio.volume = e.target.value;
    });

    // Audio Events
    audio.addEventListener('play', () => {
        isPlaying = true;
        playIcon.classList.remove('fa-play');
        playIcon.classList.add('fa-pause');
        statusText.textContent = "ON AIR";
        statusDot.classList.add('active');
        nowPlaying.textContent = "Streaming Live...";
    });

    audio.addEventListener('pause', () => {
        isPlaying = false;
        playIcon.classList.remove('fa-pause');
        playIcon.classList.add('fa-play');
        statusText.textContent = "OFF AIR";
        statusDot.classList.remove('active');
        nowPlaying.textContent = "Stream Paused";
    });

    audio.addEventListener('error', (e) => {
        console.error("Audio error:", e);
        statusText.textContent = "ERROR";
        statusDot.classList.remove('active');
        nowPlaying.textContent = "Connection Failed";
        isPlaying = false;
        playIcon.classList.remove('fa-pause');
        playIcon.classList.add('fa-play');
    });

    // Handle Spacebar to toggle
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
            e.preventDefault();
            playBtn.click();
        }
    });
});
