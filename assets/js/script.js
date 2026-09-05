const nav = document.getElementById('main-nav');
  const navBar = document.getElementById('nav-bar');
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuIconOpen = document.getElementById('menuIconOpen');
  const menuIconClose = document.getElementById('menuIconClose');
  const scrollThreshold = 40;
 
  // Mide la altura actual del <nav> (franja + menú si está abierto)
  // y la deja disponible como variable CSS para todas las secciones.
  function syncNavOffset() {
    const h = nav.getBoundingClientRect().height;
    document.documentElement.style.setProperty('--nav-offset', h + 'px');
  }
 
  // // 1) Achicar la franja superior al hacer scroll
  // function updateNavScrollState() {
  //   if (window.scrollY > scrollThreshold) {
  //     navBar.classList.add('nav-scrolled');
  //   } else {
  //     navBar.classList.remove('nav-scrolled');
  //   }
  //   syncNavOffset();
  // }
 
  // 2) Abrir/cerrar el menú móvil
  function toggleMobileMenu() {
    const isOpen = mobileMenu.classList.contains('flex');
    if (isOpen) {
      mobileMenu.classList.remove('flex');
      mobileMenu.classList.add('hidden');
      menuBtn.setAttribute('aria-expanded', 'false');
      menuIconOpen.classList.remove('hidden');
      menuIconClose.classList.add('hidden');
    } else {
      mobileMenu.classList.remove('hidden');
      mobileMenu.classList.add('flex');
      menuBtn.setAttribute('aria-expanded', 'true');
      menuIconOpen.classList.add('hidden');
      menuIconClose.classList.remove('hidden');
    }
    // Se sincroniza dos veces: al instante y tras la transición del
    // nav-bar (300ms), para que la medida final sea siempre exacta.
    syncNavOffset();
    setTimeout(syncNavOffset, 320);
  }
 
  menuBtn.addEventListener('click', toggleMobileMenu);
  window.addEventListener('scroll', updateNavScrollState);
  window.addEventListener('resize', syncNavOffset);
 
  updateNavScrollState();
  syncNavOffset();