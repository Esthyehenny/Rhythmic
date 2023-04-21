const content = document.querySelector(".content"),
playImage = content.querySelector(".music-img img"),
musicName = content.querySelector(".music-titles .name"),
musicArtiste = content.querySelector(".music-titles .artiste"),
Audio = document.querySelector(".main-music"),
playBtn = content.querySelector(".play-pause"),
playBtnIcon = content.querySelector(".play-pause span"),
previousBtn = content.querySelector("#previous"),
nextBtn = content.querySelector("#next"),
timelineBar = content.querySelector(".timeline-bar"),
timelineDetails = content.querySelector(".timeline"),
repeatBtn = content.querySelector("#repeat"),
shuffleBtn = content.querySelector("#shuffle");


let index = 1;

window.addEventListener("load", ()=> {
    loadData(index);
    Audio.play();
});

function loadData(indexValue){
    musicName.innerHTML = music[indexValue - 1].name;
    musicArtiste.innerHTML = music[indexValue - 1].artiste;
    playImage.src = "img/"+music[indexValue - 1].img+".jpg";
    Audio.src = "music/"+music[indexValue - 1].audio+".mp4";
}

playBtn.addEventListener("click", ()=> {
    const isMusicPaused = content.classList.contains ("paused")
    if(isMusicPaused) {
        pauseMusic();
    }
    else {
        playMusic();
    }
});

function playMusic() {
    content.classList.add("paused");
    playBtnIcon.innerHTML = "pause";
    Audio.play();
}

function pauseMusic() {
    content.classList.remove("paused");
    playBtnIcon.innerHTML = "play_arrow";
    Audio.pause();
}

nextBtn.addEventListener("click", ()=> {
    nextMusic();
})

previousBtn.addEventListener("click", ()=> {
    previousMusic();
})

function nextMusic() {
    index++;
    if(index > music.length) {
        index - 1;
    }
    else {
        index = index;
    }
    loadData(index);
    playMusic();
}

function previousMusic() {
    index--;
    if(index <= 0) {
        index = music.length;
    }
    else {
        index = index;
    }
    loadData(index);
    playMusic();
}

Audio.addEventListener("timeupdate", (e)=> {
    const initialTime = e.target.currentTime;
    const finalTime = e.target.duration;
    let barWidth = (initialTime / finalTime) * 100;
    timelineBar.style.width = barWidth + "%";

    timelineDetails.addEventListener("click", (e)=> {
        let timelineValue = timelineDetails.clientWidth;
        let clickedoffsetX = e.offsetX;
        let musicDuration = Audio.duration;

        Audio.currentTime = (clickedoffsetX / timelineValue) * musicDuration;
    });
})

Audio.addEventListener("loadeddata", () => {
    let finalTimeData = content.querySelector(".end");
  
    let AudioDuration = Audio.duration;
    let finalMinutes = Math.floor(AudioDuration / 60);
    let finalSeconds = Math.floor(AudioDuration % 60);
    if (finalSeconds < 10) {
      finalSeconds = "0" + finalSeconds;
    }
    finalTimeData.innerText = finalMinutes + ":" + finalSeconds;
  
    let currentTimeData = content.querySelector(".current");
  
    function updateTime() {
      let currentTime = Audio.currentTime;
      let currentMinutes = Math.floor(currentTime / 60);
      let currentSeconds = Math.floor(currentTime % 60);
      if (currentSeconds < 10) {
        currentSeconds = "0" + currentSeconds;
      }
      currentTimeData.innerText = currentMinutes + ":" + currentSeconds;
    }
  
    updateTime(); // initial update
    Audio.addEventListener("timeupdate", updateTime); // update every second
  
    repeatBtn.addEventListener("click", () => {
      Audio.currentTime = 0;
    });
  });
  
  

shuffleBtn.addEventListener("click", ()=> {
    let randIndex = Math.floor(Math.random() * music.length) + 1;
    loadData(randIndex);
    playMusic();
})

Audio.addEventListener("ended", ()=> {
    index++;
    if(index > music.length) {
        index = 1;
    }

    loadData(index);
    playMusic();
})