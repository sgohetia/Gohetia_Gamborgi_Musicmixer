(() => {
  console.log("Connected!"); // This means that our JS connection is okay.

  // VARIABLES
  const iconHolder = document.querySelector(".icon_holder");
  const draggablePieces = document.querySelectorAll(".icon_holder img");
  const dropZones = document.querySelectorAll(".drag_Box");
  const resetButton = document.querySelector("#refresh"); 
  const soundwave = document.querySelector("#soundwave"); // Added this to handle soundwave visibility

  // FUNCTIONS

  // Function of Drag Start
  const handleDragStart = (ev) => {
    console.log("draggin...");
    ev.dataTransfer.setData("img", ev.target.id);
  };

  // Function of Drag Drop
  const handleDrop = (ev) => {
    ev.preventDefault();
    console.log("you dropped a track on me");

    if (ev.target.childElementCount > 0) {
      console.log("one track only please!");
      return;
    }

    console.log(ev.dataTransfer.getData("img"));

    let targetAudio = document.querySelector(`#${ev.dataTransfer.getData("img")}`).dataset.audio;
    console.log(targetAudio);

    let myAudio = document.createElement("audio");
    myAudio.src = targetAudio;
    myAudio.loop = true;
    document.body.appendChild(myAudio);
    myAudio.play();

    soundwave.style.display = "flex"; // Show the soundwave

    myAudio.addEventListener("ended", () => {
      soundwave.style.display = "none"; // Hide the soundwave when the audio ends
    });

    let data = ev.dataTransfer.getData("img");
    ev.target.appendChild(document.querySelector(`#${data}`));
  };

  // Functio nof Reset
  const handleReset = () => {
    console.log("Resetting...");

    // Move all icons back to the original icon holder
    dropZones.forEach((zone) => {
      while (zone.firstChild) {
        iconHolder.appendChild(zone.lastChild);
      }
    });

    // Stop all playing audios and remove them
    const audios = document.querySelectorAll("audio");
    audios.forEach((audio) => {
      audio.pause();
      audio.remove();
    });

    // Hide the soundwave
    soundwave.style.display = "none";
  };

  // EVENT LISTENERS
  document.addEventListener("dragover", (ev) => {
    ev.preventDefault();
  });

  window.addEventListener("dragover", (ev) => {
    ev.preventDefault();
  }, false);

  window.addEventListener("drop", (ev) => {
    ev.preventDefault();
  }, false);

  draggablePieces.forEach((piece) => {
    piece.addEventListener("dragstart", handleDragStart);
  });

  dropZones.forEach((zone) => {
    zone.addEventListener("dragover", (ev) => {
      ev.preventDefault();
    });

    zone.addEventListener("drop", handleDrop);
  });

  resetButton.addEventListener("click", handleReset);

  // Initialize soundwave display
  soundwave.style.display = "none";
})();
