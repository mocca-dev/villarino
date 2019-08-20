const Speech = text => {
  let msg = new SpeechSynthesisUtterance(text);
  msg.rate = 1.5;
  msg.lang = "es-ES";
  if ("speechSynthesis" in window) {
    window.speechSynthesis.speak(msg);
  }
};

export default Speech;
