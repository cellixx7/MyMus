// Aguarda o carregamento completo do conteúdo da página
document.addEventListener('DOMContentLoaded', function() {
    // Seleciona o elemento <p> dentro do container
    const welcomeMessage = document.querySelector('.container p');
    // Altera o texto da mensagem de boas-vindas
    welcomeMessage.textContent = 'Explore a world of music at your fingertips!';

    // Seleciona elementos para controle da sidebar
    const sidebar = document.querySelector('.sidebar');
    const toggleBtn = document.getElementById('toggleSidebar');
    const body = document.body;

    // Função para alternar a sidebar
    toggleBtn.addEventListener('click', function() {
        sidebar.classList.toggle('closed');
        body.classList.toggle('sidebar-closed');
    });

    // Menu lateral responsivo
    const menuBtn = document.querySelector('.menu-btn');
    const closeBtn = document.querySelector('.close-btn');

    menuBtn.addEventListener('click', () => {
        sidebar.classList.add('open');
    });

    closeBtn.addEventListener('click', () => {
        sidebar.classList.remove('open');
    });

    // Fecha sidebar ao clicar fora dela
    document.addEventListener('click', (e) => {
        if (sidebar.classList.contains('open') && !sidebar.contains(e.target) && !menuBtn.contains(e.target)) {
            sidebar.classList.remove('open');
        }
    });

    // Scroll suave para âncoras
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
                sidebar.classList.remove('open');
            }
        });
    });

    // Funcionalidades adicionais podem ser adicionadas aqui
});