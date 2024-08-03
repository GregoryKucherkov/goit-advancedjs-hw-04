import iziToast from 'izitoast';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const page = document.querySelector('.gallery');

const slb = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function gallery(pics) {
  if (pics.length === 0) {
    iziToast.error({
      message:
        'Sorry, there are no images matching <br> your search query. Please try again!',
      messageColor: '#FFF',
      backgroundColor: '#FF6865',
      messageSize: '16',
      position: 'topRight',
      timeout: 4000,

      iconUrl: '../img/bi_x-octagon.svg',
    });
    page.innerHTML = '';
    return;
  }

  page.innerHTML = pics
    .map(
      pic =>
        `<li class="gallery-item">
        <a class="gallery-link" href="${pic.largeImageURL}">
          <img
            class="gallery-image"
            src="${pic.webformatURL}"
            alt="${pic.tags}"
            />
        </a>
        <p class="gallery-description">
          <span class="gallery-metadata">Likes <span class="gallery-value">${pic.likes}</span></span>
          <span class="gallery-metadata">Views <span class="gallery-value">${pic.views}</span></span>
          <span class="gallery-metadata">Comments <span class="gallery-value">${pic.comments}</span></span>
          <span class="gallery-metadata">Downloads <span class="gallery-value">${pic.downloads}</span></span>
        </p>
      </li>
      
    `
    )
    .join('');

  slb.refresh();
}

export function toggleLoader() {
  const loader = document.querySelector('.loader');
  loader.classList.toggle('hidden');
}
