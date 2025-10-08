document.addEventListener("DOMContentLoaded", async () => {
  await Tone.start();

  const keysContainer = document.querySelector(".keys");
  const resultado = document.getElementById("resultadoNota");

  const octaves = [3, 4, 5];
  const whiteNotes = ["C", "D", "E", "F", "G", "A", "B"];
  const blackNotes = ["C#", "D#", "", "F#", "G#", "A#", ""];

  const baseSamples = { "C3": "C3.mp3", "C4": "C4.mp3", "C5": "C5.mp3" };

  const noteFrequencies = {
    "C3": 130.81, "C#3": 138.59, "D3": 146.83, "D#3": 155.56, "E3": 164.81,
    "F3": 174.61, "F#3": 185.00, "G3": 196.00, "G#3": 207.65, "A3": 220.00, "A#3": 233.08, "B3": 246.94,
    "C4": 261.63, "C#4": 277.18, "D4": 293.66, "D#4": 311.13, "E4": 329.63,
    "F4": 349.23, "F#4": 369.99, "G4": 392.00, "G#4": 415.30, "A4": 440.00, "A#4": 466.16, "B4": 493.88,
    "C5": 523.25, "C#5": 554.37, "D5": 587.33, "D#5": 622.25, "E5": 659.25,
    "F5": 698.46, "F#5": 739.99, "G5": 783.99, "G#5": 830.61, "A5": 880.00, "A#5": 932.33, "B5": 987.77
  };

  // Cria players para cada sample base
  const volume = new Tone.Volume(-6).toDestination();
  const players = {};
  for (let key in baseSamples) {
    players[key] = new Tone.Player({ url: "https://tonejs.github.io/audio/casio/" + baseSamples[key], autostart: false }).connect(volume);
  }

  // Criação dinâmica das teclas
  octaves.forEach(oct => {
    whiteNotes.forEach((wnote, idx) => {
      // Tecla branca
      const white = document.createElement("div");
      white.classList.add("key", "white");
      white.dataset.note = `${wnote}${oct}`;
      white.textContent = `${wnote}${oct}`;
      keysContainer.appendChild(white);

      // Tecla preta
      const bnote = blackNotes[idx];
      if (bnote) {
        const black = document.createElement("div");
        black.classList.add("key", "black");
        black.dataset.note = `${bnote}${oct}`;
        keysContainer.appendChild(black);

        // Calcula left depois que a branca é renderizada
        setTimeout(() => {
          black.style.left = `${white.offsetLeft + white.offsetWidth - (black.offsetWidth / 2)}px`;
        }, 0);
      }
    });
  });

  // Funções de reprodução
  const keyZones = [
    { base: "C3", range: ["C3", "B3"] },
    { base: "C4", range: ["C4", "B4"] },
    { base: "C5", range: ["C5", "B5"] }
  ];

  function getClosestSample(note) {
    const allNotes = Object.keys(noteFrequencies);
    const idxNote = allNotes.indexOf(note);

    for (const zone of keyZones) {
      const [min, max] = zone.range;
      const idxMin = allNotes.indexOf(min);
      const idxMax = allNotes.indexOf(max);
      if (idxNote >= idxMin && idxNote <= idxMax) return zone.base;
    }
    return "C4";
  }

  // Corrigido: Reproduz o áudio com pitch correto usando Tone.Sampler
  const sampler = new Tone.Sampler({
    urls: {
      C3: "C3.mp3",
      C4: "C4.mp3",
      C5: "C5.mp3"
    },
    release: 1,
    baseUrl: "https://tonejs.github.io/audio/casio/"
  }).connect(volume);

  function playNote(note) {
    sampler.triggerAttack(note);
    resultado.textContent = `🎵 Nota: ${note}`;
  }

  function stopNote(note) {
    sampler.triggerRelease(note);
  }

  // Eventos clique/toque
  const keys = document.querySelectorAll(".key");
  keys.forEach(key => {
    const note = key.dataset.note;

    const handleDown = () => {
      keys.forEach(k => k.classList.remove("selected"));
      key.classList.add("selected");
      playNote(note);
    };
    const handleUp = () => {
      key.classList.remove("selected");
      stopNote(note);
    };

    key.addEventListener("mousedown", handleDown);
    key.addEventListener("mouseup", handleUp);
    key.addEventListener("mouseleave", handleUp);
    key.addEventListener("touchstart", e => { e.preventDefault(); handleDown(); });
    key.addEventListener("touchend", e => { e.preventDefault(); handleUp(); });
  });

  // Teclado físico (opcional, pode expandir o mapeamento)
  document.addEventListener("keydown", (e) => {
    if (e.repeat) return;
    const noteKey = Array.from(keys).find(k => k.textContent === e.key.toUpperCase());
    if (noteKey) {
      noteKey.classList.add("selected");
      playNote(noteKey.dataset.note);
    }
  });

  document.addEventListener("keyup", (e) => {
    const noteKey = Array.from(keys).find(k => k.textContent === e.key.toUpperCase());
    if (noteKey) {
      noteKey.classList.remove("selected");
      stopNote(noteKey.dataset.note);
    }
  });
});
