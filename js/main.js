"use strict";function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _toConsumableArray(e){return _arrayWithoutHoles(e)||_iterableToArray(e)||_unsupportedIterableToArray(e)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(e,t){if(e){if("string"==typeof e)return _arrayLikeToArray(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Map"===(n="Object"===n&&e.constructor?e.constructor.name:n)||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_arrayLikeToArray(e,t):void 0}}function _iterableToArray(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}function _arrayWithoutHoles(e){if(Array.isArray(e))return _arrayLikeToArray(e)}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}document.addEventListener("DOMContentLoaded",function(){function s(e){e&&(t=document.getElementById("site-name").offsetWidth,e=document.querySelectorAll("#menus .menus_item"),n=0,e.length&&e.forEach(function(e){n+=e.offsetWidth}),e=document.querySelector("#search-button"),o=e?e.offsetWidth:0,u=document.getElementById("nav")),window.innerWidth<768||t+n+o>u.offsetWidth-120?u.classList.add("hide-menu"):u.classList.remove("hide-menu")}function d(){var e,t,n,a,c,o,r,l,s,d,i,u,m,f,h=GLOBAL_CONFIG.highlight;function g(e,t,n){var o,i=document.createDocumentFragment();c&&((o=document.createElement("div")).className="highlight-tools ".concat(d),o.innerHTML=l+e+s,o.addEventListener("click",m),i.appendChild(o)),a&&t.offsetHeight>a+30&&((e=document.createElement("div")).className="code-expand-btn",e.innerHTML='<i class="fas fa-angle-double-down"></i>',e.addEventListener("click",f),i.appendChild(e)),"hl"===n?t.insertBefore(i,t.firstChild):t.parentNode.insertBefore(i,t)}h&&(e=h.highlightCopy,t=h.highlightLang,n=GLOBAL_CONFIG_SITE.isHighlightShrink,a=h.highlightHeightLimit,c=e||t||void 0!==n,o="highlighjs"===h.plugin?document.querySelectorAll("figure.highlight"):document.querySelectorAll('pre[class*="language-"]'),(c||a)&&o.length&&(r="prismjs"===h.plugin,d=!(s=l="")===n?"closed":"",void 0!==n&&(l='<i class="fas fa-angle-down expand '.concat(d,'"></i>')),e&&(s='<div class="copy-notice"></div><i class="fas fa-paste copy-button"></i>'),i=function(e){var t,n=e.parentNode,o=(n.classList.add("copy-true"),window.getSelection()),i=document.createRange();r?i.selectNodeContents(n.querySelectorAll("pre code")[0]):i.selectNodeContents(n.querySelectorAll("table .code pre")[0]),o.removeAllRanges(),o.addRange(i),o.toString();i=e.lastChild,document.queryCommandSupported&&document.queryCommandSupported("copy")?(document.execCommand("copy"),void 0!==GLOBAL_CONFIG.Snackbar?btf.snackbarShow(GLOBAL_CONFIG.copy.success):((t=i.previousElementSibling).innerText=GLOBAL_CONFIG.copy.success,t.style.opacity=1,setTimeout(function(){t.style.opacity=0},700))):void 0!==GLOBAL_CONFIG.Snackbar?btf.snackbarShow(GLOBAL_CONFIG.copy.noSupport):i.previousElementSibling.innerText=GLOBAL_CONFIG.copy.noSupport,o.removeAllRanges(),n.classList.remove("copy-true")},u=function(e){var t=_toConsumableArray(e.parentNode.children).slice(1);e.firstChild.classList.toggle("closed"),btf.isHidden(t[t.length-1])?t.forEach(function(e){e.style.display="block"}):t.forEach(function(e){e.style.display="none"})},m=function(e){e=e.target.classList;e.contains("expand")?u(this):e.contains("copy-button")&&i(this)},f=function(){this.classList.toggle("expand-done")},t?r?o.forEach(function(e){var t=e.getAttribute("data-language")?e.getAttribute("data-language"):"Code",t='<div class="code-lang">'.concat(t,"</div>");btf.wrap(e,"figure",{class:"highlight"}),g(t,e)}):o.forEach(function(e){var t=e.getAttribute("class").split(" ")[1];g('<div class="code-lang">'.concat(t="plain"!==t&&void 0!==t?t:"Code","</div>"),e,"hl")}):r?o.forEach(function(e){btf.wrap(e,"figure",{class:"highlight"}),g("",e)}):o.forEach(function(e){g("",e,"hl")})))}var t,n,o,u,i=!1,m=function(){btf.sidebarPaddingR(),document.body.style.overflow="hidden",btf.animateIn(document.getElementById("menu-mask"),"to_show 0.5s"),document.getElementById("sidebar-menus").classList.add("open"),i=!0},a=function(){var e=document.body;e.style.overflow="",e.style.paddingRight="",btf.animateOut(document.getElementById("menu-mask"),"to_hide 0.5s"),document.getElementById("sidebar-menus").classList.remove("open"),i=!1};function f(){var o,i,a,c,r,l=document.getElementById("rightside"),s=window.innerHeight+56;document.body.scrollHeight<=s?l.style.cssText="opacity: 1; transform: translateX(-58px)":(i=!(o=0),a=document.getElementById("page-header"),c="function"==typeof chatBtnHide,r="function"==typeof chatBtnShow,window.scrollCollect=function(){return btf.throttle(function(e){var t,n=window.scrollY||document.documentElement.scrollTop;t=o<n,56<(o=n)?(t?(a.classList.contains("nav-visible")&&a.classList.remove("nav-visible"),r&&!0===i&&(chatBtnHide(),i=!1)):(a.classList.contains("nav-visible")||a.classList.add("nav-visible"),c&&!1===i&&(chatBtnShow(),i=!0)),a.classList.add("nav-fixed"),"0"===window.getComputedStyle(l).getPropertyValue("opacity")&&(l.style.cssText="opacity: 0.8; transform: translateX(-58px)")):(0===n&&a.classList.remove("nav-fixed","nav-visible"),l.style.cssText="opacity: ''; transform: ''"),document.body.scrollHeight<=s&&(l.style.cssText="opacity: 0.8; transform: translateX(-58px)")},200)()},window.addEventListener("scroll",scrollCollect))}function h(){var c,e,r,l,i,s,d,u,m,f=GLOBAL_CONFIG_SITE.isToc,h=GLOBAL_CONFIG.isAnchor,a=document.getElementById("article-container");a&&(f||h)&&(f&&(e=document.getElementById("card-toc"),l=(r=e.getElementsByClassName("toc-content")[0]).querySelectorAll(".toc-link"),i=e.querySelector(".toc-percentage"),s=r.classList.contains("is-expand"),d=function(e){var t=a.clientHeight,n=document.documentElement.clientHeight,o=a.offsetTop,t=n<t?t-n:document.documentElement.scrollHeight-n,n=Math.round(100*((e-o)/t));i.textContent=100<n?100:n<=0?0:n},window.mobileToc={open:function(){e.style.cssText="animation: toc-open .3s; opacity: 1; right: 55px"},close:function(){e.style.animation="toc-close .2s",setTimeout(function(){e.style.cssText="opacity:''; animation: ''; right: ''"},100)}},r.addEventListener("click",function(e){e.preventDefault();var t=e.target.classList;t.contains("toc-content")||(t=t.contains("toc-link")?e.target:e.target.parentElement,btf.scrollToDest(btf.getEleTop(document.getElementById(decodeURI(t.getAttribute("href")).replace("#",""))),300),window.innerWidth<900&&window.mobileToc.close())}),c=function(e){var e=e.getBoundingClientRect().top,t=r.scrollTop;e>document.documentElement.clientHeight-100&&(r.scrollTop=t+150),e<100&&(r.scrollTop=t-150)}),u=a.querySelectorAll("h1,h2,h3,h4,h5,h6"),m="",window.tocScrollFn=function(){return btf.throttle(function(){var e=window.scrollY||document.documentElement.scrollTop,n=(f&&d(e),e);if(0!==n){var o="",i="";if(u.forEach(function(e,t){n>btf.getEleTop(e)-80&&(e=e.id,o=e?"#"+encodeURI(e):"",i=t)}),m!==i&&(h&&btf.updateAnchor(o),m=i,f&&(r.querySelectorAll(".active").forEach(function(e){e.classList.remove("active")}),""!==o))){var t=l[i];if(t.classList.add("active"),setTimeout(function(){c(t)},0),!s)for(var a=t.parentNode;!a.matches(".toc");a=a.parentNode)a.matches("li")&&a.classList.add("active")}}},100)()},window.addEventListener("scroll",tocScrollFn))}function g(e){e.forEach(function(e){var t=e.getAttribute("datetime");e.innerText=btf.diffDate(t,!0),e.style.display="inline"})}var c,r=function(){var t=document.body,n=(t.classList.add("read-mode"),document.createElement("button"));n.type="button",n.className="fas fa-sign-out-alt exit-readmode",t.appendChild(n),n.addEventListener("click",function e(){t.classList.remove("read-mode"),n.remove(),n.removeEventListener("click",e)})},l=function(){"light"==("dark"===document.documentElement.getAttribute("data-theme")?"dark":"light")?(activateDarkMode(),saveToLocal.set("theme","dark",2),void 0!==GLOBAL_CONFIG.Snackbar&&btf.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night)):(activateLightMode(),saveToLocal.set("theme","light",2),void 0!==GLOBAL_CONFIG.Snackbar&&btf.snackbarShow(GLOBAL_CONFIG.Snackbar.night_to_day)),"function"==typeof utterancesTheme&&utterancesTheme(),"function"==typeof changeGiscusTheme&&changeGiscusTheme(),"object"===("undefined"==typeof FB?"undefined":_typeof(FB))&&window.loadFBComment(),window.DISQUS&&document.getElementById("disqus_thread").children.length&&setTimeout(function(){return window.disqusReset()},200),"function"==typeof runMermaid&&window.runMermaid()},y=function(e){var t=document.getElementById("rightside-config-hide").classList;t.toggle("show"),e.classList.contains("show")&&(t.add("status"),setTimeout(function(){t.remove("status")},300)),e.classList.toggle("show")},p=function(){btf.scrollToDest(0,500)},b=function(){var e=document.documentElement.classList;e.contains("hide-aside")?saveToLocal.set("aside-status","show",2):saveToLocal.set("aside-status","hide",2),e.toggle("hide-aside")},L=function(){"0"===window.getComputedStyle(document.getElementById("card-toc")).getPropertyValue("opacity")?window.mobileToc.open():window.mobileToc.close()},v=(document.getElementById("rightside").addEventListener("click",function(e){var t=e.target.id?e.target:e.target.parentNode;switch(t.id){case"go-up":p();break;case"rightside_config":y(t);break;case"mobile-toc-button":L();break;case"readmode":r();break;case"darkmode":l();break;case"hide-aside-btn":b()}}),function(){document.querySelectorAll("#article-container .tab > button").forEach(function(e){e.addEventListener("click",function(e){var t,n,o,i=this.parentNode;i.classList.contains("active")||(t=i.parentNode.nextElementSibling,(o=btf.siblings(i,".active")[0])&&o.classList.remove("active"),i.classList.add("active"),n=this.getAttribute("data-href").replace("#",""),_toConsumableArray(t.children).forEach(function(e){e.id===n?e.classList.add("active"):e.classList.remove("active")}),0<(o=t.querySelectorAll("#".concat(n," .fj-gallery"))).length&&btf.initJustifiedGallery(o))})})}),E=function(){document.querySelectorAll("#article-container .tabs .tab-to-top").forEach(function(e){e.addEventListener("click",function(){btf.scrollToDest(btf.getEleTop(btf.getParents(this,".tabs")),300)})})};window.refreshFn=function(){s(!0),u.classList.add("show"),GLOBAL_CONFIG_SITE.isPost?(void 0!==GLOBAL_CONFIG.noticeOutdate&&(n=GLOBAL_CONFIG.noticeOutdate,(o=btf.diffDate(GLOBAL_CONFIG_SITE.postUpdate))>=n.limitDay&&((t=document.createElement("div")).className="post-outdate-notice",t.textContent=n.messagePrev+" "+o+" "+n.messageNext,o=document.getElementById("article-container"),"top"===n.position?o.insertBefore(t,o.firstChild):o.appendChild(t))),GLOBAL_CONFIG.relativeDate.post&&g(document.querySelectorAll("#post-meta time"))):(GLOBAL_CONFIG.relativeDate.homepage&&g(document.querySelectorAll("#recent-posts time")),GLOBAL_CONFIG.runtime&&(n=document.getElementById("runtimeshow"))&&(o=n.getAttribute("data-publishDate"),n.innerText=btf.diffDate(o)+" "+GLOBAL_CONFIG.runtime),(t=document.getElementById("last-push-date"))&&(e=t.getAttribute("data-lastPushDate"),t.innerText=btf.diffDate(e,!0)),(e=document.querySelectorAll("#aside-cat-list .card-category-list-item.parent i")).length&&e.forEach(function(e){e.addEventListener("click",function(e){e.preventDefault();this.classList.toggle("expand");e=this.parentNode.nextElementSibling;btf.isHidden(e)?e.style.display="block":e.style.display="none"})})),h(),GLOBAL_CONFIG_SITE.isHome&&(l=document.getElementById("scroll-down"))&&l.addEventListener("click",function(){btf.scrollToDest(document.getElementById("content-inner").offsetTop,300)}),d(),GLOBAL_CONFIG.isPhotoFigcaption&&document.querySelectorAll("#article-container img").forEach(function(e){var t,n=e.parentNode,o=e.title||e.alt;o&&!n.parentNode.classList.contains("justified-gallery")&&((t=document.createElement("div")).className="img-alt is-center",t.textContent=o,n.insertBefore(t,e.nextSibling))}),f();var e,t,n,o,i,a,c,r,l=document.querySelectorAll("#article-container .fj-gallery");l.length&&((i=l).forEach(function(e){e.querySelectorAll("img").forEach(function(e){var t=e.getAttribute("data-lazy-src");t&&(e.src=t),btf.wrap(e,"div",{class:"fj-gallery-item"})})}),window.fjGallery?setTimeout(function(){btf.initJustifiedGallery(i)},100):((a=document.createElement("link")).rel="stylesheet",a.href=GLOBAL_CONFIG.source.justifiedGallery.css,document.body.appendChild(a),getScript("".concat(GLOBAL_CONFIG.source.justifiedGallery.js)).then(function(){btf.initJustifiedGallery(i)}))),btf.loadLightbox(document.querySelectorAll("#article-container img:not(.no-lightbox)")),(a=document.querySelectorAll("#article-container :not(.highlight) > table, #article-container > table")).length&&a.forEach(function(e){btf.wrap(e,"div",{class:"table-wrap"})}),(r=document.querySelectorAll("#article-container .hide-button")).length&&r.forEach(function(e){e.addEventListener("click",function(e){this.classList.add("open");var t=this.nextElementSibling.querySelectorAll(".fj-gallery");t.length&&btf.initJustifiedGallery(t)})}),v(),E(),c=!1,(r=document.querySelector("#comment-switch > .switch-btn"))&&r.addEventListener("click",function(){this.classList.toggle("move"),document.querySelectorAll("#post-comment > .comment-wrap > div").forEach(function(e){btf.isHidden(e)?e.style.cssText="display: block;animation: tabshow .5s":e.style.cssText="display: none;animation: ''"}),c||"function"!=typeof loadOtherComment||(c=!0,loadOtherComment())}),document.getElementById("toggle-menu").addEventListener("click",function(){m()})},refreshFn(),window.addEventListener("resize",function(){s(!1),btf.isHidden(document.getElementById("toggle-menu"))&&i&&a()}),document.getElementById("menu-mask").addEventListener("click",function(e){a()}),document.querySelectorAll("#sidebar-menus .site-page.group").forEach(function(e){e.addEventListener("click",function(){this.classList.toggle("hide")})}),GLOBAL_CONFIG.islazyload&&(window.lazyLoadInstance=new LazyLoad({elements_selector:"img",threshold:0,data_src:"lazy-src"})),void 0!==GLOBAL_CONFIG.copyright&&(c=GLOBAL_CONFIG.copyright,document.body.oncopy=function(e){e.preventDefault();var t=window.getSelection(0).toString(),t=t.length>c.limitCount?t+"\n\n\n"+c.languages.author+"\n"+c.languages.link+window.location.href+"\n"+c.languages.source+"\n"+c.languages.info:t;return(e.clipboardData?e:window).clipboardData.setData("text",t)})});