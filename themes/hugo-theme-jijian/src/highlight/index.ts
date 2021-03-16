// 这是导入所有
// import * as hljs from 'highlight.js';

// 导入部分
// import hljs from 'highlight.js/lib/core';
// import javascript from 'highlight.js/lib/languages/javascript';
// import cpp from 'highlight.js/lib/languages/cpp';
// undefined！
// console.log(hljs);
// hljs.registerLanguage('javascript', javascript);
// hljs.registerLanguage('cpp', cpp);

// 暂时用这种方法解决吧，从官网下载文件，就是更新语言不太方便，考虑到基本不会更新，影响不大
const hljs = require('./highlight.pack');

hljs.configure({
    languages: ["c", "cpp", "java", "c#"]
});

document.addEventListener('DOMContentLoaded', (event) => {
    const codes = document.querySelectorAll('div code')
    codes.forEach((block: HTMLElement) => {
        console.log(block, block.classList)
        if (block.classList.length >= 1) {
            hljs.highlightBlock(block);
        } else {
            block.classList.add('z-inline-code')
        }
    });
});
