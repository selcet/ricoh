import animateScrollTo from 'animated-scroll-to';

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
const header$ = document.querySelector('.header');

const toggleMenu = () => {
  const header = document.querySelector('.js_header');
  const documentBody = document.getElementsByTagName('body')[0];

  header.classList.toggle('header_opened');
  documentBody.classList.toggle('scroll-fixed');
};

// mobile menu version
const menuToggler = () => {
  const mobileMenuToggler = document.querySelector('.js_menu-button') || false;
  mobileMenuToggler.addEventListener('click', () => {
    toggleMenu();
  });
};

const closeMenu = () => {
  const header = document.querySelector('.js_header');
  const documentBody = document.getElementsByTagName('body')[0];

  header.classList.remove('header_opened');
  documentBody.classList.remove('scroll-fixed');
};

const menuNav = () => {
  let prevNavElement;

  const menuList = document.querySelectorAll('.menu-handler');
  menuList.forEach((menuContainer) => {
    menuContainer.addEventListener('click', (e) => {
      e.preventDefault();
      const selectedMenuItem = e.target;

      const targetId = selectedMenuItem.getAttribute('data-id');
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        if (prevNavElement) {
          prevNavElement.classList.toggle('header__menu-item_active');
        }

        prevNavElement = selectedMenuItem;
        selectedMenuItem.classList.toggle('header__menu-item_active');
        // perform animated scrolling by getting top-position of
        // target-element and set it as scroll target
        animateScrollTo(targetElement, { verticalOffset: -30 });
        if (isMobile) {
          closeMenu();
        }
      }
    });
  });
};

function menuHandlers() {
  if (isMobile) {
    menuToggler();
  }

  menuNav();
}

// stop scroll
let scrollingTimeoutRef;
window.addEventListener(
  'scroll',
  () => {
    window.clearTimeout(scrollingTimeoutRef);

    scrollingTimeoutRef = setTimeout(() => {
      console.log('Scrolling has stopped.');
      if (document.body.getBoundingClientRect().top < 0) {
        header$.style.margin = '0';
      } else {
        header$.style.removeProperty('margin');
      }
    }, 100);
  },
  false,
);

document.addEventListener('DOMContentLoaded', menuHandlers);
