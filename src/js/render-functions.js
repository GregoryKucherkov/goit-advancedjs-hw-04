import iziToast from 'izitoast';
import icon from '../img/bi_x-octagon (1).svg';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const page = document.querySelector('.gallery');

//load-more button
const loadMoreButton = document.querySelector('.load-more-btn');

const slb = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function gallery(pics, append = false) {
  if (pics.length === 0) {
    iziToast.error({
      message:
        'Sorry, there are no images matching <br> your search query. Please try again!',
      messageColor: '#FFF',
      backgroundColor: '#FF6865',
      messageSize: '16',
      position: 'topRight',
      timeout: 4000,

      iconUrl: icon,
    });
    page.innerHTML = '';

    loadMoreButton.classList.add('hidden'); // Hide button during new search

    return;
  }

  const markup = pics
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

    //checking if it is a new search or load-more option
  if (append) {
    page.insertAdjacentHTML('beforeend', markup);
  } else {
    page.innerHTML = markup;
  }

  slb.refresh();

  if (loadMoreButton) {
    loadMoreButton.classList.remove('hidden'); // Show button if there are more images to load
  }
}

export function toggleLoader() {
  const loader = document.querySelector('.loader');
  loader.classList.toggle('hidden');
}
