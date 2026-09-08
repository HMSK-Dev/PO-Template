const nav = document.getElementById("main-nav");
const navBar = document.getElementById("nav-bar");
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const menuIconOpen = document.getElementById("menuIconOpen");
const menuIconClose = document.getElementById("menuIconClose");
const scrollThreshold = 40;
const track = document.getElementById("carouselTrack");

const slides = track == null ? [] : Array.from(track.children);

const dots = document.querySelectorAll("[data-slide]");

const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");

let currentSlide = 0;

const totalSlides = slides.length;

// Mide la altura actual del <nav> (franja + menú si está abierto)
// y la deja disponible como variable CSS para todas las secciones.
function syncNavOffset() {
  const h = nav.getBoundingClientRect().height;
  document.documentElement.style.setProperty("--nav-offset", h + "px");
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
  const isOpen = mobileMenu.classList.contains("flex");
  if (isOpen) {
    mobileMenu.classList.remove("flex");
    mobileMenu.classList.add("hidden");
    menuBtn.setAttribute("aria-expanded", "false");
    menuIconOpen.classList.remove("hidden");
    menuIconClose.classList.add("hidden");
  } else {
    mobileMenu.classList.remove("hidden");
    mobileMenu.classList.add("flex");
    menuBtn.setAttribute("aria-expanded", "true");
    menuIconOpen.classList.add("hidden");
    menuIconClose.classList.remove("hidden");
  }
  // Se sincroniza dos veces: al instante y tras la transición del
  // nav-bar (300ms), para que la medida final sea siempre exacta.
  syncNavOffset();
  setTimeout(syncNavOffset, 320);
}

menuBtn.addEventListener("click", toggleMobileMenu);
window.addEventListener("resize", syncNavOffset);

syncNavOffset();

function updateCarousel() {
  if(track === null) return;
  track.style.transform = `translateX(-${currentSlide * 100}%)`;

  dots.forEach((dot, index) => {
    if (index === currentSlide) {
      dot.classList.remove("bg-orange-500");
      dot.classList.add("bg-[#38247d]", "scale-110");
    } else {
      dot.classList.remove("bg-[#38247d]", "scale-110");

      dot.classList.add("bg-orange-500");
    }
  });
}

function nextSlide() {
  currentSlide++;

  if (currentSlide >= totalSlides) {
    currentSlide = 0;
  }

  updateCarousel();
}

function previousSlide() {
  currentSlide--;

  if (currentSlide < 0) {
    currentSlide = totalSlides - 1;
  }

  updateCarousel();
}

if(nextButton !== null && prevButton !== null) {
nextButton.addEventListener("click", nextSlide);

prevButton.addEventListener("click", previousSlide);
}
dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    currentSlide = Number(dot.dataset.slide);

    updateCarousel();
  });
});

/*
 * Autoplay
 */
let autoplay = setInterval(nextSlide, 5000);

/*
 * Pausar al pasar el mouse
 */
const carousel = track == null ? null : track.parentElement;

if(carousel !== null) {

carousel.addEventListener("mouseenter", () => clearInterval(autoplay));

carousel.addEventListener("mouseleave", () => {
  autoplay = setInterval(nextSlide, 5000);
});

/*
 * Inicializar
 */
updateCarousel();
}