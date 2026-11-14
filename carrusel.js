let slideIndex = 1;
let temporizador;

mostrarSlides(slideIndex);
iniciarAutoSlide();

function cambiarSlide(n) {
  clearTimeout(temporizador);
  mostrarSlides((slideIndex += n));
  iniciarAutoSlide();
}

function slideActual(n) {
  clearTimeout(temporizador);
  mostrarSlides((slideIndex = n));
  iniciarAutoSlide();
}

function mostrarSlides(n) {
  let i;
  let slides = document.getElementsByClassName("carrusel-slide");
  let puntos = document.getElementsByClassName("punto");

  if (slides.length === 0) return;

  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < puntos.length; i++) {
    puntos[i].className = puntos[i].className.replace(" activo", "");
  }

  slides[slideIndex - 1].style.display = "block";
  if (puntos.length > 0) {
    puntos[slideIndex - 1].className += " activo";
  }
}

function iniciarAutoSlide() {
  temporizador = setTimeout(() => {
    slideIndex++;
    mostrarSlides(slideIndex);
    iniciarAutoSlide();
  }, 4000); // Cambia de foto automáticamente cada 4 segundos
}