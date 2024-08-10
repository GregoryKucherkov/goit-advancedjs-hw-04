import axios from 'axios';

export default function axiosImgs(dataFromForm, pageLoad = 1) {
  axios.defaults.baseURL = 'https://pixabay.com/api/';

  const API_KEY = '45225521-b1788b8383ce5fec9dc61aa0c';

  const requestParams = {
    params: {
      key: API_KEY,
      q: dataFromForm,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 15,
      page: pageLoad,
    },
  };
  return axios.get('', requestParams);
}
