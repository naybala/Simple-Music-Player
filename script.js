const playlistContainerTag = document.querySelector(".playlistContainer", [0]);
const audioTag = document.querySelector(".audioTag", [0]);
const imgTag = document.querySelector(".img", [0])
const currentAndTotalTime = document.querySelector(".currentAndTotalTime", [0]);
const progressBar = document.querySelector("#progressBar", [0]);
const currentProgress = document.querySelector("#currentProgress", [0]);

const tracks = [
  { trackId: "music/track1.mp3", artist: "Ko Htet", title: "Track 1", image: "image/track1.jpg" },
  { trackId: "music/track2.mp3", artist: "Ko Htet", title: "Track 2", image: "image/track2.png" },
  { trackId: "music/track3.mp3", artist: "Dvision", title: "I'm so lonely", image: "image/track3.png" },
  { trackId: "music/track4.mp3", artist: "Shwe Htoo", title: "Sate Kuu Yin Sar Oak", image: "image/track4.png" },
];

for (let i = 0; i < tracks.length; i++) {
  const trackTag = document.createElement("div");
  trackTag.addEventListener("click", () => {
    const trackId = tracks[i].trackId;
    audioTag.src = trackId;
    audioTag.play();
    imgTag.src = tracks[i].image;

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
  // const average = 500 / duration;
  // finalAverage = 
});

audioTag.addEventListener("timeupdate", () => {
  const currentTime = Math.floor(audioTag.currentTime);
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




