
(function () {
  const menuToggle = document.getElementById('menuToggle');
  const siteMenu = document.getElementById('site-menu');
  const menuOverlay = document.getElementById('menuOverlay');

  if (menuToggle && siteMenu) {
    function openMenu() {
      siteMenu.hidden = false;

      if (menuOverlay) {
        menuOverlay.hidden = false;
      }

      requestAnimationFrame(function () {
        siteMenu.classList.add('is-open');

        if (menuOverlay) {
          menuOverlay.classList.add('is-visible');
        }
      });

      menuToggle.setAttribute('aria-expanded', 'true');
      menuToggle.setAttribute('aria-label', 'Menu sluiten');
      document.body.classList.add('menu-open');
    }

    function closeMenu() {
      siteMenu.classList.remove('is-open');

      if (menuOverlay) {
        menuOverlay.classList.remove('is-visible');
      }

      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Menu openen');
      document.body.classList.remove('menu-open');

      setTimeout(function () {
        if (!siteMenu.classList.contains('is-open')) {
          siteMenu.hidden = true;

          if (menuOverlay) {
            menuOverlay.hidden = true;
          }
        }
      }, 400);
    }

    menuToggle.addEventListener('click', function () {
      const isOpen =
        menuToggle.getAttribute('aria-expanded') === 'true';

      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    siteMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    if (menuOverlay) {
      menuOverlay.addEventListener('click', closeMenu);
    }

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        closeMenu();
      }
    });
  }

  // Automatisch jaartal
  const year = document.getElementById('year');

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Contactformulier
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const naam =
