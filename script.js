const video = document.querySelector('video'),
      progressRange = document.querySelector('.progress-range'),
      progressBar = document.querySelector('.progress-bar'),
      playBtn = document.querySelector('#play-btn'),
      volumeIcon = document.querySelector('#volume-icon'),
      volumeRange = document.querySelector('.volume-range'),
      volumeBar = document.querySelector('.volume-bar'),
      currentTime = document.querySelector('.time-elapsed'),
      durration = document.querySelector('.time-duration'),
      fullscreen = document.querySelector('.fullscreen');

// Play & Pause ----------------------------------- //

function showPlayIcon() {
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
}

function togglePlay() {
    if (video.paused) {
        video.play();
        playBtn.classList.replace('fa-play', 'fa-pause');
        playBtn.setAttribute('title', 'Pause');
    } else {
        video.pause();
        showPlayIcon();
    }
}

// On Video End, show play button icon
video.addEventListener('ended', showPlayIcon);

// Progress Bar ---------------------------------- //

// Calculate display time format
function displayTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    seconds = seconds > 9 ? seconds : `0${seconds}`;
    return `${minutes}:${seconds}`;
}

// Update Progress Bar as video plays
function upDateProgress() {
    progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
    currentTime.textContent = `${displayTime(video.currentTime)} /`;
    durration.textContent = `${displayTime(video.duration)}`;
}

// Click to seek within the video
function setProgress(e) {
    const newTime = e.offsetX / progressRange.offsetWidth;
    progressBar.style.width = `${newTime * 100}%`;
    video.currentTime = newTime * video.duration;
}

// Volume Controls --------------------------- //

// Volume Bar
function chnageVolume(e) {
    let volume = e.offsetX / volumeRange.offsetWidth;
    // Rounding volume up or down
    if (volume < 0.1) {
        volume = 0;
    }
    if (volume > 0.9) {
        volume = 1;
    }
    volumeBar.style.width = `${volume * 100}%`;
    video.volume = volume;
    // Change icon depending on volume
    volumeIcon.className = '';
    if (volume > 0.7) {
        volumeIcon.classList.add('fas', 'fa-volume-up');
    } else if (volume < 0.7 && volume > 0) {
        volumeIcon.classList.add('fas', 'fa-volume-down');
    } else if (volume === 0) {
        volumeIcon.classList.add('fas', 'fa-volume-off');
    }
}

// Change Playback Speed -------------------- //



// Fullscreen ------------------------------- //


// EventListener
playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', upDateProgress);
video.addEventListener('canplay', upDateProgress);
progressRange.addEventListener('click', setProgress);
volumeRange.addEventListener('click', chnageVolume);