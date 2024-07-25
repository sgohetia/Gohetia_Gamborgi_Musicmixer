(() => {
  console.log("Connected!"); //This means that our JS connection is okay.
  const songsList = [
    {
      name: "Misery Business",
      artist: "Paramore",
      src: "audio/1.mp3",
      cover: "images/paramore.jpg",
    },
    {
      name: "Take Me Home Country Road",
      artist: "John Denver",
      src: "audio/2.mp3",
      cover: "images/johnD.jpg",
    },
    {
      name: "Bring Me to Life",
      artist: "Chris Daughtry",
      src: "audio/3.mp3",
      cover: "images/chrisD.jpg",
    },
    //Add more songs here brotha!
  ];

  const artistName = document.querySelector(".artist-name");
  const musicName = document.querySelector(".song-name");
  const fillBar = document.querySelector(".fill-bar");
  const time = document.querySelector(".time");
  const cover = document.querySelector("#cover");
  const playBtn = document.querySelector("#play");
  const prevBtn = document.querySelector("#prev");
  const nextBtn = document.querySelector("#next");
  const prog = document.querySelector(".progress-bar");

  let song = new Audio();
  let currentSong = 0;
  let playing = false;

  loadSong(currentSong);
  song.addEventListener("timeupdate", updateProgress);
  song.addEventListener("ended", nextSong);
  prevBtn.addEventListener("click", prevSong);
  nextBtn.addEventListener("click", nextSong);
  playBtn.addEventListener("click", togglePlayPause);
  prog.addEventListener("click", seek);

  function loadSong(index) {
    const { name, artist, src, cover: thumb } = songsList[index];
    artistName.innerText = artist;
    musicName.innerText = name;
    song.src = src;
    cover.style.backgroundImage = `url(${thumb})`;
  }
  function updateProgress() {
    if (song.duration) {
      const pos = (song.currentTime / song.duration) * 100;
      fillBar.style.width = `${pos}%`;

      const duration = formatTime(song.duration);
      const currentTime = formatTime(song.currentTime);
      time.innerText = `${currentTime} - ${duration}`;
    }
  }

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  }

  function togglePlayPause() {
    if (playing) {
      song.pause();
    } else {
      song.play();
    }
    playing = !playing;
    playBtn.classList.toggle("fa-pause", playing);
    playBtn.classList.toggle("fa-play", !playing);
    cover.classList.toggle("active", playing);
  }

  function nextSong() {
    currentSong = (currentSong + 1) % songsList.length;
    playMusic();
  }

  function prevSong() {
    currentSong = (currentSong - 1 + songsList.length) % songsList.length;
    playMusic();
  }

  function playMusic() {
    loadSong(currentSong);
    song.play();
    playing = true;
    playBtn.classList.add("fa-pause");
    playBtn.classList.remove("fa-play");
    cover.classList.add("active");
  }

  function seek(e) {
    const pos = (e.offsetX / prog.clientWidth) * song.duration;
    song.currentTime = pos;
  }
})();
