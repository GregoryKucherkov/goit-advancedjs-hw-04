// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

const onSubmitHandle = event => {
  event.preventDefault();

  const delay = parseInt(event.target.elements.delay.value, 10);
  const choice = event.target.elements.state.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (choice === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(value => {
      iziToast.success({
        message: `✅ Fulfilled promise in ${value}ms`,
        messageColor: '#FFF',
        backgroundColor: '#00c74b',
        messageSize: '24',
        position: 'topRight',
        icon: '',
        timeout: 4000,
      });
    })
    .catch(error => {
      iziToast.error({
        message: `❌ Rejected promise in ${error}ms`,
        messageColor: '#FFF',
        backgroundColor: '#FF6865',
        messageSize: '24',
        position: 'topRight',
        icon: '',
        timeout: 4000,
      });
    });
};

form.addEventListener('submit', onSubmitHandle);
