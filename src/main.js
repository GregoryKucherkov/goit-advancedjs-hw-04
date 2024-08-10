import iziToast from 'izitoast';
import icon from './img/bi_x-octagon (1).svg';

//importing functions
import axiosImgs from './js/pixabay-api';
import { gallery, toggleLoader } from './js/render-functions';

const formInput = document.querySelector('.js-search-form');

//load-more button
const loadMoreButton = document.querySelector('.load-more-btn');

let dataFromForm = '';
let pageLoad = 1;

//Main script logic
const searchHandler = async event => {
  event.preventDefault();

  //Finding user's search query
  dataFromForm = event.target.elements.input_search.value.trim();

  //make custom loader visible, for that we have a function
  toggleLoader();

  try {
    //checking user's query if it is empty or space
    if (dataFromForm === '') {
      iziToast.error({
        message: "Sorry, the form can't be empty!",
        messageColor: '#FFF',
        backgroundColor: '#FF6865',
        messageSize: '16',
        position: 'topRight',
        timeout: 4000,
        iconUrl: icon,
      });
      formInput.reset();
      return;
    }

    pageLoad = 1;

    if (loadMoreButton) {
      loadMoreButton.classList.add('hidden');
    }

    const {
      data: { hits },
    } = await axiosImgs(dataFromForm);
    // const respond = await axiosImgs(dataFromForm);
    // console.log('respond:', respond);

    gallery(hits);

    formInput.reset();
  } catch (error) {
    console.log(error);
  } finally {
    toggleLoader();
  }
};

//callback function for load more button
const loadMoreHandler = async event => {
  try {
    pageLoad += 1;
    toggleLoader();
    const {
      data: { hits, totalHits },
    } = await axiosImgs(dataFromForm, pageLoad);

    let totalPages = Math.ceil(totalHits / 15);

    if (pageLoad >= totalPages) {
      iziToast.error({
        message: "We're sorry, but you've reached the end of search results.",
        messageColor: '#FFF',
        backgroundColor: '#FF6865',
        messageSize: '16',
        position: 'topRight',
        timeout: 4000,
        iconUrl: icon,
      });

      loadMoreButton.classList.add('hidden');
      return;
    }

    gallery(hits, true);

    //scroll down
    const height = document
      .querySelector('.gallery-item')
      .getBoundingClientRect().height;
    window.scrollBy({
      top: 2 * height,
      behavior: 'smooth', // Smooth scrolling
    });
  } catch (error) {
    console.log(error);
  } finally {
    toggleLoader();
  }
};

//submit button listener
formInput.addEventListener('submit', searchHandler);

//load more button 'listener'
if (loadMoreButton) {
  loadMoreButton.addEventListener('click', loadMoreHandler);
}
