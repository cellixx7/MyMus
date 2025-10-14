// Atualizado: dropdown refeito com base no projeto "responsive-dropdown-menu-2"
// (mantive o código mobile/sidebar existente no topo)
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

  // ---------- Dropdown panels — simplified: open on CLICK (no hover) ----------
  (function(){
    const navbar = document.querySelector('.navbar');
    const anchors = Array.from(document.querySelectorAll('.nav-links .has-dropdown > a'));
    const panels = Array.from(document.querySelectorAll('.dropdown-panel'));

    // map panels by name (data-for / id fallback)
    const panelsByName = {};
    panels.forEach(p => {
      const name = (p.dataset.for || p.getAttribute('data-for') || p.id.replace('panel-','')).trim();
      panelsByName[name] = p;
      // ensure initial hidden state
      p.style.display = p.style.display || 'none';
      p.setAttribute('aria-hidden','true');
      p.style.position = p.style.position || 'fixed';
      p.style.zIndex = 1100;
    });

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
      // close other panels first
      Object.keys(panelsByName).forEach(n => {
        if(n !== name) closePanel(n);
      });
      positionPanelUnderAnchor(panel, anchor);
      panel.style.display = 'block';
      void panel.offsetHeight;
      panel.classList.add('open');
      panel.setAttribute('aria-hidden','false');
      anchor.setAttribute('aria-expanded','true');
    }

    function closePanel(name){
      const panel = panelsByName[name];
      if(!panel) return;
      const anchor = Array.from(document.querySelectorAll('.nav-links .has-dropdown > a'))
        .find(a => a.textContent.trim() === name);
      panel.classList.remove('open');
      panel.setAttribute('aria-hidden','true');
      if(anchor) anchor.setAttribute('aria-expanded','false');
      setTimeout(()=> { if(!panel.classList.contains('open')) panel.style.display = 'none'; }, 180);
    }

    function togglePanel(name, anchor){
      const panel = panelsByName[name];
      if(!panel) return;
      const isOpen = panel.style.display !== 'none' && panel.classList.contains('open');
      if(isOpen) closePanel(name); else openPanel(name, anchor);
    }

    // attach click handlers to anchors (open on click)
    anchors.forEach(a => {
      const name = a.textContent.trim();
      const panel = panelsByName[name];

      // click toggles panel (prevents default only if panel exists)
      a.addEventListener('click', (e) => {
        if(panel){
          e.preventDefault();
          togglePanel(name, a);
        }
      });

      // keyboard: Enter / Space toggle
      a.addEventListener('keydown', (e) => {
        if(panel && (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar')) {
          e.preventDefault();
          togglePanel(name, a);
        }
      });
    });

    // clicking a link inside a panel closes that panel
    panels.forEach(p => {
      p.addEventListener('click', (e) => {
        if(e.target.tagName === 'A') {
          // find which panel this is
          const name = (p.dataset.for || p.getAttribute('data-for') || p.id.replace('panel-','')).trim();
          closePanel(name);
        }
      });
    });

    // click outside closes all panels
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.nav-links') && !e.target.closest('.dropdown-panel')) {
        Object.keys(panelsByName).forEach(n => closePanel(n));
      }
    });

    // reposition open panels on scroll/resize
    function repositionOpenPanels(){
      Object.keys(panelsByName).forEach(n => {
        const panel = panelsByName[n];
        if(panel && panel.style.display !== 'none' && panel.classList.contains('open')) {
          const anchor = Array.from(document.querySelectorAll('.nav-links .has-dropdown > a'))
            .find(a => a.textContent.trim() === n);
          positionPanelUnderAnchor(panel, anchor);
        }
      });
    }
    window.addEventListener('scroll', repositionOpenPanels, { passive: true });
    window.addEventListener('resize', repositionOpenPanels, { passive: true });
  })();

  // ---------- rest of existing code (se tiver) ----------
});
