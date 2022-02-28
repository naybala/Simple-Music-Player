const playlistContainerTag = document.querySelector(".playlistContainer", [0]);
const audioTag = document.querySelector(".audioTag", [0]);
const songName = document.querySelector("p", [0]);
const imgTag = document.querySelector(".img", [0])
const currentAndTotalTime = document.querySelector(".currentAndTotalTime", [0]);
const progressBar = document.querySelector("#progressBar", [0]);
const currentProgress = document.querySelector("#currentProgress", [0]);
const playButton = document.querySelector('.playButton', [0]);
const pauseButton = document.querySelector('.pauseButton', [0]);
const nextButton = document.querySelector('.nextButton', [0]);
const previousButton = document.querySelector('.previousButton', [0]);

const tracks = [
  { trackId: "music/track1.mp3", artist: "Ko Htet", title: "Track 1", image: "image/track1.jpg" },
  { trackId: "music/track2.mp3", artist: "Ko Htet", title: "Track 2", image: "image/track2.png" },
  { trackId: "music/track3.mp3", artist: "Dvision", title: "I'm so lonely", image: "image/track3.png" },
  { trackId: "music/track4.mp3", artist: "Shwe Htoo", title: "Sate Kuu Yin Sar Oak", image: "image/track4.png" },
];

for (let i = 0; i < tracks.length; i++) {
  const trackTag = document.createElement("div");
  trackTag.addEventListener("click", () => {
    isPlaying = true;
    const trackId = tracks[i].trackId;
    audioTag.src = trackId;
    audioTag.play();
    imgTag.src = tracks[i].image;
    songName.textContent = tracks[i].title + " - " + tracks[i].artist;
    songName.style.padding = "10px";
    hideShowButton();
    currentIndex = i;
  });
  trackTag.classList.add("trackItem");
  const title = (i + 1).toString() + "(" + tracks[i].title + ")" + "." + tracks[i].artist;
  trackTag.textContent = title;
  playlistContainerTag.append(trackTag);
}

let durationText = "00:00";
let duration = 0;
audioTag.addEventListener("loadeddata", () => {
  duration = Math.floor(audioTag.duration);
  durationText = createMinuteAndSecond(duration);
});

let currentTime = 0;
audioTag.addEventListener("timeupdate", () => {
  currentTime = Math.floor(audioTag.currentTime);
  const currentTimeText = createMinuteAndSecond(currentTime);
  const bar = updateBar(currentTime);
  currentProgress.style.width = bar + "px";
  const fianlText = currentTimeText + " / " + durationText;
  currentAndTotalTime.textContent = fianlText;
});

const updateBar = (currentTime) => {
  const currentBar = (progressBar.clientWidth / duration) * currentTime;
  return currentBar;
}

const createMinuteAndSecond = (total) => {
  const minute = Math.floor(total / 60);
  const second = Math.floor(total % 60);

  const minuteText = minute < 10 ? "0" + minute.toString() : minute;
  const secondText = second < 10 ? "0" + second.toString() : second;

  return minuteText + ":" + secondText;
}

let currentIndex = 0;
let isPlaying = false;
playButton.addEventListener("click", () => {
  isPlaying = true;
  if (currentTime === 0) {
    playingMusic();
  } else {
    audioTag.play();
    hideShowButton();
  }
});

pauseButton.addEventListener("click", () => {
  isPlaying = false;
  audioTag.pause();
  hideShowButton();
});
nextButton.addEventListener("click", () => {
  // console.log(currentIndex);
  if (currentIndex === tracks.length - 1) {
    currentIndex = 0;
    playingMusic();
  } else {
    currentIndex += 1;
    playingMusic();
  }
});
previousButton.addEventListener("click", () => {
  // console.log(currentIndex);
  isPlaying = true;
  if (currentIndex === 0) {
    currentIndex = tracks.length - 1;
    playingMusic();
  } else {
    currentIndex -= 1;
    playingMusic();
  }
});

const hideShowButton = () => {
  if (isPlaying) {
    playButton.style.display = "none";
    pauseButton.style.display = "block";
  } else {
    playButton.style.display = "block";
    pauseButton.style.display = "none";
  }
};

const playingMusic = () => {
  const idPlay = tracks[currentIndex].trackId;
  audioTag.src = idPlay;
  audioTag.play();
  imgTag.src = tracks[currentIndex].image;
  songName.textContent = tracks[currentIndex].title + " - " + tracks[currentIndex].artist
  hideShowButton();
}







