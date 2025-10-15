// Reutilizável: cria um piano dentro de um container e retorna controle
// Usa Tone.js (garanta que Tone esteja carregado antes de chamar createPiano)
window.createPiano = async function createPiano(opts = {}) {
  const containerSelector = opts.container || '.keys';
  const resultSelector = opts.result || '#resultadoNota';
  const octaves = opts.octaves || [3,4,5];
  const keyMap = opts.keyMap || {
    'a':'C4','w':'C#4','s':'D4','e':'D#4','d':'E4','f':'F4','t':'F#4','g':'G4',
    'y':'G#4','h':'A4','u':'A#4','j':'B4','k':'C5','o':'C#5','l':'D5','p':'D#5',';':'E5'
  };
  const samples = opts.samples || null; // ex: { C3: 'C3.mp3', C4: 'C4.mp3', C5: 'C5.mp3' }

  const whiteNotes = ["C","D","E","F","G","A","B"];
  const blackNotes = ["C#","D#","","F#","G#","A#",""];

  const container = document.querySelector(containerSelector);
  const resultEl = document.querySelector(resultSelector);

  if (!container) {
    console.warn('createPiano: container not found', containerSelector);
    return null;
  }

  // ensure audio context on first interaction
  let started = false;
  async function ensureAudio() {
    if (!started) {
      try { await Tone.start(); } catch(e){ /* ignore */ }
      started = true;
    }
  }

  // volume bus
  const volume = new Tone.Volume(typeof opts.volume === 'number' ? opts.volume : -6).toDestination();

  // simple synth (fallback / default)
  const synth = new Tone.Synth({
    oscillator: { type: opts.synthType || 'sine' },
    envelope: { attack: 0.005, decay: 0.1, sustain: 0.2, release: (opts.synthRelease != null ? opts.synthRelease : 0.8) }
  }).connect(volume);

  // optional sample players (loaded if opts.samples provided)
  // if samples object provided, create a Tone.Sampler (maps provided base notes -> files)
  // ex: samples = { C3: 'C3.mp3', C4: 'C4.mp3', C5: 'C5.mp3' }
  let sampler = null;
  let sampleBases = [];
  if (samples && typeof samples === 'object') {
    try {
      sampler = new Tone.Sampler(samples, {
        onload: () => { /* pronto */ },
        release: typeof opts.sampleRelease === 'number' ? opts.sampleRelease : 1.2
      }).connect(volume);
      sampleBases = Object.keys(samples);
    } catch (err) {
      console.warn('createPiano: sampler load failed, falling back to synth', err);
      sampler = null;
      sampleBases = [];
    }
  }

  function isBlack(note){ return note.includes('#'); }

  // build notes list and DOM keys
  const notes = [];
  octaves.forEach(oct => {
    whiteNotes.forEach((wn, idx) => {
      const wnote = `${wn}${oct}`;
      notes.push(wnote);
      const el = document.createElement('button');
      el.className = 'key white';
      el.dataset.note = wnote;
      el.type = 'button';
      el.innerHTML = `<div class="key-label">${wn}</div>`;
      container.appendChild(el);

      const bnoteName = blackNotes[idx];
      if (bnoteName) {
        const bnote = `${bnoteName}${oct}`;
        notes.push(bnote);
        const bel = document.createElement('button');
        bel.className = 'key black';
        bel.dataset.note = bnote;
        bel.type = 'button';
        bel.innerHTML = `<div class="key-label">${bnoteName.replace('#','♯')}</div>`;
        container.appendChild(bel);
        requestAnimationFrame(() => {
          const whiteRect = el.getBoundingClientRect();
          const parentRect = container.getBoundingClientRect();
          const left = (whiteRect.left - parentRect.left) + whiteRect.width - (bel.offsetWidth/2);
          bel.style.left = `${Math.max(0, left)}px`;
        });
      }
    });
  });

  // interaction handlers (sampler-based if available)
  function playNoteWithSamples(note) {
    if (!sampler) {
      playNoteSynth(note);
      return;
    }
    try {
      // sampler handles pitch-shifting automaticamente
      sampler.triggerAttackRelease(note, '8n');
      if (resultEl) resultEl.textContent = note;
    } catch (err) {
      // fallback
      playNoteSynth(note);
    }
  }

  function playNoteSynth(note) {
    synth.triggerAttackRelease(note, '8n');
    if (resultEl) resultEl.textContent = note;
  }

  function playNote(note){
    ensureAudio();
    if (sampler) playNoteWithSamples(note);
    else playNoteSynth(note);
  }

  function pressVisual(el){
    if(!el) return;
    el.classList.add('pressed','active');
    setTimeout(()=> el.classList.remove('pressed','active'), 140);
  }

  // mouse/touch handlers
  container.addEventListener('pointerdown', (ev) => {
    const key = ev.target.closest('.key');
    if (!key) return;
    ev.preventDefault();
    const note = key.dataset.note;
    playNote(note);
    pressVisual(key);
  });

  // keyboard handling
  const activeKeys = new Set();
  function onKeyDown(e){
    const k = e.key.toLowerCase();
    if (!keyMap[k]) return;
    if (activeKeys.has(k)) return; // already active
    activeKeys.add(k);
    const note = keyMap[k]; // ex: 'C4'
    playNote(note);
    const keyEl = container.querySelector(`.key[data-note="${note}"]`);
    pressVisual(keyEl);
  };
