// Функции для работы с модальным окном изображений

function openModal(imageContainer) {
  const modal = document.getElementById('image-modal');
  const modalImg = document.getElementById('modal-img');
  const modalCaption = document.getElementById('modal-caption');
  
  const img = imageContainer.querySelector('.showcase-image');
  
  if (modal && modalImg && img) {
    modal.style.display = 'block';
    modalImg.src = img.dataset.fullSrc || img.src;
    modalCaption.innerHTML = img.alt;
  }
}

function closeModal() {
  const modal = document.getElementById('image-modal');
  if (modal) {
    modal.style.display = 'none';
  }
}

// Закрытие модального окна по Escape
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
});

// Глобальные функции для использования в HTML
window.openModal = openModal;
window.closeModal = closeModal;
