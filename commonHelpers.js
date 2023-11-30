import{a as h,S as m,i as n}from"./assets/vendor-5f0e12e0.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function e(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerpolicy&&(s.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?s.credentials="include":t.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(t){if(t.ep)return;t.ep=!0;const s=e(t);fetch(t.href,s)}})();async function p(r,o){const e={key:"40976601-7e2fe02ca8efc6be3b00881e0",q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:o,per_page:40};return h.get("https://pixabay.com/api/",{params:e})}const u=document.querySelector("#search-form"),y=document.querySelector("button[type=submit]"),d=document.querySelector(".gallery"),c=document.querySelector(".load-more");c.classList.add("is-hidden");y.addEventListener("click",L);c.addEventListener("click",w);d.addEventListener("click",b);let i=1;const f=new m(".gallery .photo-card a");function b(r){r.target!==r.currentTarget&&(r.preventDefault(),f.open(r.currentTarget))}async function L(r){r.preventDefault(),i=1,d.innerHTML="",c.classList.add("is-hidden");const o=u.elements.searchQuery.value;if(o.length===0){n.info({title:"Please add some data to search",position:"topRight"});return}try{const a=(await p(o,i)).data;a.hits.length===0?n.warning({title:"Sorry, there are no images matching your search query. Please try again.",position:"topRight"}):(n.success({title:`Hooray! We found ${a.totalHits} images.`,position:"topRight"}),g(a.hits),c.classList.remove("is-hidden"))}catch(e){n.error({title:"Oops! Something went wrong! Try reload the page!",message:e.message,position:"topRight"})}}function g(r){const o=r.map(e=>`
    <div class="photo-card">
      <a class="image-wrapper" href="${e.largeImageURL}">
        <img src="${e.webformatURL}" alt="${e.tags}" loading="lazy" />
      </a>
      <div class="info">
          <p class="info-item">
            <b>Likes</b></br>
            ${e.likes}
          </p>
          <p class="info-item">
            <b>Views</b></br>
            ${e.views}
          </p>
          <p class="info-item">
            <b>Comments</b></br>
            ${e.comments}
          </p>
          <p class="info-item">
            <b>Downloads</b></br>
            ${e.downloads}
          </p>
      </div>
    </div>
`).join("");d.insertAdjacentHTML("beforeend",o),f.refresh()}async function w(r){r.preventDefault(),i+=1;const o=u.elements.searchQuery.value;try{const e=await p(o,i);g(e.data.hits),i*40>e.data.totalHits&&(c.classList.add("is-hidden"),n.warning({title:"We're sorry, but you've reached the end of search results.",position:"topRight"}))}catch(e){n.error({title:"Oops! Something went wrong! Try reload the page!",message:e.message,position:"topRight"})}}
//# sourceMappingURL=commonHelpers.js.map
