import slide1 from '../assets/slider/slide-1.png';
import slide2 from '../assets/slider/slide-2.png';
import slide3 from '../assets/slider/slide-3.png';

const SLIDE_INTERVAL = 5000;
const sliderImages = [slide1, slide2, slide3];

export function initSlider() {
  const slider = document.getElementById('slider');
  if (!slider) return;

  const slides = [...slider.querySelectorAll('.slider__slide')];
  const dots = [...slider.querySelectorAll('.slider__dot')];
  let currentSlide = 0;
  let timerId;

  slides.forEach((slide, index) => {
    slide.src = sliderImages[index];
  });

  const showSlide = (index) => {
    currentSlide = index;

    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle('slider__slide_active', slideIndex === index);
    });

    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle('slider__dot_active', dotIndex === index);
    });
  };

  const startAutoPlay = () => {
    clearInterval(timerId);
    timerId = setInterval(() => {
      showSlide((currentSlide + 1) % slides.length);
    }, SLIDE_INTERVAL);
  };

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      showSlide(Number(dot.dataset.slide));
      startAutoPlay();
    });
  });

  startAutoPlay();
}
