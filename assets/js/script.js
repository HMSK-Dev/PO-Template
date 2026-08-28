 const btn = document.getElementById('menuToggle');
        const menu = document.getElementById('mobileMenu');
        const iconOpen = document.getElementById('iconOpen');
        const iconClose = document.getElementById('iconClose');
            
        btn.addEventListener('click', () => {
            const isOpen = !menu.classList.contains('hidden');
            menu.classList.toggle('hidden');
            menu.classList.toggle('flex');
            iconOpen.classList.toggle('hidden');
            iconClose.classList.toggle('hidden');
            btn.setAttribute('aria-expanded', String(!isOpen));
        });