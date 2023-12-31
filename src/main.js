import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { getPageData } from './data-api.js';

const form = document.querySelector('#search-form');
const searchBtn = document.querySelector('button[type=submit]');
const gallery = document.querySelector('.gallery')
const loadMoreBtn = document.querySelector('.load-more');

loadMoreBtn.classList.add("is-hidden");

searchBtn.addEventListener('click', searchHandler);
loadMoreBtn.addEventListener('click', loadMoreHandler);
gallery.addEventListener("click", clickHandler);

let page = 1;

const lightbox = new SimpleLightbox('.gallery .photo-card a');
function clickHandler(evt) {
  if (evt.target === evt.currentTarget) {
    return;
  } 
  evt.preventDefault();
  lightbox.open(evt.currentTarget);
}

async function searchHandler(evt) {
  evt.preventDefault();
  page = 1;
  gallery.innerHTML = "";
  loadMoreBtn.classList.add("is-hidden");
  const searchItem = form.elements.searchQuery.value.trim();
  if (searchItem.length === 0) {
    iziToast.info({
      title: 'Please add some data to search',
      position: 'topRight'
    })
    return;
  }
  try {
    const resp = await getPageData(searchItem, page);
    const data = resp.data;
    if (data.hits.length === 0) {
      iziToast.warning({
        title: 'Sorry, there are no images matching your search query. Please try again.',
        position: 'topRight'
      })
    } else {
      iziToast.success({
        title: `Hooray! We found ${data.totalHits} images.`,
        position: 'topRight'
      })
      createMarkup(data.hits);
      if ((page * 40) > resp.data.totalHits) {
        showWarning();
      } else { loadMoreBtn.classList.remove("is-hidden") }  
    }
  } catch (err) {
    iziToast.error({
      title: 'Oops! Something went wrong! Try reload the page!',
      message: err.message,
      position: 'topRight'
    })
  }
}

function createMarkup(data) {
  const markUp = data.map(item => {
    return `
    <div class="photo-card">
      <a class="image-wrapper" href="${item.largeImageURL}">
        <img src="${item.webformatURL}" alt="${item.tags}" loading="lazy" />
      </a>
      <div class="info">
          <p class="info-item">
            <b>Likes</b></br>
            ${item.likes}
          </p>
          <p class="info-item">
            <b>Views</b></br>
            ${item.views}
          </p>
          <p class="info-item">
            <b>Comments</b></br>
            ${item.comments}
          </p>
          <p class="info-item">
            <b>Downloads</b></br>
            ${item.downloads}
          </p>
      </div>
    </div>
`
  }).join('');
  gallery.insertAdjacentHTML("beforeend", markUp);
  lightbox.refresh();
}

async function loadMoreHandler(evt) {
  evt.preventDefault();
  page += 1;
  const searchItem = form.elements.searchQuery.value.trim();
  try {
    const resp = await getPageData(searchItem, page);
    createMarkup(resp.data.hits);
    if ((page * 40) > resp.data.totalHits) {
      showWarning();
    }
  } catch (err) {
    iziToast.error({
      title: 'Oops! Something went wrong! Try reload the page!',
      message: err.message,
      position: 'topRight'
    })
  }
}

function showWarning() {
  loadMoreBtn.classList.add("is-hidden");
  iziToast.warning({
    title: "We're sorry, but you've reached the end of search results.",
    position: 'topRight'
  })
}