import iziToast from 'izitoast';

//importing functions
import fetchImgs from './js/pixabay-api';
import { gallery, toggleLoader } from './js/render-functions';

const formInput = document.querySelector('.js-search-form');

//Main script logic
const searchHandler = event => {
  event.preventDefault();

  //Finding user's search query
  const dataFromForm = event.target.elements.input_search.value.trim();

  //checking user's query if it is empty or space
  if (dataFromForm === '') {
    iziToast.error({
      message: "Sorry, the form can't be empty!",
      messageColor: '#FFF',
      backgroundColor: '#FF6865',
      messageSize: '16',
      position: 'topRight',
      timeout: 4000,
      iconUrl: '/img/bi_x-octagon.svg',
    });
    formInput.reset();
    return;
  }

  //mack custom loader visible, for that we have a function
  toggleLoader();

  fetchImgs(dataFromForm)
    .then(({ hits }) => {
      gallery(hits);
      formInput.reset();
    })
    .catch(error => console.log(error))
    .finally(() => {
      toggleLoader();
    });
};

formInput.addEventListener('submit', searchHandler);
