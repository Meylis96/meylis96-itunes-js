export const musicPlayerInit = () => {
    const audio = document.querySelector('.audio'),
          audioImg = document.querySelector('.audio-img'),
          audioHeader = document.querySelector('.audio-header'),
          audioPlayer = document.querySelector('.audio-player'),
          audioNavigation = document.querySelector('.audio-navigation'), 
          audioButtonPlay = document.querySelector('.audio-button__play'),
          audioProgress = document.querySelector('.audio-progress'),
          audioProgressTimng = document.querySelector('.audio-progress__timing'),
          audioTimePassed = document.querySelector('.audio-time__passed'),
          audioTimeTotal = document.querySelector('.audio-time__total'),
          playList = ['hello', 'flow', 'speed'];

    let trackIndex = 0;

    const loadTrack = () => {
        const isPlayed = audioPlayer.paused,
              track = playList[trackIndex];

        audioImg.src = `./audio/${track}.jpg`;
        audioHeader.textContent = track.toUpperCase();
        audioPlayer.src = `./audio/${track}.mp3`;

        if(isPlayed) {
            audioPlayer.pause();
        } else {
            audioPlayer.play();
        }
    };

    const nextTrack = () => {
        if(trackIndex === playList.length - 1) {
            trackIndex = 0;
        } else {
            trackIndex++;
        }
        loadTrack();
    };

    const prevTrack = () => {
        if(trackIndex !== 0) {
            trackIndex--;
        } else {
            trackIndex = playList.length - 1;
        }
        loadTrack();
    };

    const addZero = n => {
        if(n < 10) {
            return '0' + n;
        } else {
            return n;
        }
    };


    audioNavigation.addEventListener('click', (e) => {
        const target = e.target;

        if(target.classList.contains('audio-button__play')) {
            audio.classList.toggle('play');
            audioButtonPlay.classList.toggle('fa-play');
            audioButtonPlay.classList.toggle('fa-pause');

            const track = playList[trackIndex];
            audioHeader.textContent = track.toUpperCase();
            

            if(audioPlayer.paused) {
                audioPlayer.play();
            } else {
                audioPlayer.pause();
            }
        }

        if(target.classList.contains('audio-button__prev')) {
            prevTrack();
        }

        if(target.classList.contains('audio-button__next')) {
            nextTrack();
        }
    });

    audioPlayer.addEventListener('ended', () => {
        nextTrack();
        audioPlayer.play();
    });

    audioPlayer.addEventListener('timeupdate', () => {
        const duration = audioPlayer.duration,
              currentTime = audioPlayer.currentTime,
              progress = (currentTime / duration) * 100,
              minutesPassed = Math.floor(currentTime / 60) || '0',
              secondsPassed = Math.floor(currentTime % 60) || '0',
              minutesTotal = Math.floor(duration / 60) || '0',
              secondTotal = Math.floor(duration % 60) || '0';

        audioProgressTimng.style.width = progress + '%';

        audioTimePassed.textContent = `${addZero(minutesPassed)}:${addZero(secondsPassed)}`;
        audioTimeTotal.textContent = `${addZero(minutesTotal)}:${addZero(secondTotal)}`;
        
    });

    audioProgress.addEventListener('click', (e) => {
        const x = e.offsetX,
              allLength = audioProgress.clientWidth,
              progress = (x / allLength) * audioPlayer.duration;
              
        audioPlayer.currentTime = progress;
    });

    musicPlayerInit.stop = () => {
        if(!audioPlayer.paused) {
            audioPlayer.pause();
            audio.classList.remove('play');
            audioButtonPlay.classList.remove('fa-pause');
            audioButtonPlay.classList.add('fa-play');
        }
    };

};