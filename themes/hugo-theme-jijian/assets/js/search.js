/*! For license information please see search.js.LICENSE.txt */
(()=>{var t={695:(t,e,n)=>{"use strict";var r=n(108);document.addEventListener("DOMContentLoaded",(function(){new r.MySearch(document.querySelector("#searchForm")).init()}))},108:(t,e,n)=>{"use strict";e.__esModule=!0,e.MySearch=void 0;var r=n(813),i=function(){function t(t){this.form=t,this.noKeywords="请输入搜索关键字",this.noResults="搜索不到相关内容",this.resultCnt="搜索到相关文章",this.page=1,this.loading=!1,this.highlightOptions={element:"span",className:"text-accent"}}return t.prototype.init=function(){var t=this;this.title=document.title,this.resultsElement=document.getElementById("searchResults"),this.stat=document.getElementById("searchStat"),this.loadingSpinner=document.getElementById("loadingSpinner"),this.resultContentWordCount=120,this.paginate=10,this.initForm(),this.initSearch();var e=this;this.loadMore=document.getElementById("btnLoadMore"),this.loadMore.addEventListener("click",(function(){e.poplateResults(t.input.value)}))},t.prototype.initForm=function(){this.input=this.form.querySelector('input[name="q"]'),""===this.input.value&&(this.input.value=t.getKeywordFromURL());var e=this;this.form.addEventListener("submit",(function(n){t.handleSubmit(n,e)}))},t.prototype.initSearch=function(){var t=this,e=this,n=new XMLHttpRequest;n.onreadystatechange=function(){if(4===n.readyState){if(200!==n.status)return void console.error({error:n.statusText});t.data=n.response,e.search(e.input.value)}},n.responseType="json",n.open("GET",document.head.querySelector('meta[data-name="search-index"]').getAttribute("content"),!0),n.send(null)},t.handleSubmit=function(t,e){e.search(e.input.value),t.preventDefault()},t.getKeywordFromURL=function(){return new URLSearchParams(window.location.search).get("q")},t.prototype.hideLoadMoreBtn=function(){this.loadMore.classList.add("d-none")},t.prototype.showLoadMoreBtn=function(){this.loadMore.classList.remove("d-none")},t.prototype.hideLoadingSpin=function(){this.loadingSpinner.classList.add("d-none")},t.prototype.showLoadingSpin=function(){this.loadingSpinner.classList.remove("d-none")},t.prototype.search=function(t){if(this.showLoadingSpin(),this.resultsElement.innerHTML="",""===t)return this.stat.innerHTML=this.noKeywords,this.hideLoadMoreBtn(),void this.loadingSpinner.classList.add("d-none");this.page=1,this.setPage(t);for(var e=this.data.length,n=[],r=0;r<e;r++)if(-1!=this.data[r].title.toLowerCase().indexOf(t.toLowerCase()))n.push(this.data[r]);else if(-1!=this.data[r].content.toLowerCase().indexOf(t.toLowerCase()))n.push(this.data[r]);else if(-1!=this.data[r].category.toLowerCase().indexOf(t.toLowerCase()))n.push(this.data[r]);else for(var i=0;i<this.data[r].tags.length;i++)if(-1!=this.data[r].tags[i].toLowerCase().indexOf(t.toLowerCase())){n.push(this.data[r]);break}this.results=n,this.hideLoadingSpin(),this.results.length>this.paginate?this.showLoadMoreBtn():this.hideLoadMoreBtn(),n.length>0?this.poplateResults(t):this.stat.innerHTML=this.noResults},t.prototype.setPage=function(t){var e=(t?t+" - ":"")+this.title,n=window.location.pathname+"?q="+encodeURIComponent(t);window.history.pushState(null,e,n),document.title=e},t.prototype.poplateResults=function(t){if(this.results&&!this.loading){this.loading=!0,this.loadMore.setAttribute("disabled",""),this.stat.innerHTML=this.resultCnt+this.results.length+"篇";for(var e=this,n=(this.page-1)*this.paginate,r=0;n<this.results.length&&r<this.paginate;n+=1,r+=1){for(var i=this.results[n],o=(this.page-1)*this.paginate+n,a=[],s=[],c=[],u=i.title.toLowerCase().indexOf(t);u>-1;)a.push(i.title.substr(u,t.length)),u=i.title.toLowerCase().indexOf(t,u+1);for(u=i.category.toLowerCase().indexOf(t);u>-1;)s.push(i.category.substr(u,t.length)),u=i.category.toLowerCase().indexOf(t,u+1);for(var h=0;h<i.tags.length;h++)for(u=i.tags[h].toLowerCase().indexOf(t);u>-1;)s.push(i.tags[h].substr(u,t.length)),u=i.tags[h].toLowerCase().indexOf(t,u+1);for(u=i.content.toLowerCase().indexOf(t);u>-1;)c.push(i.content.substr(u,t.length)),u=i.content.toLowerCase().indexOf(t,u+1);if(i.content.length>e.resultContentWordCount){var l=0;if(c.length>0){var d=i.content.indexOf(c[0]);d+c[0].length>e.resultContentWordCount-1&&(l=d)}i.content=(0===l?"":"...")+i.content.substring(l,l+e.resultContentWordCount)+"..."}var p="searchResult"+o,f="";for(f+="<div class='box' id='"+p+"'>",f+="<h3 class='search-result-title'>",f+="<a href='"+i.permalink+"'>"+i.title+"</a>",f+="</h3>",f+="<div class='search-result-meta'>",f+="<span class='tag is-success is-light'>",f+="<a href='/category/"+i.category+"' class='z-post-meta'>",f+=i.category,f+="</a>",f+="</span>",h=0;h<i.tags.length;h++)f+="<span class='tag is-warning is-light'>",f+="<a href='/tags/"+i.tags[h]+"' class='z-post-meta'>",f+=i.tags[h],f+="</a>",f+="</span>";f+="</div>",f+="<div class='search-result-content'>",f+=i.content,f+="</div>",f+="</div>",e.resultsElement.insertAdjacentHTML("beforeend",f),e.highlight(p,a,s,c)}this.loading=!1,this.loadMore.removeAttribute("disabled"),this.results.length<=this.paginate*this.page?this.hideLoadMoreBtn():this.showLoadMoreBtn(),this.page+=1}},t.prototype.highlight=function(t,e,n,i){new r(document.querySelectorAll("#"+t+" > .search-result-title")).mark(e,this.highlightOptions),new r(document.querySelectorAll("#"+t+" > .search-result-meta")).mark(n,this.highlightOptions),new r(document.querySelectorAll("#"+t+" > .search-result-content")).mark(i,this.highlightOptions)},t}();e.MySearch=i,e.default=i},813:function(t){t.exports=function(){"use strict";var t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},e=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},n=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),r=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},i=function(){function t(n){var r=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:5e3;e(this,t),this.ctx=n,this.iframes=r,this.exclude=i,this.iframesTimeout=o}return n(t,[{key:"getContexts",value:function(){var t=[];return(void 0!==this.ctx&&this.ctx?NodeList.prototype.isPrototypeOf(this.ctx)?Array.prototype.slice.call(this.ctx):Array.isArray(this.ctx)?this.ctx:"string"==typeof this.ctx?Array.prototype.slice.call(document.querySelectorAll(this.ctx)):[this.ctx]:[]).forEach((function(e){var n=t.filter((function(t){return t.contains(e)})).length>0;-1!==t.indexOf(e)||n||t.push(e)})),t}},{key:"getIframeContents",value:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:function(){},r=void 0;try{var i=t.contentWindow;if(r=i.document,!i||!r)throw new Error("iframe inaccessible")}catch(t){n()}r&&e(r)}},{key:"isIframeBlank",value:function(t){var e="about:blank",n=t.getAttribute("src").trim();return t.contentWindow.location.href===e&&n!==e&&n}},{key:"observeIframeLoad",value:function(t,e,n){var r=this,i=!1,o=null,a=function a(){if(!i){i=!0,clearTimeout(o);try{r.isIframeBlank(t)||(t.removeEventListener("load",a),r.getIframeContents(t,e,n))}catch(t){n()}}};t.addEventListener("load",a),o=setTimeout(a,this.iframesTimeout)}},{key:"onIframeReady",value:function(t,e,n){try{"complete"===t.contentWindow.document.readyState?this.isIframeBlank(t)?this.observeIframeLoad(t,e,n):this.getIframeContents(t,e,n):this.observeIframeLoad(t,e,n)}catch(t){n()}}},{key:"waitForIframes",value:function(t,e){var n=this,r=0;this.forEachIframe(t,(function(){return!0}),(function(t){r++,n.waitForIframes(t.querySelector("html"),(function(){--r||e()}))}),(function(t){t||e()}))}},{key:"forEachIframe",value:function(e,n,r){var i=this,o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:function(){},a=e.querySelectorAll("iframe"),s=a.length,c=0;a=Array.prototype.slice.call(a);var u=function(){--s<=0&&o(c)};s||u(),a.forEach((function(e){t.matches(e,i.exclude)?u():i.onIframeReady(e,(function(t){n(e)&&(c++,r(t)),u()}),u)}))}},{key:"createIterator",value:function(t,e,n){return document.createNodeIterator(t,e,n,!1)}},{key:"createInstanceOnIframe",value:function(e){return new t(e.querySelector("html"),this.iframes)}},{key:"compareNodeIframe",value:function(t,e,n){if(t.compareDocumentPosition(n)&Node.DOCUMENT_POSITION_PRECEDING){if(null===e)return!0;if(e.compareDocumentPosition(n)&Node.DOCUMENT_POSITION_FOLLOWING)return!0}return!1}},{key:"getIteratorNode",value:function(t){var e=t.previousNode();return{prevNode:e,node:(null===e||t.nextNode())&&t.nextNode()}}},{key:"checkIframeFilter",value:function(t,e,n,r){var i=!1,o=!1;return r.forEach((function(t,e){t.val===n&&(i=e,o=t.handled)})),this.compareNodeIframe(t,e,n)?(!1!==i||o?!1===i||o||(r[i].handled=!0):r.push({val:n,handled:!0}),!0):(!1===i&&r.push({val:n,handled:!1}),!1)}},{key:"handleOpenIframes",value:function(t,e,n,r){var i=this;t.forEach((function(t){t.handled||i.getIframeContents(t.val,(function(t){i.createInstanceOnIframe(t).forEachNode(e,n,r)}))}))}},{key:"iterateThroughNodes",value:function(t,e,n,r,i){for(var o=this,a=this.createIterator(e,t,r),s=[],c=[],u=void 0,h=void 0;l=void 0,l=o.getIteratorNode(a),h=l.prevNode,u=l.node;)this.iframes&&this.forEachIframe(e,(function(t){return o.checkIframeFilter(u,h,t,s)}),(function(e){o.createInstanceOnIframe(e).forEachNode(t,(function(t){return c.push(t)}),r)})),c.push(u);var l;c.forEach((function(t){n(t)})),this.iframes&&this.handleOpenIframes(s,t,n,r),i()}},{key:"forEachNode",value:function(t,e,n){var r=this,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:function(){},o=this.getContexts(),a=o.length;a||i(),o.forEach((function(o){var s=function(){r.iterateThroughNodes(t,o,e,n,(function(){--a<=0&&i()}))};r.iframes?r.waitForIframes(o,s):s()}))}}],[{key:"matches",value:function(t,e){var n="string"==typeof e?[e]:e,r=t.matches||t.matchesSelector||t.msMatchesSelector||t.mozMatchesSelector||t.oMatchesSelector||t.webkitMatchesSelector;if(r){var i=!1;return n.every((function(e){return!r.call(t,e)||(i=!0,!1)})),i}return!1}}]),t}(),o=function(){function o(t){e(this,o),this.ctx=t,this.ie=!1;var n=window.navigator.userAgent;(n.indexOf("MSIE")>-1||n.indexOf("Trident")>-1)&&(this.ie=!0)}return n(o,[{key:"log",value:function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"debug",r=this.opt.log;this.opt.debug&&"object"===(void 0===r?"undefined":t(r))&&"function"==typeof r[n]&&r[n]("mark.js: "+e)}},{key:"escapeStr",value:function(t){return t.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")}},{key:"createRegExp",value:function(t){return"disabled"!==this.opt.wildcards&&(t=this.setupWildcardsRegExp(t)),t=this.escapeStr(t),Object.keys(this.opt.synonyms).length&&(t=this.createSynonymsRegExp(t)),(this.opt.ignoreJoiners||this.opt.ignorePunctuation.length)&&(t=this.setupIgnoreJoinersRegExp(t)),this.opt.diacritics&&(t=this.createDiacriticsRegExp(t)),t=this.createMergedBlanksRegExp(t),(this.opt.ignoreJoiners||this.opt.ignorePunctuation.length)&&(t=this.createJoinersRegExp(t)),"disabled"!==this.opt.wildcards&&(t=this.createWildcardsRegExp(t)),this.createAccuracyRegExp(t)}},{key:"createSynonymsRegExp",value:function(t){var e=this.opt.synonyms,n=this.opt.caseSensitive?"":"i",r=this.opt.ignoreJoiners||this.opt.ignorePunctuation.length?"\0":"";for(var i in e)if(e.hasOwnProperty(i)){var o=e[i],a="disabled"!==this.opt.wildcards?this.setupWildcardsRegExp(i):this.escapeStr(i),s="disabled"!==this.opt.wildcards?this.setupWildcardsRegExp(o):this.escapeStr(o);""!==a&&""!==s&&(t=t.replace(new RegExp("("+this.escapeStr(a)+"|"+this.escapeStr(s)+")","gm"+n),r+"("+this.processSynomyms(a)+"|"+this.processSynomyms(s)+")"+r))}return t}},{key:"processSynomyms",value:function(t){return(this.opt.ignoreJoiners||this.opt.ignorePunctuation.length)&&(t=this.setupIgnoreJoinersRegExp(t)),t}},{key:"setupWildcardsRegExp",value:function(t){return(t=t.replace(/(?:\\)*\?/g,(function(t){return"\\"===t.charAt(0)?"?":""}))).replace(/(?:\\)*\*/g,(function(t){return"\\"===t.charAt(0)?"*":""}))}},{key:"createWildcardsRegExp",value:function(t){var e="withSpaces"===this.opt.wildcards;return t.replace(/\u0001/g,e?"[\\S\\s]?":"\\S?").replace(/\u0002/g,e?"[\\S\\s]*?":"\\S*")}},{key:"setupIgnoreJoinersRegExp",value:function(t){return t.replace(/[^(|)\\]/g,(function(t,e,n){var r=n.charAt(e+1);return/[(|)\\]/.test(r)||""===r?t:t+"\0"}))}},{key:"createJoinersRegExp",value:function(t){var e=[],n=this.opt.ignorePunctuation;return Array.isArray(n)&&n.length&&e.push(this.escapeStr(n.join(""))),this.opt.ignoreJoiners&&e.push("\\u00ad\\u200b\\u200c\\u200d"),e.length?t.split(/\u0000+/).join("["+e.join("")+"]*"):t}},{key:"createDiacriticsRegExp",value:function(t){var e=this.opt.caseSensitive?"":"i",n=this.opt.caseSensitive?["aàáảãạăằắẳẵặâầấẩẫậäåāą","AÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÄÅĀĄ","cçćč","CÇĆČ","dđď","DĐĎ","eèéẻẽẹêềếểễệëěēę","EÈÉẺẼẸÊỀẾỂỄỆËĚĒĘ","iìíỉĩịîïī","IÌÍỈĨỊÎÏĪ","lł","LŁ","nñňń","NÑŇŃ","oòóỏõọôồốổỗộơởỡớờợöøō","OÒÓỎÕỌÔỒỐỔỖỘƠỞỠỚỜỢÖØŌ","rř","RŘ","sšśșş","SŠŚȘŞ","tťțţ","TŤȚŢ","uùúủũụưừứửữựûüůū","UÙÚỦŨỤƯỪỨỬỮỰÛÜŮŪ","yýỳỷỹỵÿ","YÝỲỶỸỴŸ","zžżź","ZŽŻŹ"]:["aàáảãạăằắẳẵặâầấẩẫậäåāąAÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÄÅĀĄ","cçćčCÇĆČ","dđďDĐĎ","eèéẻẽẹêềếểễệëěēęEÈÉẺẼẸÊỀẾỂỄỆËĚĒĘ","iìíỉĩịîïīIÌÍỈĨỊÎÏĪ","lłLŁ","nñňńNÑŇŃ","oòóỏõọôồốổỗộơởỡớờợöøōOÒÓỎÕỌÔỒỐỔỖỘƠỞỠỚỜỢÖØŌ","rřRŘ","sšśșşSŠŚȘŞ","tťțţTŤȚŢ","uùúủũụưừứửữựûüůūUÙÚỦŨỤƯỪỨỬỮỰÛÜŮŪ","yýỳỷỹỵÿYÝỲỶỸỴŸ","zžżźZŽŻŹ"],r=[];return t.split("").forEach((function(i){n.every((function(n){if(-1!==n.indexOf(i)){if(r.indexOf(n)>-1)return!1;t=t.replace(new RegExp("["+n+"]","gm"+e),"["+n+"]"),r.push(n)}return!0}))})),t}},{key:"createMergedBlanksRegExp",value:function(t){return t.replace(/[\s]+/gim,"[\\s]+")}},{key:"createAccuracyRegExp",value:function(t){var e=this,n=this.opt.accuracy,r="string"==typeof n?n:n.value,i="string"==typeof n?[]:n.limiters,o="";switch(i.forEach((function(t){o+="|"+e.escapeStr(t)})),r){case"partially":default:return"()("+t+")";case"complementary":return"()([^"+(o="\\s"+(o||this.escapeStr("!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~¡¿")))+"]*"+t+"[^"+o+"]*)";case"exactly":return"(^|\\s"+o+")("+t+")(?=$|\\s"+o+")"}}},{key:"getSeparatedKeywords",value:function(t){var e=this,n=[];return t.forEach((function(t){e.opt.separateWordSearch?t.split(" ").forEach((function(t){t.trim()&&-1===n.indexOf(t)&&n.push(t)})):t.trim()&&-1===n.indexOf(t)&&n.push(t)})),{keywords:n.sort((function(t,e){return e.length-t.length})),length:n.length}}},{key:"isNumeric",value:function(t){return Number(parseFloat(t))==t}},{key:"checkRanges",value:function(t){var e=this;if(!Array.isArray(t)||"[object Object]"!==Object.prototype.toString.call(t[0]))return this.log("markRanges() will only accept an array of objects"),this.opt.noMatch(t),[];var n=[],r=0;return t.sort((function(t,e){return t.start-e.start})).forEach((function(t){var i=e.callNoMatchOnInvalidRanges(t,r),o=i.start,a=i.end;i.valid&&(t.start=o,t.length=a-o,n.push(t),r=a)})),n}},{key:"callNoMatchOnInvalidRanges",value:function(t,e){var n=void 0,r=void 0,i=!1;return t&&void 0!==t.start?(r=(n=parseInt(t.start,10))+parseInt(t.length,10),this.isNumeric(t.start)&&this.isNumeric(t.length)&&r-e>0&&r-n>0?i=!0:(this.log("Ignoring invalid or overlapping range: "+JSON.stringify(t)),this.opt.noMatch(t))):(this.log("Ignoring invalid range: "+JSON.stringify(t)),this.opt.noMatch(t)),{start:n,end:r,valid:i}}},{key:"checkWhitespaceRanges",value:function(t,e,n){var r=void 0,i=!0,o=n.length,a=e-o,s=parseInt(t.start,10)-a;return(r=(s=s>o?o:s)+parseInt(t.length,10))>o&&(r=o,this.log("End range automatically set to the max value of "+o)),s<0||r-s<0||s>o||r>o?(i=!1,this.log("Invalid range: "+JSON.stringify(t)),this.opt.noMatch(t)):""===n.substring(s,r).replace(/\s+/g,"")&&(i=!1,this.log("Skipping whitespace only range: "+JSON.stringify(t)),this.opt.noMatch(t)),{start:s,end:r,valid:i}}},{key:"getTextNodes",value:function(t){var e=this,n="",r=[];this.iterator.forEachNode(NodeFilter.SHOW_TEXT,(function(t){r.push({start:n.length,end:(n+=t.textContent).length,node:t})}),(function(t){return e.matchesExclude(t.parentNode)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}),(function(){t({value:n,nodes:r})}))}},{key:"matchesExclude",value:function(t){return i.matches(t,this.opt.exclude.concat(["script","style","title","head","html"]))}},{key:"wrapRangeInTextNode",value:function(t,e,n){var r=this.opt.element?this.opt.element:"mark",i=t.splitText(e),o=i.splitText(n-e),a=document.createElement(r);return a.setAttribute("data-markjs","true"),this.opt.className&&a.setAttribute("class",this.opt.className),a.textContent=i.textContent,i.parentNode.replaceChild(a,i),o}},{key:"wrapRangeInMappedTextNode",value:function(t,e,n,r,i){var o=this;t.nodes.every((function(a,s){var c=t.nodes[s+1];if(void 0===c||c.start>e){if(!r(a.node))return!1;var u=e-a.start,h=(n>a.end?a.end:n)-a.start,l=t.value.substr(0,a.start),d=t.value.substr(h+a.start);if(a.node=o.wrapRangeInTextNode(a.node,u,h),t.value=l+d,t.nodes.forEach((function(e,n){n>=s&&(t.nodes[n].start>0&&n!==s&&(t.nodes[n].start-=h),t.nodes[n].end-=h)})),n-=h,i(a.node.previousSibling,a.start),!(n>a.end))return!1;e=a.end}return!0}))}},{key:"wrapMatches",value:function(t,e,n,r,i){var o=this,a=0===e?0:e+1;this.getTextNodes((function(e){e.nodes.forEach((function(e){e=e.node;for(var i=void 0;null!==(i=t.exec(e.textContent))&&""!==i[a];)if(n(i[a],e)){var s=i.index;if(0!==a)for(var c=1;c<a;c++)s+=i[c].length;e=o.wrapRangeInTextNode(e,s,s+i[a].length),r(e.previousSibling),t.lastIndex=0}})),i()}))}},{key:"wrapMatchesAcrossElements",value:function(t,e,n,r,i){var o=this,a=0===e?0:e+1;this.getTextNodes((function(e){for(var s=void 0;null!==(s=t.exec(e.value))&&""!==s[a];){var c=s.index;if(0!==a)for(var u=1;u<a;u++)c+=s[u].length;var h=c+s[a].length;o.wrapRangeInMappedTextNode(e,c,h,(function(t){return n(s[a],t)}),(function(e,n){t.lastIndex=n,r(e)}))}i()}))}},{key:"wrapRangeFromIndex",value:function(t,e,n,r){var i=this;this.getTextNodes((function(o){var a=o.value.length;t.forEach((function(t,r){var s=i.checkWhitespaceRanges(t,a,o.value),c=s.start,u=s.end;s.valid&&i.wrapRangeInMappedTextNode(o,c,u,(function(n){return e(n,t,o.value.substring(c,u),r)}),(function(e){n(e,t)}))})),r()}))}},{key:"unwrapMatches",value:function(t){for(var e=t.parentNode,n=document.createDocumentFragment();t.firstChild;)n.appendChild(t.removeChild(t.firstChild));e.replaceChild(n,t),this.ie?this.normalizeTextNode(e):e.normalize()}},{key:"normalizeTextNode",value:function(t){if(t){if(3===t.nodeType)for(;t.nextSibling&&3===t.nextSibling.nodeType;)t.nodeValue+=t.nextSibling.nodeValue,t.parentNode.removeChild(t.nextSibling);else this.normalizeTextNode(t.firstChild);this.normalizeTextNode(t.nextSibling)}}},{key:"markRegExp",value:function(t,e){var n=this;this.opt=e,this.log('Searching with expression "'+t+'"');var r=0,i="wrapMatches";this.opt.acrossElements&&(i="wrapMatchesAcrossElements"),this[i](t,this.opt.ignoreGroups,(function(t,e){return n.opt.filter(e,t,r)}),(function(t){r++,n.opt.each(t)}),(function(){0===r&&n.opt.noMatch(t),n.opt.done(r)}))}},{key:"mark",value:function(t,e){var n=this;this.opt=e;var r=0,i="wrapMatches",o=this.getSeparatedKeywords("string"==typeof t?[t]:t),a=o.keywords,s=o.length,c=this.opt.caseSensitive?"":"i";this.opt.acrossElements&&(i="wrapMatchesAcrossElements"),0===s?this.opt.done(r):function t(e){var o=new RegExp(n.createRegExp(e),"gm"+c),u=0;n.log('Searching with expression "'+o+'"'),n[i](o,1,(function(t,i){return n.opt.filter(i,e,r,u)}),(function(t){u++,r++,n.opt.each(t)}),(function(){0===u&&n.opt.noMatch(e),a[s-1]===e?n.opt.done(r):t(a[a.indexOf(e)+1])}))}(a[0])}},{key:"markRanges",value:function(t,e){var n=this;this.opt=e;var r=0,i=this.checkRanges(t);i&&i.length?(this.log("Starting to mark with the following ranges: "+JSON.stringify(i)),this.wrapRangeFromIndex(i,(function(t,e,r,i){return n.opt.filter(t,e,r,i)}),(function(t,e){r++,n.opt.each(t,e)}),(function(){n.opt.done(r)}))):this.opt.done(r)}},{key:"unmark",value:function(t){var e=this;this.opt=t;var n=this.opt.element?this.opt.element:"*";n+="[data-markjs]",this.opt.className&&(n+="."+this.opt.className),this.log('Removal selector "'+n+'"'),this.iterator.forEachNode(NodeFilter.SHOW_ELEMENT,(function(t){e.unwrapMatches(t)}),(function(t){var r=i.matches(t,n),o=e.matchesExclude(t);return!r||o?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}),this.opt.done)}},{key:"opt",set:function(t){this._opt=r({},{element:"",className:"",exclude:[],iframes:!1,iframesTimeout:5e3,separateWordSearch:!0,diacritics:!0,synonyms:{},accuracy:"partially",acrossElements:!1,caseSensitive:!1,ignoreJoiners:!1,ignoreGroups:0,ignorePunctuation:[],wildcards:"disabled",each:function(){},noMatch:function(){},filter:function(){return!0},done:function(){},debug:!1,log:window.console},t)},get:function(){return this._opt}},{key:"iterator",get:function(){return new i(this.ctx,this.opt.iframes,this.opt.exclude,this.opt.iframesTimeout)}}]),o}();return function(t){var e=this,n=new o(t);return this.mark=function(t,r){return n.mark(t,r),e},this.markRegExp=function(t,r){return n.markRegExp(t,r),e},this.markRanges=function(t,r){return n.markRanges(t,r),e},this.unmark=function(t){return n.unmark(t),e},this}}()}},e={};!function n(r){if(e[r])return e[r].exports;var i=e[r]={exports:{}};return t[r].call(i.exports,i,i.exports,n),i.exports}(695)})();