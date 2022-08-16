import { galleryItems } from './gallery-items.js';

const galleryContainer = document.querySelector('.gallery');
const imageMarkup = createGallery(galleryItems);

galleryContainer.insertAdjacentHTML('beforeEnd', imageMarkup);
galleryContainer.addEventListener('click', onImageClick);

//добавляем запрет на открытие ссылок, но прописал это сразу при создании галлереи
// const galleryLink = document.querySelectorAll('.gallery__link');
// [...galleryLink].map(link => link.setAttribute('onclick', 'return false'));

function createGallery(images) {
  return images
    .map(({ preview, original, description }) => {
      return `
        <a class="gallery__link" href="${original}" onclick = "return false">
            <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
            />
        </a>
      `;
    })
    .join('');
}

function onImageClick(event) {
  const isElementImage = event.target.classList.contains('gallery__image');
  if (!isElementImage) {
    return;
  }

  const img = event.target;
  const urlToLargeImg = img.dataset.source;

  const modal = `
        <div class="modal">
            <img src="${urlToLargeImg}">
        </div>
      `;
  const createModal = basicLightbox.create(modal, {
    onShow: () => {
      window.addEventListener('keydown', onEscapePress);
    },
    onClose: () => {
      window.removeEventListener('keydown', onEscapePress);
    },
  });

  createModal.show();

  function onEscapePress(event) {
    if (event.code === 'Escape') {
      createModal.close();
    }
  }
}
