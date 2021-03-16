import * as Mustache from 'mustache';
import * as Mark from 'mark.js';

declare global {
    interface Post {
        title: string;
        content: string;
        category: string;
        tags: string[];
        permalink: string;
    }
}

export class MySearch {
    public resultsElement: HTMLElement;
    public stat: HTMLElement;
    public noKeywords: string = "请输入搜索关键字";
    public noResults: string = "搜索不到相关内容";
    public resultCnt: string = "搜索到相关文章";
    public tempResult: string;
    public input: HTMLInputElement;
    public title: string;
    public resultContentWordCount: number;
    public paginate: number;
    private page: number = 1;
    private results: Post[];
    private loading: boolean = false;
    private loadingSpinner: HTMLElement;
    public loadMore: HTMLElement;
    public data: Post[];
    public highlightOptions = {
        element: 'span',
        className: 'text-accent',
    };

    constructor(public form: HTMLFormElement) {
    }

    init() {
        this.title = document.title;
        this.resultsElement = document.getElementById('searchResults');
        this.stat = document.getElementById('searchStat');
        this.loadingSpinner = document.getElementById('loadingSpinner');
        this.tempResult = document.getElementById('templateResult').innerHTML;
        this.resultContentWordCount = 120;
        this.paginate = 10;
        this.initForm();
        this.initSearch();
        const instance = this;
        this.loadMore = document.getElementById('btnLoadMore');
        this.loadMore.addEventListener('click', () => {
            instance.poplateResults(this.input.value);
        });
    }

    initForm() {
        this.input = this.form.querySelector('input[name="q"]');
        if (this.input.value === '') {
            this.input.value = MySearch.getKeywordFromURL();
        }
        const instance = this;
        this.form.addEventListener('submit', (event) => {
            MySearch.handleSubmit(event, instance);
        });
    }

    initSearch() {
        const instance = this;
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status !== 200) {
                    console.error({error: xhr.statusText});
                    return;
                }
                // index.json数据
                this.data = xhr.response;
                instance.search(instance.input.value);
            }
        };
        xhr.responseType = 'json';
        xhr.open('GET',
            document.head.querySelector('meta[data-name="search-index"]')
                .getAttribute('content'), true);
        xhr.send(null);
    }

    static handleSubmit(event, instance: MySearch) {
        instance.search(instance.input.value);
        event.preventDefault();
    }

    static getKeywordFromURL() {
        return new URLSearchParams(window.location.search).get('q');
    }

    hideLoadMoreBtn() {
        this.loadMore.classList.add('d-none');
    }

    showLoadMoreBtn() {
        this.loadMore.classList.remove('d-none');
    }

    hideLoadingSpin(){
        this.loadingSpinner.classList.add('d-none');
    }

    showLoadingSpin(){
        this.loadingSpinner.classList.remove('d-none');
    }

    search(query: string) {
        this.showLoadingSpin();
        this.resultsElement.innerHTML = '';
        if (query === '') {
            this.stat.innerHTML = this.noKeywords;
            this.hideLoadMoreBtn();
            this.loadingSpinner.classList.add('d-none');
            return;
        }
        this.page = 1;
        this.setPage(query);
        const siz = this.data.length;
        let results: Post[] = [];
        for (let i = 0; i < siz; i++) {
            if (this.data[i].title.toLowerCase().indexOf(query.toLowerCase()) != -1) {
                results.push(this.data[i]);
            }else if (this.data[i].content.toLowerCase().indexOf(query.toLowerCase()) != -1) {
                results.push(this.data[i]);
            }else if (this.data[i].category.toLowerCase().indexOf(query.toLowerCase()) != -1) {
                results.push(this.data[i]);
            }else{
                for(let j=0;j<this.data[i].tags.length;j++){
                    if (this.data[i].tags[j].toLowerCase().indexOf(query.toLowerCase()) != -1) {
                        results.push(this.data[i]);
                        break;
                    }
                }
            }
        }
        this.results = results;
        this.hideLoadingSpin();
        if (this.results.length > this.paginate) {
            this.showLoadMoreBtn();
        } else {
            this.hideLoadMoreBtn();
        }
        if (results.length > 0) {
            this.poplateResults(query);
        } else {
            this.stat.innerHTML = this.noResults;
        }
    }

    setPage(query) {
        const title = (query ? (`${query} - `) : '') + this.title;
        const url = `${window.location.pathname}?q=${encodeURIComponent(query)}`;
        window.history.pushState(null, title, url);
        document.title = title; // history.pushState's title was ignored.
    }

    static normalizeTaxonomy(text, render) {
        // 这个text和render是哪来的
        return render(text).toLowerCase();
    }

    poplateResults(query) {
        if (!this.results) {
            return;
        }
        if (this.loading) {
            return;
        }
        this.loading = true;
        this.loadMore.setAttribute('disabled', '');
        this.stat.innerHTML = this.resultCnt + this.results.length + "篇";
        const instance = this;
        let i = (this.page - 1) * this.paginate;
        let count = 0;
        for (; i < this.results.length && count < this.paginate; i += 1, count += 1) {
            const result = this.results[i];
            const idx = (this.page - 1) * this.paginate + i;
            // 匹配关键词
            const titleKeywords = [];
            const metaKeywords=[];
            const contentKeywords = [];
            let pos = result.title.toLowerCase().indexOf(query);
            while(pos>-1){
                titleKeywords.push(result.title.substr(pos,query.length));
                pos = result.title.toLowerCase().indexOf(query,pos+1);
            }
            pos = result.category.toLowerCase().indexOf(query);
            while(pos>-1){
                metaKeywords.push(result.category.substr(pos,query.length));
                pos = result.category.toLowerCase().indexOf(query,pos+1);
            }
            for(let j=0;j<result.tags.length;j++){
                pos = result.tags[j].toLowerCase().indexOf(query);
                while(pos>-1){
                    metaKeywords.push(result.tags[j].substr(pos,query.length));
                    pos = result.tags[j].toLowerCase().indexOf(query,pos+1);
                }
            }
            pos = result.content.toLowerCase().indexOf(query);
            while(pos>-1){
                contentKeywords.push(result.content.substr(pos,query.length));
                pos = result.content.toLowerCase().indexOf(query,pos+1);
            }
            // 截取展示的部分
            if (result.content.length > instance.resultContentWordCount) {
                let contentStart = 0;
                if (contentKeywords.length > 0) {
                    const pos = result.content.indexOf(contentKeywords[0]);
                    if ((pos + contentKeywords[0].length) > instance.resultContentWordCount - 1) {
                        contentStart = pos;
                    }
                }
                result.content = `${(contentStart === 0 ? '' : '...') + result.content.substring(contentStart, contentStart + instance.resultContentWordCount)}...`;
            }
            const id=`searchResult${idx}`;
            instance.resultsElement.insertAdjacentHTML('beforeend',
                Mustache.render(instance.tempResult, {
                    id,
                    title: result.title,
                    content: result.content,
                    permalink: result.permalink,
                    category: result.category,
                    tags: result.tags,
                    url() {
                        return MySearch.normalizeTaxonomy;
                    },
                }));
            instance.highlight(id, titleKeywords,metaKeywords, contentKeywords);
        }
        this.loading = false;
        this.loadMore.removeAttribute('disabled');
        if (this.results.length <= this.paginate * this.page) {
            this.hideLoadMoreBtn();
        } else {
            this.showLoadMoreBtn();
        }
        this.page += 1;
    }

    highlight(id, titleKeywords,metaKeywords, contentKeywords) {
        const titleHighlighter = new Mark(document.querySelectorAll(`#${id} > .search-result-title`));
        titleHighlighter.mark(titleKeywords, this.highlightOptions);
        const metaHighlighter = new Mark(document.querySelectorAll(`#${id} > .search-result-meta`));
        metaHighlighter.mark(metaKeywords, this.highlightOptions);
        const contentHighlighter = new Mark(document.querySelectorAll(`#${id} > .search-result-content`));
        contentHighlighter.mark(contentKeywords, this.highlightOptions);
    }
}

export default MySearch;
