const burger = document.querySelector('.burger');
const navWrapper = document.querySelector('.header__nav-wrapper');
const navLinks = document.querySelectorAll('.nav__link');
const header = document.querySelector('.header');
const body = document.body;

if (burger && navWrapper) {
  burger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isActive = burger.classList.contains('active');

    burger.classList.toggle('active');
    navWrapper.classList.toggle('active');
    body.style.overflow = !isActive ? 'hidden' : '';
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        burger.classList.remove('active');
        navWrapper.classList.remove('active');
        body.style.overflow = '';
      }
    });
  });

  document.addEventListener('click', (e) => {
    if (burger.classList.contains('active') &&
      !e.target.closest('.burger') &&
      !e.target.closest('.header__nav-wrapper')) {
      burger.classList.remove('active');
      navWrapper.classList.remove('active');
      body.style.overflow = '';
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && burger.classList.contains('active')) {
      burger.classList.remove('active');
      navWrapper.classList.remove('active');
      body.style.overflow = '';
    }
  });
}

let lastScroll = 0;
let ticking = false;

function updateHeader() {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 20) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  lastScroll = currentScroll;
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(updateHeader);
    ticking = true;
  }
});

const sections = document.querySelectorAll('section[id]');

function setActiveLink() {
  const scrollY = window.pageYOffset + 150;

  let currentSection = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');

    if (href === `#${currentSection}`) {
      link.classList.add('active');
    } else if (href === '#' && !currentSection) {
      link.classList.add('active');
    }
  });
}

let scrollTicking = false;

window.addEventListener('scroll', () => {
  if (!scrollTicking) {
    window.requestAnimationFrame(() => {
      setActiveLink();
      scrollTicking = false;
    });
    scrollTicking = true;
  }
});

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');

    if (href.startsWith('#')) {
      e.preventDefault();

      if (href === '#') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      } else {
        const targetId = href.substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
          const headerHeight = 80;
          const targetPosition = targetSection.offsetTop - headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }

      setTimeout(() => {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }, 100);
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  updateHeader();
  setActiveLink();

  if (typeof Swiper !== 'undefined') {
    const slider = new Swiper('.check-work__slider', {
      slidesPerView: 'auto',
      spaceBetween: 32,
      speed: 700,
      loop: true,
      loopedSlides: 3,
      centeredSlides: true,
      centeredSlidesBounds: true,
      initialSlide: 0,
      grabCursor: true,
      slidesPerGroup: 1,
      watchSlidesProgress: true,
      normalizeSlideIndex: true,
      resistanceRatio: 0.55,
      slideToClickedSlide: true,
      roundLengths: true,
      centerInsufficientSlides: true,
      loopPreventsSliding: true,
      navigation: {
        nextEl: '.check-work__nav--next',
        prevEl: '.check-work__nav--prev',
      },
      breakpoints: {
        1200: {
          spaceBetween: 32,
        },
        768: {
          spaceBetween: 20,
        },
        0: {
          spaceBetween: 16,
        }
      }
    });
  }
});
