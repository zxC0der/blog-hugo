import Scroller from './scroller';
import AnchorLink from './anchor';

document.addEventListener('DOMContentLoaded', () => {

  const scroller = new Scroller(document.getElementById('btnScrollToTop'));
  scroller.init();

  const anchorLink = new AnchorLink(document.body.querySelectorAll('.post-content h1, h2, h3, h4, h5, h6'));
  anchorLink.init();

});
