
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


  // FOTO'S OP DE HOMEPAGE - VLOEIENDE CARROUSEL
  const hero = document.querySelector('.home-hero');
  const gallery = document.querySelector('.hero-gallery');

  if (hero && gallery) {

    // Maak de bewegende fotoreeks
    const track = document.createElement('div');
    track.className = 'hero-gallery-track';

    const photos = Array.from(
      gallery.querySelectorAll('.hero-thumb')
    );

    photos.forEach(function (photo) {
      track.appendChild(photo);
    });

    gallery.appendChild(track);

    let isAnimating = false;

    track.addEventListener('click', function (event) {
      const thumbnail = event.target.closest('.hero-thumb');

      if (!thumbnail || isAnimating) return;

      const image = thumbnail.getAttribute('data-image');

      if (!image) return;

      // Achtergrondfoto veranderen
      const newImage = new Image();

      hero.classList.add('photo-changing');

      newImage.onload = function () {
        hero.style.setProperty(
          '--hero-image',
          'url("' + image + '")'
        );

        hero.classList.remove('photo-changing');
      };

      newImage.onerror = function () {
        hero.classList.remove('photo-changing');
        console.warn('Foto niet gevonden:', image);
      };

      newImage.src = image;

      // Blauwe rand aanpassen
      track.querySelectorAll('.hero-thumb').forEach(function (item) {
        item.classList.remove('active');
        item.setAttribute('aria-pressed', 'false');
      });

      thumbnail.classList.add('active');
      thumbnail.setAttribute('aria-pressed', 'true');

      // Bereken de afstand naar de aangeklikte foto
      const firstPhoto = track.firstElementChild;

      const distance =
        thumbnail.offsetLeft - firstPhoto.offsetLeft;

      // Staat de foto al vooraan? Dan hoeft niets te schuiven
      if (distance <= 1) return;

      isAnimating = true;

      // Schuif de fotoreeks zichtbaar naar links
      track.style.transition = 'transform 700ms ease';
      track.style.transform = 'translateX(-' + distance + 'px)';

      // Na de beweging de volgorde aanpassen
      function finish(event) {
        if (
          event.target !== track ||
          event.propertyName !== 'transform'
        ) {
          return;
        }

        track.removeEventListener('transitionend', finish);

        // Verplaats de foto's vóór de gekozen foto naar achteren
        while (track.firstElementChild !== thumbnail) {
          track.appendChild(track.firstElementChild);
        }

        // Zet de fotoreeks terug zonder zichtbare sprong
        track.style.transition = 'none';
        track.style.transform = 'translateX(0)';

        track.offsetHeight;

        track.style.transition = 'transform 700ms ease';

        isAnimating = false;
      }

      track.addEventListener('transitionend', finish);
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

