window.playSound = function playSound(soundId){
  var elem = document.getElementById(soundId);
  elem.volume = 0.2;
  elem.play();
}