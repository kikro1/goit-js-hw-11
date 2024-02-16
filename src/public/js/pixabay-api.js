export function getPhotoByKeyword(q) {
    const API_KEY = '42127236-8bfdbbfbeed8a2dadaca720e8';
    const BASE_URL = 'https://pixabay.com/api/?key=';
    const PARAMS = `&q=${q}&`;
  
    const OPTIONS = new URLSearchParams({
      image_type: 'photo',
      orientation: 'horisontal',
      safesearch: true,
    });
    const URL = BASE_URL + API_KEY + PARAMS + OPTIONS;
    return fetch(URL).then(res => {
      if (!res.ok) {
        throw new Error(res.status);
      }
      return res.json();
    });
  }
  