(() => {
  console.log("Connected!"); //This means that our JS connection is okay.

  (icon_holder = document.querySelectorAll(".icon_holder")),
    (draggablePieces = document.querySelectorAll(".icon_holder img")),
    (dropZones = document.querySelectorAll(".drag_Box"));

  document.addEventListener("dragover", function (ev) {
    ev.preventDefault();
  });

  draggablePieces.forEach((piece) => {
    piece.addEventListener("dragstart", function (ev) {
      console.log("draggin...");

      ev.dataTransfer.setData("img", this.id);
    });
  });

  window.addEventListener(
    "dragover",
    function (ev) {
      ev.preventDefault();
    },
    false
  );
  window.addEventListener(
    "drop",
    function (ev) {
      ev.preventDefault();
    },
    false
  );
  dropZones.forEach((zone) => {
    zone.addEventListener("dragover", function (ev) {
      ev.preventDefault();
    });
    //This means that you dropped a track on this zone
    zone.addEventListener("drop", function (ev) {
      ev.preventDefault();
      console.log("you dropped a track on me");
      //This prevents you from dropping track when there is already a track.
      if (this.childElementCount > 0) {
        console.log("one track only please!");
        return;
      }
      console.log(ev.dataTransfer.getData("img"));

      let targetAudio = document.querySelector(
        `#${ev.dataTransfer.getData("img")}`
      ).dataset.audio;

      console.log(targetAudio);

      let myAudio = document.createElement("audio");
      myAudio.src = targetAudio;
      myAudio.loop = "true";
      document.body.appendChild(myAudio);
      myAudio.play();

      soundwave.style.display = "flex"; // Show the soundwave

      myAudio.addEventListener("ended", function () {
        soundwave.style.display = "none"; // Hide the soundwave when the audio ends
      });

      let data = ev.dataTransfer.getData("img");
      ev.target.appendChild(document.querySelector(`#${data}`));
    });
  });
  soundwave.style.display = "none";
})();
