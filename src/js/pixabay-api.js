export default function fetchImgs(dataFromForm) {
  const API_KEY = '45225521-b1788b8383ce5fec9dc61aa0c';

  const params = new URLSearchParams({
    key: API_KEY,
    q: dataFromForm,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  const url = `https://pixabay.com/api/?${params}`;

  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
