document.addEventListener("DOMContentLoaded", async () => {
  await Tone.start();

  const keysContainer = document.querySelector(".keys");
  const resultado = document.getElementById("resultadoNota");

  const octaves = [3, 4, 5];
  const whiteNotes = ["C", "D", "E", "F", "G", "A", "B"];
  const blackNotes = ["C#", "D#", "", "F#", "G#", "A#", ""];

  const noteFrequencies = {
    "C3": 130.81, "C#3": 138.59, "D3": 146.83, "D#3": 155.56, "E3": 164.81,
    "F3": 174.61, "F#3": 185.00, "G3": 196.00, "G#3": 207.65, "A3": 220.00, "A#3": 233.08, "B3": 246.94,
    "C4": 261.63, "C#4": 277.18, "D4": 293.66, "D#4": 311.13, "E4": 329.63,
    "F4": 349.23, "F#4": 369.99, "G4": 392.00, "G#4": 415.30, "A4": 440.00, "A#4": 466.16, "B4": 493.88,
    "C5": 523.25, "C#5": 554.37, "D5": 587.33, "D#5": 622.25, "E5": 659.25,
    "F5": 698.46, "F#5": 739.99, "G5": 783.99, "G#5": 830.61, "A5": 880.00, "A#5": 932.33, "B5": 987.77
  };

  // Players base (C3, C4, C5)
  const volume = new Tone.Volume(-6).toDestination();
  const players = {
    C3: new Tone.Player("C3.mp3").connect(volume),
    C4: new Tone.Player("C4.mp3").connect(volume),
    C5: new Tone.Player("C5.mp3").connect(volume)
  };

  // Faixas
  const keyZones = [
    { base: "C3", range: ["C3", "B3"] },
    { base: "C4", range: ["C4", "B4"] },
    { base: "C5", range: ["C5", "B5"] }
  ];

  function getBaseForNote(note) {
    for (const zone of keyZones) {
      const notes = Object.keys(noteFrequencies);
      const idx = notes.indexOf(note);
      const idxMin = notes.indexOf(zone.range[0]);
      const idxMax = notes.indexOf(zone.range[1]);
      if (idx >= idxMin && idx <= idxMax) return zone.base;
    }
    return "C4";
  }

  function playNote(note) {
    const base = getBaseForNote(note);
    const freqBase = noteFrequencies[base];
    const freqTarget = noteFrequencies[note];
    const semitones = 12 * Math.log2(freqTarget / freqBase); // diferença em semitons

    // Ajuste de pitch via playbackRate
    const playbackRate = Math.pow(2, semitones / 12);

    const player = new Tone.Player(players[base].buffer).connect(volume);
    player.playbackRate = playbackRate;
    player.start();

    resultado.textContent = `🎵 Nota: ${note} (Base: ${base}, ${semitones.toFixed(2)} semitons)`;
  }

  // Criação das teclas
  octaves.forEach(oct => {
    whiteNotes.forEach((wnote, idx) => {
      const white = document.createElement("div");
      white.classList.add("key", "white");
      white.dataset.note = `${wnote}${oct}`;
      white.textContent = `${wnote}${oct}`;
      keysContainer.appendChild(white);

      const bnote = blackNotes[idx];
      if (bnote) {
        const black = document.createElement("div");
        black.classList.add("key", "black");
        black.dataset.note = `${bnote}${oct}`;
        keysContainer.appendChild(black);
        setTimeout(() => {
          black.style.left = `${white.offsetLeft + white.offsetWidth - (black.offsetWidth / 2)}px`;
        }, 0);
      }
    });
  });

  const keys = document.querySelectorAll(".key");

  keys.forEach(key => {
    const note = key.dataset.note;
    key.addEventListener("mousedown", () => playNote(note));
    key.addEventListener("touchstart", e => { e.preventDefault(); playNote(note); });
  });
});
