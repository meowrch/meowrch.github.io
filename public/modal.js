function getOrCreateDialog() {
  let dialog = document.getElementById('native-image-modal');
  if (!dialog) {
    dialog = document.createElement('dialog');
    dialog.id = 'native-image-modal';
    
    // Кнопка закрытия работает нативно через form method="dialog"
    dialog.innerHTML = `
      <form method="dialog">
        <button class="modal-close" aria-label="Close">&times;</button>
      </form>
      <img id="modal-img" class="modal-image" />
      <div id="modal-caption" class="modal-caption"></div>
    `;
    
    // Закрытие по клику на фон (backdrop)
    dialog.addEventListener('click', function(event) {
      const rect = dialog.getBoundingClientRect();
      // Проверяем, был ли клик за пределами самой картинки (по фону)
      const isInDialog = (rect.top <= event.clientY && event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX && event.clientX <= rect.left + rect.width);
      if (!isInDialog) dialog.close();
    });

    // Возвращаем скролл при закрытии (в том числе по кнопке Esc)
    dialog.addEventListener('close', () => {
      document.body.style.overflow = '';
    });

    // Кидаем прямо в корень, чтобы избежать конфликтов слоев
    document.body.appendChild(dialog);
  }
  return dialog;
}

function openModal(imageContainer) {
  const dialog = getOrCreateDialog();
  const modalImg = document.getElementById('modal-img');
  const modalCaption = document.getElementById('modal-caption');
  
  const img = imageContainer.querySelector('.showcase-image');
  
  if (dialog && modalImg && img) {
    modalImg.src = img.dataset.fullSrc || img.src;
    modalCaption.innerHTML = img.alt || '';
    
    document.body.style.overflow = 'hidden'; // Блокируем фон
    dialog.showModal(); // Вызываем именно как нативное модальное окно
  }
}

function closeModal() {
  const dialog = document.getElementById('native-image-modal');
  if (dialog) dialog.close();
}

window.openModal = openModal;
window.closeModal = closeModal;
