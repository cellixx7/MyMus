// Atualizado: inicializa o piano reutilizável criado em piano.js
document.addEventListener("DOMContentLoaded", async () => {
  // cria piano usando a função global createPiano (piano.js)
  if (window.createPiano) {
    window.pianoInstance = await window.createPiano({
      container: '.keys',
      result: '#resultadoNota',
      octaves: [3,4,5],
      // opcional: manter o keyMap anterior
      keyMap: {
        'a':'C4','w':'C#4','s':'D4','e':'D#4','d':'E4','f':'F4','t':'F#4','g':'G4',
        'y':'G#4','h':'A4','u':'A#4','j':'B4','k':'C5','o':'C#5','l':'D5','p':'D#5',';':'E5'
      }
    });
  } else {
    console.warn('piano.js não carregado — createPiano indisponível');
  }

  // restante do script-notas (se houver) continua aqui...
});
