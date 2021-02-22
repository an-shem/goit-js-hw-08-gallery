import gallery from './gallery-items.js';

const ulGalleryRef = document.querySelector('.js-gallery');
const modalRef = document.querySelector('.js-lightbox');
const imgModalRef = document.querySelector('.lightbox__image');
const btnCloseRef = document.querySelector('.lightbox__button');
const divOverlayRef = document.querySelector('.lightbox__overlay');

const arrElemGalleryRefes = gallery.map(obj => {
  // Создали элементы
  const liRef = document.createElement('li');
  const aRef = document.createElement('a');
  const imgRef = document.createElement('img');
  // Наполнили атрибутами
  liRef.setAttribute('class', 'gallery__item');
  aRef.setAttribute('class', 'gallery__link');
  aRef.setAttribute('href', `${obj.original}`);
  imgRef.setAttribute('class', 'gallery__image');
  imgRef.setAttribute('src', `${obj.preview}`);
  imgRef.setAttribute('data-source', `${obj.original}`);
  imgRef.setAttribute('alt', `${obj.description}`);
  // Влаживаем  теги
  aRef.appendChild(imgRef);
  liRef.appendChild(aRef);

  return liRef;
});
ulGalleryRef.append(...arrElemGalleryRefes);

ulGalleryRef.addEventListener('click', onOpenModal);
btnCloseRef.addEventListener('click', onCloseModal);
divOverlayRef.addEventListener('click', onCloseModal);

function onOpenModal(event) {
  event.preventDefault();
  if (!event.target.classList.contains('gallery__image')) return;
  window.addEventListener('keydown', onCloseEsc);
  modalRef.classList.add('is-open');
  imgModalRef.src = event.target.dataset.source;
  imgModalRef.alt = event.target.alt;
}

function onCloseModal() {
  window.removeEventListener('keydown', onCloseEsc);
  modalRef.classList.remove('is-open');
  imgModalRef.src = '';
  imgModalRef.alt = '';
}

function onCloseEsc(event) {
  if (event.code === 'Escape') {
    onCloseModal();
  }
}
