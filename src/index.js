import './css/styles.css';
import imageCard from './temp/card-list.hbs';
import getRefs from './js/get-refs';
import ImagesApiService from './js/images-service';
import { showAlert, showError } from './js/pnotify';
import LoadMoreBtn from './js/load-more-btn';


const refs = getRefs();

refs.searchRef.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

const imagesApiService = new ImagesApiService();

async function onSearch(e) {
    e.preventDefault();

    clearImageList();
    imagesApiService.query = e.currentTarget.elements.query.value;
    loadMoreBtn.show();
    loadMoreBtn.disable();
    try {
        imagesApiService.resetPage();
        const response = await imagesApiService.fetchImages();
        const render = await renderImageList(response);
        loadMoreBtn.enable();
        return render;
    }
    catch {
        onShowError();
    }
    finally {
        refs.searchRef.query.value = '';
    }
}

function renderImageList(hits) {
     if (imagesApiService.query === '') {
         return showAlert('Invalid request. Please try again')
     }
     else{
         refs.cardContainer.insertAdjacentHTML('beforeend', imageCard(hits));
    }
}

function onLoadMore() {
    loadMoreBtn.disable();
    imagesApiService.fetchImages().then(hits => {
        renderImageList(hits)
        loadMoreBtn.enable();
    });
}
function clearImageList() {
    refs.cardContainer.innerHTML = '';
}
function onShowError(error) {
        showError('The request is incorrect. Please try again.');
}

// const onEntry = entries =>{
//     entries.forEach(entry => {
//         if (entry.Intersection) {
//             console.log('ПОДГРУЖАЕМ');
//         }
//      });
// }



// const options = {};
// const observer = new IntersectionObserver(onEntry, options);
// observer.observe(refs.sentimel)