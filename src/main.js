import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { getPhotoByKeyword } from './';
import { loadGallery } from './js/render-functions.js';

const refs = {
  formRef: document.querySelector('.form'),
  formInputRef: document.querySelector('.form-input'),
  galleryRef: document.querySelector('.gallery'),
  loaderRef: document.querySelector('.loader'),
};
const lightboxOptions = {
  captionDelay: 250,
  captionsData: 'alt',
};
refs.formRef.addEventListener('submit', e => {
  refs.loaderRef.classList.remove('hide-loader');
  e.preventDefault();
  if (refs.formInputRef.value.trim() === '') {
    refs.formRef.reset();
    refs.galleryRef.innerHTML = '';
    refs.loaderRef.classList.add('hide-loader');
  } else {
    getPhotoByKeyword(refs.formInputRef.value)
      .then(data => {
        refs.formRef.reset();
        if (data.hits.length === 0) {
          iziToast.error({
            message:
              'Sorry, there are no images matching your search query. Please, try again!',
            messageColor: 'white',
            backgroundColor: 'red',
            position: 'topRight',
            maxWidth: 432,
          });
        }

        refs.galleryRef.innerHTML = loadGallery(data);
        const lightbox = new SimpleLightbox('.gallery a', lightboxOptions);
        lightbox.on('show.simplelightbox');
        lightbox.refresh();
      })
      .catch(err =>
        iziToast.error({
          message: err,
          position: 'topRight',
          maxWidth: 432,
        })
      )
      .finally(() => {
        refs.loaderRef.classList.add('hide-loader');
      });
  }
});