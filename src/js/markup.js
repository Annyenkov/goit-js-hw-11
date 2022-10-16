export default function makeMarkupEl({webformatURL, largeImageURL, tags, likes, comments, downloads, views}) {
  return `
  <div class="photo-card">
  <a class="photo-card__link" href="${largeImageURL}" >
    <img src="${webformatURL}" alt="${tags}" loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>Likes ${likes}</b>
      </p>
      <p class="info-item">
        <b>Views ${views}</b>
      </p>
      <p class="info-item">
        <b>Comments ${comments}</b>
      </p>
      <p class="info-item">
        <b>Downloads ${downloads}</b>
      </p>
    </div>
  </a>  
</div>
  `;
}

