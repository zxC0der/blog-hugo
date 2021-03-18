import {MySearch} from "./search";

document.addEventListener('DOMContentLoaded', () => {
  const mySearch = new MySearch(document.querySelector('#searchForm'));
  mySearch.init();
});
// <!--TODO 点击标题的跳转位置不对-->
