document.addEventListener('DOMContentLoaded', function() {
    // Sidebar funcional (pode ser igual ao da home, se quiser reutilizar)
    const sidebar = document.querySelector('.sidebar');
    const menuBtn = document.querySelector('.menu-btn');
    const closeBtn = document.querySelector('.close-btn');
    const overlay = document.querySelector('.sidebar-overlay');

    menuBtn.addEventListener('click', function() {
        sidebar.classList.add('open');
        overlay.classList.add('active');
    });

    closeBtn.addEventListener('click', function() {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
    });

    overlay.addEventListener('click', function() {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sidebar.classList.contains('open')) {
            sidebar.classList.remove('open');
            overlay.classList.remove('active');
        }
    });

    // Funções específicas da página de notas podem ser adicionadas aqui
    // Exemplo: interatividade, quizzes, etc.
});

document.addEventListener('DOMContentLoaded', function() {
  const resultado = document.getElementById('resultadoNota');
  const keys = document.querySelectorAll('.key');

  keys.forEach(key => {
    key.addEventListener('click', function() {
      keys.forEach(k => k.classList.remove('selected'));
      this.classList.add('selected');
      const nota = this.dataset.note;
      resultado.textContent = `Nota selecionada: ${nota}`;
    });
  });
});