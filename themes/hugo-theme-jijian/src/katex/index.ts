import * as renderMathInElement from 'katex/dist/contrib/auto-render';

document.addEventListener('DOMContentLoaded', () => {
  const posts = document.querySelectorAll('.post');
  if (posts) {
    posts.forEach((post) => {
      renderMathInElement(post,
          {
            delimiters: [
              // 自定义分隔符，才可以支持行内公式
              {left: "$$", right: "$$", display: true},
              {left: "$", right: "$", display: false},
            ]
          });
    });
  }
});
