  /* ---------------------------------------------------------------------
     2) MENÚ LATERAL DE ARTÍCULOS — abrir / cerrar
  --------------------------------------------------------------------- */
  const layout = document.getElementById('articulos-layout');
  const sidebar = document.getElementById('sidebar');
  const sidebarBackdrop = document.getElementById('sidebarBackdrop');
  const sidebarOpenBtn = document.getElementById('sidebarOpenBtn');
  const sidebarCollapseBtn = document.getElementById('sidebarCollapseBtn');

  function setSidebarCollapsed(collapsed) {
    sidebar.classList.toggle('is-collapsed', collapsed);
    layout.classList.toggle('is-collapsed', collapsed);
    sidebarBackdrop.classList.toggle('hidden', collapsed);
  }

  sidebarOpenBtn.addEventListener('click', function () { setSidebarCollapsed(false); });
  sidebarCollapseBtn.addEventListener('click', function () { setSidebarCollapsed(true); });
  sidebarBackdrop.addEventListener('click', function () { setSidebarCollapsed(true); });

  // Estado inicial: colapsado en teléfono, abierto en escritorio
  setSidebarCollapsed(window.matchMedia('(max-width: 767px)').matches);

  /* ---------------------------------------------------------------------
     3) CAMBIAR DE ARTÍCULO al hacer clic en un botón del menú
  --------------------------------------------------------------------- */
  const articuloButtons = document.querySelectorAll('.articulo-btn');
  const articuloPanels = document.querySelectorAll('.articulo-panel');
  const contentTitle = document.getElementById('content-title');

  articuloButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const targetId = btn.getAttribute('data-target');

      articuloButtons.forEach(function (b) { b.classList.toggle('is-active', b === btn); });
      articuloPanels.forEach(function (p) { p.classList.toggle('is-active', p.id === targetId); });
      contentTitle.textContent = btn.textContent.trim();

      // En móvil, cerrar el menú automáticamente al elegir un artículo
      if (window.matchMedia('(max-width: 767px)').matches) {
        setSidebarCollapsed(true);
      }
    });
  });