// Aguarda o carregamento completo do conteúdo da página
document.addEventListener('DOMContentLoaded', function() {
    // Seleciona elementos para controle da sidebar
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

    // Scroll suave com animação mais fluida
    function smoothScrollTo(selector) {
        const target = document.querySelector(selector);
        if (target) {
            const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
            const targetY = target.getBoundingClientRect().top + window.scrollY - navbarHeight - 20;

            const startY = window.scrollY;
            const distance = targetY - startY;
            const duration = 700;
            let startTime = null;

            function animation(currentTime) {
                if (!startTime) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const progress = Math.min(timeElapsed / duration, 1);

                // Ease-in-out
                const ease = progress < 0.5
                    ? 2 * progress * progress
                    : -1 + (4 - 2 * progress) * progress;

                window.scrollTo(0, startY + distance * ease);

                if (progress < 1) {
                    requestAnimationFrame(animation);
                }
            }

            requestAnimationFrame(animation);
        }
    }

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                smoothScrollTo(href);
                sidebar.classList.remove('open');
            }
        });
    });

    // Link para a seção "Sobre" ao clicar na logo do hero
    const logoHeroImg = document.getElementById('logo-hero-img');
    if (logoHeroImg) {
        logoHeroImg.addEventListener('click', function() {
            smoothScrollTo('#sobre');
        });
    }

    // Funcionalidades adicionais podem ser adicionadas aqui

    // Clona links da nav principal para o painel móvel (mantém atualizações centralizadas)
    const desktopNav = document.querySelector('.nav-links');
    const mobileLinksWrap = document.getElementById('mobileLinksWrap');
    if (desktopNav && mobileLinksWrap) {
        const clone = desktopNav.cloneNode(true);
        clone.classList.add('mobile-nav');
        mobileLinksWrap.appendChild(clone);
    }

    function openMobile() {
        mobileSidebar.classList.add('open');
        mobileOverlay.classList.add('show');
        mobileSidebar.setAttribute('aria-hidden', 'false');
        mobileOverlay.setAttribute('aria-hidden', 'false');
        // trava scroll do body
        document.documentElement.style.overflow = 'hidden';
    }

    function closeMobile() {
        mobileSidebar.classList.remove('open');
        mobileOverlay.classList.remove('show');
        mobileSidebar.setAttribute('aria-hidden', 'true');
        mobileOverlay.setAttribute('aria-hidden', 'true');
        document.documentElement.style.overflow = '';
    }

    // eventos
    if (menuBtn) menuBtn.addEventListener('click', openMobile);
    if (mobileClose) mobileClose.addEventListener('click', closeMobile);
    if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobile);

    // fecha ao clicar em qualquer link do menu móvel
    mobileLinksWrap.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') closeMobile();
    });

    // fecha com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMobile();
    });
});

