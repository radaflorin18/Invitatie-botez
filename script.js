(function () {
  var track = document.getElementById('track');
  var slides = document.querySelectorAll('.slide');
  var dots = document.querySelectorAll('.dot');
  var prevBtn = document.getElementById('prevBtn');
  var nextBtn = document.getElementById('nextBtn');
  var carousel = document.getElementById('carousel');

  var currentIndex = 0;
  var totalSlides = slides.length;

  function updateCarousel() {
    track.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';
    dots.forEach(function (dot, index) {
      dot.classList.toggle('active', index === currentIndex);
    });
    // Off-screen slides must not be focusable, or tabbing into them scrolls the clipped track.
    slides.forEach(function (slide, index) {
      slide.inert = index !== currentIndex;
    });
  }

  function moveSlide(direction) {
    currentIndex += direction;
    if (currentIndex >= totalSlides) currentIndex = 0;
    if (currentIndex < 0) currentIndex = totalSlides - 1;
    updateCarousel();
  }

  function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
  }

  prevBtn.addEventListener('click', function () { moveSlide(-1); });
  nextBtn.addEventListener('click', function () { moveSlide(1); });

  dots.forEach(function (dot, index) {
    dot.addEventListener('click', function () { goToSlide(index); });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') moveSlide(-1);
    if (e.key === 'ArrowRight') moveSlide(1);
  });

  var touchStartX = 0;
  var swipeThreshold = 40;

  carousel.addEventListener('touchstart', function (e) {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  carousel.addEventListener('touchend', function (e) {
    var delta = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(delta) > swipeThreshold) {
      moveSlide(delta < 0 ? 1 : -1);
    }
  }, { passive: true });

  updateCarousel();
})();
