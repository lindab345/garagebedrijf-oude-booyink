
(function () {
  const menuToggle = document.getElementById('menuToggle');
  const siteMenu = document.getElementById('site-menu');

  // MENU OPENEN EN SLUITEN
  if (menuToggle && siteMenu) {

    function openMenu() {
      siteMenu.hidden = false;

      requestAnimationFrame(function () {
        siteMenu.classList.add('is-open');
      });

      menuToggle.setAttribute('aria-expanded', 'true');
      menuToggle.setAttribute('aria-label', 'Menu sluiten');
    }

    function closeMenu() {
      if (menuToggle.getAttribute('aria-expanded') !== 'true') {
        return;
      }

      siteMenu.classList.remove('is-open');

      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Menu openen');

      setTimeout(function () {
        if (!siteMenu.classList.contains('is-open')) {
          siteMenu.hidden = true;
        }
      }, 450);
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


