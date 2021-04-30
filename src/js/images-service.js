const API_KEY = '21326298-891193e4282fe50cca63dd783';
const BASE_URL = 'https://pixabay.com';

export default class ImagesApiService {
  construct(){
      this.searchQuery = '';
      this.page = 1;
  }
  
  fetchImages() {
      const url = `${BASE_URL}/api/?image_type=photo&orientation=horizontal&q=
      ${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;
      
      return fetch(url)
          .then(response => response.json())
          .then(({hits}) => {
              this.incrementPage();
              return hits;
          })
          .catch(error => console.error(error));
  }
  
  incrementPage(){
      this.page += 1;
  }
  resetPage() {
      this.page = 1;
  }
  
  get query(){
      return this.searchQuery;
  }

  set query(newQuery){
      this.searchQuery = newQuery;
  }
}