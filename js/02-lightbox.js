import { galleryItems } from './gallery-items.js';

const galleryContainer = document.querySelector('.gallery');
const imageMarkup = createGallery(galleryItems);

galleryContainer.insertAdjacentHTML('beforeEnd', imageMarkup);

function createGallery(images) {
  return images
    .map(({ preview, original, description }) => {
      return `
        <a class="gallery__item" href="${original}" onclick = "return false">
        <img class="gallery__image" src="${preview}" alt="${description}" />
        </a>
      `;
    })
    .join('');
}

new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
