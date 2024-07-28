// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const button = document.querySelector('button[data-start]');
button.disabled = true;

let userSelectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const now = new Date();
    if (selectedDates[0] > now) {
      button.disabled = false;
      userSelectedDate = selectedDates[0];
    } else {
      button.disabled = true;
      iziToast.error({
        message: '❌ Please choose a date in the future',
        messageColor: '#FFF',
        backgroundColor: '#FF6865',
        messageSize: '24',
        position: 'topRight',
        icon: '',
        timeout: 4000,
      });
    }
  },
};

const ft = flatpickr('#datetime-picker', options);
ft.input.disabled = false;

const timer = {
  elements: {
    days: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    minutes: document.querySelector('span[data-minutes]'),
    seconds: document.querySelector('span[data-seconds]'),
  },
  intervalId: null,

  start() {
    this.intervalId = setInterval(() => {
      const diff = userSelectedDate.getTime() - Date.now();

      if (diff <= 0) {
        this.stop();

        return;
      }

      let { days, hours, minutes, seconds } = this.convertMs(diff);

      this.elements.days.textContent = this.pad(days);
      this.elements.hours.textContent = this.pad(hours);
      this.elements.minutes.textContent = this.pad(minutes);
      this.elements.seconds.textContent = this.pad(seconds);
    }, 1000);
    ft.input.disabled = true;
  },

  stop() {
    clearInterval(this.intervalId);
    ft.input.disabled = false;
  },

  convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  },

  pad(value) {
    return String(value).padStart(2, '0');
  },
};

const handleClick = () => {
  timer.start();
  button.disabled = true;
};

button.addEventListener('click', handleClick);
