const Speech = text => {
  let msg = new SpeechSynthesisUtterance(text);
  msg.rate = 1;
  msg.lang = "es-ES";
  if ("speechSynthesis" in window) {
    window.speechSynthesis.speak(msg);
  }
};

export default Speech;
