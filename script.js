function updateStatus(index) {
  var statusElements = document.querySelectorAll('span[id^="status"]');
  statusElements.forEach(function(element) {
    element.innerText = "";
  });

  var statusElement = document.getElementById("status" + index);
  statusElement.innerText = "Sedang Diputar";
}

function playSong(mp3Url, mp4Url) {
  Swal.fire({
    title: 'Pilihan Pemutaran',
    text: 'Pilih format pemutaran:',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'MP3',
    cancelButtonText: 'MP4',
    customClass: {
      container: 'custom-swal-container',
      popup: 'custom-swal-popup',
      title: 'custom-swal-title',
      content: 'custom-swal-content',
      confirmButton: 'custom-swal-confirm-button',
      cancelButton: 'custom-swal-cancel-button'
    }
  }).then((result) => {
    if (result.value) {
      audioPlayer.style.display = "block";
      videoPlayer.style.display = "none";
      audioPlayer.src = mp3Url;
      audioPlayer.play();
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      audioPlayer.style.display = "none";
      videoPlayer.style.display = "block";
      videoPlayer.src = mp4Url;
      videoPlayer.play();
    }
  });
}

var audioPlayer = document.getElementById("audioPlayer");
var videoPlayer = document.getElementById("videoPlayer");
var playlist = document.getElementById("playlist");
var firstSong = playlist.getElementsByTagName("li")[0];

audioPlayer.src = "default.mp3";
videoPlayer.src = "default.mp4";

var volumeBar = document.getElementById("volumeBar");
var volumePercentage = document.getElementById("volumePercentage");

volumeBar.addEventListener("input", function() {
  audioPlayer.volume = volumeBar.value;
  videoPlayer.volume = volumeBar.value;
  volumePercentage.innerText = Math.round(volumeBar.value * 100) + "%";
});

volumeBar.addEventListener("change", function() {
  volumePercentage.innerText = (volumeBar.value * 100).toFixed(1) + "%";
});

// Memperbarui keterangan "Sedang Diputar"
var index = audioPlayer.src.split(" ")[0].replace(/^\D+/g, "");
updateStatus(index);

window.addEventListener("DOMContentLoaded", function() {
  if (audioPlayer.src === "") {
    playSong(firstSong.getAttribute("onclick").split(",")[0].slice(11, -1), firstSong.getAttribute("onclick").split(",")[1].slice(1, -2));
  }
});