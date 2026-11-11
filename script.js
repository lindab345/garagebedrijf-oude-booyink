
(function () {
  const menuToggle = document.getElementById('menuToggle');
  const siteMenu = document.getElementById('site-menu');
  const menuOverlay = document.getElementById('menuOverlay');

  // MENU OPENEN EN SLUITEN
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
      if (menuToggle.getAttribute('aria-expanded') !== 'true') {
        return;
      }

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
      }, 450);
    }

    // Klik op de MENU-knop
    menuToggle.addEventListener('click', function () {
      const isOpen =
        menuToggle.getAttribute('aria-expanded') === 'true';

      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Menu sluiten na klikken op een link
    siteMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    // Menu sluiten door op de donkere achtergrond te klikken
    if (menuOverlay) {
      menuOverlay.addEventListener('click', closeMenu);
    }

    // Menu sluiten met Escape
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        closeMenu();
      }
    });
  }

  // AUTOMATISCH JAARTAL
  const year = document.getElementById('year');

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // CONTACTFORMULIER
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const naamElement = document.getElementById('naam');
      const emailElement = document.getElementById('email');
      const berichtElement = document.getElementById('bericht');

      if (!naamElement || !emailElement || !berichtElement) {
        return;
      }

      const naam = naamElement.value.trim();
      const email = emailElement.value.trim();
      const bericht = berichtElement.value.trim();

      const ontvanger = 'info@oudebooyink.nl';

      const subject = encodeURIComponent(
        'Bericht via de website - ' + naam
      );

      const body = encodeURIComponent(
        'Naam: ' + naam +
        '\nE-mail: ' + email +
        '\n\nBericht:\n' + bericht
      );

      window.location.href =
        'mailto:' + ontvanger +
        '?subject=' + subject +
        '&body=' + body;
    });
  }

})();


