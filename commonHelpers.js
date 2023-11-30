import{a as m,i as a}from"./assets/vendor-96017409.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function e(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerpolicy&&(r.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?r.credentials="include":t.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(t){if(t.ep)return;t.ep=!0;const r=e(t);fetch(t.href,r)}})();async function d(s,o){const e={key:"40976601-7e2fe02ca8efc6be3b00881e0",q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,page:o,per_page:40};return m.get("https://pixabay.com/api/",{params:e})}const p=document.querySelector("#search-form"),h=document.querySelector("button[type=submit]"),u=document.querySelector(".gallery"),c=document.querySelector(".load-more");c.classList.add("is-hidden");h.addEventListener("click",g);c.addEventListener("click",y);let n=1;async function g(s){s.preventDefault(),n=1,u.innerHTML="",c.classList.add("is-hidden");const o=p.elements.searchQuery.value;if(o.length===0){a.info({title:"Please add some data to search",position:"topRight"});return}try{const i=(await d(o,n)).data;i.hits.length===0?a.warning({title:"Sorry, there are no images matching your search query. Please try again.",position:"topRight"}):(a.success({title:`Hooray! We found ${i.totalHits} images.`,position:"topRight"}),f(i.hits),c.classList.remove("is-hidden"))}catch(e){a.error({title:"Oops! Something went wrong! Try reload the page!",message:e.message,position:"topRight"})}}function f(s){const o=s.map(e=>`
    <div class="photo-card">
      <div class="image-wrapper"><img src="${e.webformatURL}" alt="${e.tags}" loading="lazy" /></div>
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
`).join("");u.insertAdjacentHTML("beforeend",o)}async function y(s){s.preventDefault(),n+=1;const o=p.elements.searchQuery.value;try{const e=await d(o,n);f(e.data.hits),n*40>e.data.totalHits&&(c.classList.add("is-hidden"),a.warning({title:"We're sorry, but you've reached the end of search results.",position:"topRight"}))}catch(e){a.error({title:"Oops! Something went wrong! Try reload the page!",message:e.message,position:"topRight"})}}
//# sourceMappingURL=commonHelpers.js.map
