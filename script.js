// Aguarda o carregamento completo do conteúdo da página
document.addEventListener('DOMContentLoaded', function() {

  // ---------- mobile / sidebar (preservado) ----------
  const sidebar = document.querySelector('.sidebar');
  const menuBtn = document.querySelector('.menu-btn');
  const closeBtn = document.querySelector('.close-btn');
  const overlay = document.querySelector('.sidebar-overlay');

  const mobileSidebar = document.getElementById('mobileSidebar');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const mobileLinksWrap = document.getElementById('mobileLinksWrap');
  const mobileClose = document.querySelector('.mobile-close');

  if (menuBtn && sidebar && closeBtn && overlay) {
    menuBtn.addEventListener('click', () => { sidebar.classList.add('open'); overlay.classList.add('active'); });
    closeBtn.addEventListener('click', () => { sidebar.classList.remove('open'); overlay.classList.remove('active'); });
    overlay.addEventListener('click', () => { sidebar.classList.remove('open'); overlay.classList.remove('active'); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && sidebar.classList.contains('open')) {
        sidebar.classList.remove('open'); overlay.classList.remove('active');
      }
    });
  }

  const desktopNav = document.querySelector('.nav-links');
  if (desktopNav && mobileLinksWrap) {
    const clone = desktopNav.cloneNode(true);
    clone.classList.add('mobile-nav');
    mobileLinksWrap.appendChild(clone);
  }

  function openMobile() {
    if (!mobileSidebar || !mobileOverlay) return;
    mobileSidebar.classList.add('open'); mobileOverlay.classList.add('show');
    mobileSidebar.setAttribute('aria-hidden', 'false'); mobileOverlay.setAttribute('aria-hidden', 'false');
    document.documentElement.style.overflow = 'hidden';
  }
  function closeMobile() {
    if (!mobileSidebar || !mobileOverlay) return;
    mobileSidebar.classList.remove('open'); mobileOverlay.classList.remove('show');
    mobileSidebar.setAttribute('aria-hidden', 'true'); mobileOverlay.setAttribute('aria-hidden', 'true');
    document.documentElement.style.overflow = '';
  }

  if (menuBtn) menuBtn.addEventListener('click', openMobile);
  if (mobileClose) mobileClose.addEventListener('click', closeMobile);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobile);
  if (mobileLinksWrap) mobileLinksWrap.addEventListener('click', (e) => { if (e.target.tagName === 'A') closeMobile(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMobile(); });

  // ---------- Dropdown panels (refeito com base no exemplo "responsive-dropdown-menu-2") ----------
  (function(){
    const CLOSE_DELAY_LONG = 650;   // dá tempo para o cursor atravessar o espaço até o painel
    const CLOSE_DELAY_SHORT = 180;  // usado ao sair do painel
    const navbar = document.querySelector('.navbar');

    const dropdownItems = Array.from(document.querySelectorAll('.nav-links .has-dropdown'));
    const panels = Array.from(document.querySelectorAll('.dropdown-panel'));

    // map name -> panel element (data-for or id fallback)
    const panelsByName = {};
    panels.forEach(p => {
      const name = (p.dataset.for || p.getAttribute('data-for') || p.id.replace('panel-','')).trim();
      panelsByName[name] = p;
      p.style.display = 'none';
      p.setAttribute('aria-hidden','true');
      p.style.position = 'fixed';
      p.style.zIndex = 1100;
      p.dataset.open = 'false';
    });

    // helper timers/flags
    const timers = new Map(); // name -> timeout id

    function clearTimer(name){
      const t = timers.get(name);
      if(t){ clearTimeout(t); timers.delete(name); }
    }

    function isPointerOver(elem){
      if(!elem) return false;
      const r = elem.getBoundingClientRect();
      // se r for inválido
      if(r.width === 0 && r.height === 0) return false;
      const x = lastPointer.x, y = lastPointer.y;
      return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
    }

    // acompanha posição do ponteiro global (usado na verificação de fechamento)
    const lastPointer = { x: -1, y: -1 };
    document.addEventListener('pointermove', (ev) => { lastPointer.x = ev.clientX; lastPointer.y = ev.clientY; }, { passive: true });

    function positionPanelUnderAnchor(panel, anchor){
      if(!panel || !anchor) return;
      const rect = anchor.getBoundingClientRect();
      const panelWidth = panel.offsetWidth || 300;
      let left = rect.left + rect.width / 2 - panelWidth / 2;
      left = Math.max(8, Math.min(left, window.innerWidth - panelWidth - 8));
      const navRect = navbar.getBoundingClientRect();
      const top = navRect.bottom + 8;
      panel.style.left = `${left}px`;
      panel.style.top = `${top}px`;
    }

    function openPanel(name, anchor){
      const panel = panelsByName[name];
      if(!panel) return;
      clearTimer(name);
      positionPanelUnderAnchor(panel, anchor);
      panel.style.display = 'block';
      // força reflow para transições funcionarem
      void panel.offsetHeight;
      panel.classList.add('open');
      panel.setAttribute('aria-hidden','false');
      panel.dataset.open = 'true';
      anchor.setAttribute('aria-expanded','true');
    }

    function closePanel(name, anchor){
      const panel = panelsByName[name];
      if(!panel) return;
      clearTimer(name);
      panel.classList.remove('open');
      panel.setAttribute('aria-hidden','true');
      panel.dataset.open = 'false';
      if(anchor) anchor.setAttribute('aria-expanded','false');
      setTimeout(()=> { if(panel.dataset.open === 'false') panel.style.display = 'none'; }, 200);
    }

    // schedule close with live pointer check
    function scheduleCloseWithPointerCheck(name, anchor, delay){
      clearTimer(name);
      const id = setTimeout(() => {
        const panel = panelsByName[name];
        // se ponteiro estiver sobre anchor ou panel, cancela fechamento
        if(isPointerOver(panel) || isPointerOver(anchor)) {
          clearTimer(name);
          return;
        }
        closePanel(name, anchor);
      }, delay);
      timers.set(name, id);
    }

    // liga eventos nos itens dropdown e painéis
    dropdownItems.forEach(item => {
      const anchor = item.querySelector('a');
      if(!anchor) return;
      const name = anchor.textContent.trim();
      const panel = panelsByName[name];

      // mouse entra no link -> abre imediatamente
      anchor.addEventListener('pointerenter', () => {
        openPanel(name, anchor);
      });

      // mouse sai do link -> agenda fechamento longo (permite alcançar o painel)
      anchor.addEventListener('pointerleave', () => {
        scheduleCloseWithPointerCheck(name, anchor, CLOSE_DELAY_LONG);
      });

      // foco/blur para teclado
      anchor.addEventListener('focus', () => openPanel(name, anchor));
      anchor.addEventListener('blur', () => scheduleCloseWithPointerCheck(name, anchor, CLOSE_DELAY_SHORT));

      // clique mobile toggle
      anchor.addEventListener('click', (e) => {
        if(window.innerWidth <= 900){
          e.preventDefault();
          const isOpen = panelsByName[name] && panelsByName[name].dataset.open === 'true';
          if(isOpen) closePanel(name, anchor); else openPanel(name, anchor);
        }
      });

      if(!panel) return;

      // quando ponteiro entra no painel, cancela qualquer timer e garante manter aberto
      panel.addEventListener('pointerenter', () => {
        clearTimer(name);
        positionPanelUnderAnchor(panel, anchor);
        // garante que o painel esteja visível caso timer de abertura ainda não tenha terminado
        if(panel.dataset.open !== 'true') {
          panel.style.display = 'block';
          void panel.offsetHeight;
          panel.classList.add('open');
          panel.setAttribute('aria-hidden','false');
          panel.dataset.open = 'true';
          anchor.setAttribute('aria-expanded','true');
        }
      });

      // quando sai do painel, agenda fechamento curto
      panel.addEventListener('pointerleave', () => {
        scheduleCloseWithPointerCheck(name, anchor, CLOSE_DELAY_SHORT);
      });

      // fechar ao clicar em um link interno (navegação)
      panel.addEventListener('click', (ev) => {
        if(ev.target.tagName === 'A') closePanel(name, anchor);
      });

      // acessibilidade (teclado)
      panel.addEventListener('focusin', () => clearTimer(name));
      panel.addEventListener('focusout', () => scheduleCloseWithPointerCheck(name, anchor, CLOSE_DELAY_SHORT));
    });

    // reposicionar painéis abertos quando rolar/redimensionar para seguirem a navbar
    function repositionAll(){
      dropdownItems.forEach(item => {
        const a = item.querySelector('a');
        if(!a) return;
        const name = a.textContent.trim();
        const panel = panelsByName[name];
        if(panel && panel.dataset.open === 'true') positionPanelUnderAnchor(panel, a);
      });
    }
    window.addEventListener('scroll', repositionAll, { passive: true });
    window.addEventListener('resize', repositionAll, { passive: true });

  })();

  // ---------- rest of existing code (if any) ----------
});
