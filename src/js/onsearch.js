const axios = require('axios').default;
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export default class onsearch {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchImages() {
    const config = {
      URL: 'https://pixabay.com/api/',
      key: '30527370-b4cc229e59d49cd6447e1ea14',
      per_page: 40,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    };

    try {
      const response = await axios.get(
        `${config.URL}?key=${config.key}&q=${this.searchQuery}&page=${this.page}&per_page=${config.per_page}&image_type=${config.image_type}&orientation=${config.orientation}&safesearch=${config.safesearch}`
      );
      const searchPhoto = this.searchQuery.trim();
      console.log(searchPhoto)

      if ((!searchPhoto && !this.searchQuery) || (!searchPhoto && this.searchQuery >= ' ')) {
        Notify.warning(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }

      if (response.data.total === 0) {
        Notify.warning(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }

      if (this.page === 1) {
        Notify.success(`Hooray! We found ${response.data.totalHits} images.`);
      }

      this.page += 1;

      return response.data;
    } catch (error) {
      if (error.response.status === 400) {
        Notify.info(
          `We're sorry, but you've reached the end of search results.`
        );
      }
      console.log(error);
    }
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}