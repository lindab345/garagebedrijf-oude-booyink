(function () {
  const menuToggle = document.getElementById('menuToggle');
  const siteMenu = document.getElementById('site-menu');

  if (menuToggle && siteMenu) {
    function closeMenu() {
      siteMenu.hidden = true;
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Menu openen');
    }

    menuToggle.addEventListener('click', function () {
      const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      siteMenu.hidden = isOpen;
      menuToggle.setAttribute('aria-expanded', String(!isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Menu openen' : 'Menu sluiten');
    });

    siteMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeMenu();
    });

    document.addEventListener('click', function (event) {
      if (!event.target.closest('.menu-wrap')) closeMenu();
    });
  }

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const naam = document.getElementById('naam').value.trim();
      const email = document.getElementById('email').value.trim();
      const bericht = document.getElementById('bericht').value.trim();
      const ontvanger = 'info@oudebooyink.nl';
      const subject = encodeURIComponent('Bericht via de website - ' + naam);
      const body = encodeURIComponent('Naam: ' + naam + '\nE-mail: ' + email + '\n\nBericht:\n' + bericht);
      window.location.href = 'mailto:' + ontvanger + '?subject=' + subject + '&body=' + body;
    });
  }
})();
