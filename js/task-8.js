import gallery from './gallery-items.js';

let index = -1;
let indexImg = 0;
const ulGalleryRef = document.querySelector('.js-gallery');
const modalRef = document.querySelector('.js-lightbox');
const imgModalRef = document.querySelector('.lightbox__image');
const btnCloseRef = document.querySelector('.lightbox__button');
const divOverlayRef = document.querySelector('.lightbox__overlay');
const arrBigImgRef = gallery.map(obj => obj.original);

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
  imgRef.setAttribute('data-index', `${(index += 1)}`);
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
  window.addEventListener('keydown', onKeyDown);
  modalRef.classList.add('is-open');
  indexImg = Number(event.target.dataset.index);
  imgModalRef.src = arrBigImgRef[indexImg];
}

function onCloseModal() {
  window.removeEventListener('keydown', onKeyDown);
  modalRef.classList.remove('is-open');
  imgModalRef.src = '';
}

function onKeyDown(event) {
  if (event.code === 'Escape') {
    onCloseModal();
  }
  if (event.code === 'ArrowLeft') {
    if (indexImg === 0) return;
    indexImg -= 1;
    imgModalRef.src = arrBigImgRef[indexImg];
  }
  if (event.code === 'ArrowRight') {
    if (indexImg === arrBigImgRef.length - 1) return;
    indexImg += 1;
    imgModalRef.src = arrBigImgRef[indexImg];
  }
}
