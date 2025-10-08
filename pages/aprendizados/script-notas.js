document.addEventListener("DOMContentLoaded", async () => {
  // Inicializa o synth do Tone.js
  await Tone.start(); // ⚠️ Necessário para ativar o contexto de áudio em navegadores modernos

  const synth = new Tone.Sampler({
    urls: {
      C4: "C4.mp3",
      "D#4": "Ds4.mp3",
      "F#4": "Fs4.mp3",
      A4: "A4.mp3"
    },
    release: 1,
    baseUrl: "https://tonejs.github.io/audio/casio/"
  }).toDestination();

  const resultado = document.getElementById("resultadoNota");
  const keys = document.querySelectorAll(".key");

  keys.forEach(key => {
    key.addEventListener("click", async () => {
      // Remove seleção anterior
      keys.forEach(k => k.classList.remove("selected"));
      key.classList.add("selected");

      // Identifica e mostra a nota
      const nota = key.dataset.note;
      resultado.textContent = `Nota selecionada: ${nota}`;

      // Inicia o áudio
      try {
        await synth.triggerAttackRelease(nota + "4", "8n");
      } catch (err) {
        console.error("Erro ao tocar nota:", err);
      }
    });
  });
});
