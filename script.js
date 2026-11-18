
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

  // FOTO'S OP DE HOMEPAGE WISSELEN EN DOORSCHUIVEN
  const hero = document.querySelector('.home-hero');
  const gallery = document.querySelector('.hero-gallery');
  const thumbnails = document.querySelectorAll('.hero-thumb');

  if (hero && thumbnails.length) {
    thumbnails.forEach(function (thumbnail) {
      thumbnail.addEventListener('click', function () {
        const image = thumbnail.getAttribute('data-image');

        if (!image) return;

        // Achtergrondfoto veranderen
        hero.classList.add('photo-changing');

        const newImage = new Image();

        newImage.onload = function () {
          setTimeout(function () {
            hero.style.setProperty(
              '--hero-image',
              'url("' + image + '")'
            );

            hero.classList.remove('photo-changing');
          }, 250);
        };

        newImage.onerror = function () {
          hero.classList.remove('photo-changing');
          console.warn('Foto niet gevonden:', image);
        };

        newImage.src = image;

        // Blauwe rand bij de geselecteerde foto
        thumbnails.forEach(function (item) {
          item.classList.remove('active');
          item.setAttribute('aria-pressed', 'false');
        });

        thumbnail.classList.add('active');
        thumbnail.setAttribute('aria-pressed', 'true');

        // Geselecteerde foto naar links doorschuiven
        if (gallery) {
          gallery.scrollTo({
            left: thumbnail.offsetLeft - gallery.offsetLeft,
            behavior: 'smooth'
          });
        }
      });
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

