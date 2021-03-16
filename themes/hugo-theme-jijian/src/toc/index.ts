import Toc from "./toc";
import TocItem from "./tocItem";
import AnchorLink from "../js/anchor";

document.addEventListener('DOMContentLoaded', () => {

  const toc = new Toc(
      document.getElementById('headingTOC'),
      document.getElementById('collapseTOC'));
  toc.init();

  const tocItem = new TocItem(document.body.querySelectorAll('#TableOfContents a,.anchor'));
  tocItem.init();
});
