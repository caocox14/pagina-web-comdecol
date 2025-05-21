let currentIndex = 0;
const totalImages = 8; // Cambia esto si cambias el número total de snacks

const modal = document.getElementById("image-modal");
const modalImage = document.getElementById("modal-image");
const closeBtn = document.getElementById("close-modal");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

const isMobile = window.innerWidth <= 768;

export function openModal(src, index) {
  currentIndex = index;
  modalImage.src = src;
  modal.classList.remove("hidden");

  if (isMobile) {
    // Ocultar botones en móviles
    closeBtn.style.display = "none";
    prevBtn.style.display = "none";
    nextBtn.style.display = "none";
  } else {
    closeBtn.style.display = "block";
    prevBtn.style.display = "block";
    nextBtn.style.display = "block";
  }
}

function closeModal() {
  modal.classList.add("hidden");
  modalImage.src = "";
}

function showImage(index) {
  currentIndex = (index + totalImages) % totalImages;
  modalImage.src = `/snacks/snack_${currentIndex + 1}.jpg`;
}

// Desktop events
closeBtn.addEventListener("click", closeModal);
prevBtn.addEventListener("click", () => showImage(currentIndex - 1));
nextBtn.addEventListener("click", () => showImage(currentIndex + 1));

// Cerrar en móviles tocando fuera de la imagen
modal.addEventListener("click", (e) => {
  if (isMobile && e.target === modal) {
    closeModal();
  }
});

// Navegación táctil en móviles
if (isMobile) {
  let startX = 0;

  modalImage.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  modalImage.addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;
    const diffX = startX - endX;

    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        showImage(currentIndex + 1); // deslizó izquierda
      } else {
        showImage(currentIndex - 1); // deslizó derecha
      }
    }
  });
}
