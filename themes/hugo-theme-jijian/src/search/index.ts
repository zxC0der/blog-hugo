import {MySearch} from "./search";

document.addEventListener('DOMContentLoaded', () => {
  const mySearch = new MySearch(document.querySelector('#searchForm'));
  mySearch.init();
});
