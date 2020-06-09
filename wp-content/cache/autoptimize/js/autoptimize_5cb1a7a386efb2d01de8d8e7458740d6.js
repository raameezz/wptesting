var twentytwenty=twentytwenty||{};twentytwenty.scrolled=0;if(!Element.prototype.closest){Element.prototype.closest=function(s){var el=this;do{if(el.matches(s)){return el;}
el=el.parentElement||el.parentNode;}while(el!==null&&el.nodeType===1);return null;};}
if(window.NodeList&&!NodeList.prototype.forEach){NodeList.prototype.forEach=function(callback,thisArg){var i;var len=this.length;thisArg=thisArg||window;for(i=0;i<len;i++){callback.call(thisArg,this[i],i,this);}};}
twentytwenty.createEvent=function(eventName){var event;if(typeof window.Event==='function'){event=new Event(eventName);}else{event=document.createEvent('Event');event.initEvent(eventName,true,false);}
return event;};if(!Element.prototype.matches){Element.prototype.matches=Element.prototype.matchesSelector||Element.prototype.mozMatchesSelector||Element.prototype.msMatchesSelector||Element.prototype.oMatchesSelector||Element.prototype.webkitMatchesSelector||function(s){var matches=(this.document||this.ownerDocument).querySelectorAll(s),i=matches.length;while(--i>=0&&matches.item(i)!==this){}
return i>-1;};}
twentytwenty.touchEnabled={init:function(){var matchMedia=function(){var prefixes=['-webkit-','-moz-','-o-','-ms-'];var query=['(',prefixes.join('touch-enabled),('),'heartz',')'].join('');return window.matchMedia&&window.matchMedia(query).matches;};if(('ontouchstart'in window)||(window.DocumentTouch&&document instanceof window.DocumentTouch)||matchMedia()){document.body.classList.add('touch-enabled');}}};twentytwenty.coverModals={init:function(){if(document.querySelector('.cover-modal')){this.onToggle();this.outsideUntoggle();this.closeOnEscape();this.hideAndShowModals();}},onToggle:function(){document.querySelectorAll('.cover-modal').forEach(function(element){element.addEventListener('toggled',function(event){var modal=event.target,body=document.body;if(modal.classList.contains('active')){body.classList.add('showing-modal');}else{body.classList.remove('showing-modal');body.classList.add('hiding-modal');setTimeout(function(){body.classList.remove('hiding-modal');},500);}});});},outsideUntoggle:function(){document.addEventListener('click',function(event){var target=event.target;var modal=document.querySelector('.cover-modal.active');if(target===modal){this.untoggleModal(target);}}.bind(this));},closeOnEscape:function(){document.addEventListener('keydown',function(event){if(event.keyCode===27){event.preventDefault();document.querySelectorAll('.cover-modal.active').forEach(function(element){this.untoggleModal(element);}.bind(this));}}.bind(this));},hideAndShowModals:function(){var _doc=document,_win=window,modals=_doc.querySelectorAll('.cover-modal'),htmlStyle=_doc.documentElement.style,adminBar=_doc.querySelector('#wpadminbar');function getAdminBarHeight(negativeValue){var height,currentScroll=_win.pageYOffset;if(adminBar){height=currentScroll+adminBar.getBoundingClientRect().height;return negativeValue?-height:height;}
return currentScroll===0?0:-currentScroll;}
function htmlStyles(){var overflow=_win.innerHeight>_doc.documentElement.getBoundingClientRect().height;return{'overflow-y':overflow?'hidden':'scroll',position:'fixed',width:'100%',top:getAdminBarHeight(true)+'px',left:0};}
modals.forEach(function(modal){modal.addEventListener('toggle-target-before-inactive',function(event){var styles=htmlStyles(),offsetY=_win.pageYOffset,paddingTop=(Math.abs(getAdminBarHeight())-offsetY)+'px',mQuery=_win.matchMedia('(max-width: 600px)');if(event.target!==modal){return;}
Object.keys(styles).forEach(function(styleKey){htmlStyle.setProperty(styleKey,styles[styleKey]);});_win.twentytwenty.scrolled=parseInt(styles.top,10);if(adminBar){_doc.body.style.setProperty('padding-top',paddingTop);if(mQuery.matches){if(offsetY>=getAdminBarHeight()){modal.style.setProperty('top',0);}else{modal.style.setProperty('top',(getAdminBarHeight()-offsetY)+'px');}}}
modal.classList.add('show-modal');});modal.addEventListener('toggle-target-after-inactive',function(event){if(event.target!==modal){return;}
setTimeout(function(){var clickedEl=twentytwenty.toggles.clickedEl;modal.classList.remove('show-modal');Object.keys(htmlStyles()).forEach(function(styleKey){htmlStyle.removeProperty(styleKey);});if(adminBar){_doc.body.style.removeProperty('padding-top');modal.style.removeProperty('top');}
if(clickedEl!==false){clickedEl.focus();clickedEl=false;}
_win.scrollTo(0,Math.abs(_win.twentytwenty.scrolled+getAdminBarHeight()));_win.twentytwenty.scrolled=0;},500);});});},untoggleModal:function(modal){var modalTargetClass,modalToggle=false;if(modal.dataset.modalTargetString){modalTargetClass=modal.dataset.modalTargetString;modalToggle=document.querySelector('*[data-toggle-target="'+modalTargetClass+'"]');}
if(modalToggle){modalToggle.click();}else{modal.classList.remove('active');}}};twentytwenty.intrinsicRatioVideos={init:function(){this.makeFit();window.addEventListener('resize',function(){this.makeFit();}.bind(this));},makeFit:function(){document.querySelectorAll('iframe, object, video').forEach(function(video){var ratio,iTargetWidth,container=video.parentNode;if(video.classList.contains('intrinsic-ignore')||video.parentNode.classList.contains('intrinsic-ignore')){return true;}
if(!video.dataset.origwidth){video.setAttribute('data-origwidth',video.width);video.setAttribute('data-origheight',video.height);}
iTargetWidth=container.offsetWidth;ratio=iTargetWidth/video.dataset.origwidth;video.style.width=iTargetWidth+'px';video.style.height=(video.dataset.origheight*ratio)+'px';});}};twentytwenty.modalMenu={init:function(){this.expandLevel();this.keepFocusInModal();},expandLevel:function(){var modalMenus=document.querySelectorAll('.modal-menu');modalMenus.forEach(function(modalMenu){var activeMenuItem=modalMenu.querySelector('.current-menu-item');if(activeMenuItem){twentytwentyFindParents(activeMenuItem,'li').forEach(function(element){var subMenuToggle=element.querySelector('.sub-menu-toggle');if(subMenuToggle){twentytwenty.toggles.performToggle(subMenuToggle,true);}});}});},keepFocusInModal:function(){var _doc=document;_doc.addEventListener('keydown',function(event){var toggleTarget,modal,selectors,elements,menuType,bottomMenu,activeEl,lastEl,firstEl,tabKey,shiftKey,clickedEl=twentytwenty.toggles.clickedEl;if(clickedEl&&_doc.body.classList.contains('showing-modal')){toggleTarget=clickedEl.dataset.toggleTarget;selectors='input, a, button';modal=_doc.querySelector(toggleTarget);elements=modal.querySelectorAll(selectors);elements=Array.prototype.slice.call(elements);if('.menu-modal'===toggleTarget){menuType=window.matchMedia('(min-width: 1000px)').matches;menuType=menuType?'.expanded-menu':'.mobile-menu';elements=elements.filter(function(element){return null!==element.closest(menuType)&&null!==element.offsetParent;});elements.unshift(_doc.querySelector('.close-nav-toggle'));bottomMenu=_doc.querySelector('.menu-bottom > nav');if(bottomMenu){bottomMenu.querySelectorAll(selectors).forEach(function(element){elements.push(element);});}}
lastEl=elements[elements.length-1];firstEl=elements[0];activeEl=_doc.activeElement;tabKey=event.keyCode===9;shiftKey=event.shiftKey;if(!shiftKey&&tabKey&&lastEl===activeEl){event.preventDefault();firstEl.focus();}
if(shiftKey&&tabKey&&firstEl===activeEl){event.preventDefault();lastEl.focus();}}});}};twentytwenty.primaryMenu={init:function(){this.focusMenuWithChildren();},focusMenuWithChildren:function(){var links,i,len,menu=document.querySelector('.primary-menu-wrapper');if(!menu){return false;}
links=menu.getElementsByTagName('a');for(i=0,len=links.length;i<len;i++){links[i].addEventListener('focus',toggleFocus,true);links[i].addEventListener('blur',toggleFocus,true);}
function toggleFocus(){var self=this;while(-1===self.className.indexOf('primary-menu')){if('li'===self.tagName.toLowerCase()){if(-1!==self.className.indexOf('focus')){self.className=self.className.replace(' focus','');}else{self.className+=' focus';}}
self=self.parentElement;}}}};twentytwenty.toggles={clickedEl:false,init:function(){this.toggle();this.resizeCheck();this.untoggleOnEscapeKeyPress();},performToggle:function(element,instantly){var target,timeOutTime,classToToggle,self=this,_doc=document,toggle=element,targetString=toggle.dataset.toggleTarget,activeClass='active';if(!_doc.querySelectorAll('.show-modal').length){self.clickedEl=_doc.activeElement;}
if(targetString==='next'){target=toggle.nextSibling;}else{target=_doc.querySelector(targetString);}
if(target.classList.contains(activeClass)){target.dispatchEvent(twentytwenty.createEvent('toggle-target-before-active'));}else{target.dispatchEvent(twentytwenty.createEvent('toggle-target-before-inactive'));}
classToToggle=toggle.dataset.classToToggle?toggle.dataset.classToToggle:activeClass;timeOutTime=0;if(target.classList.contains('cover-modal')){timeOutTime=10;}
setTimeout(function(){var focusElement,subMenued=target.classList.contains('sub-menu'),newTarget=subMenued?toggle.closest('.menu-item').querySelector('.sub-menu'):target,duration=toggle.dataset.toggleDuration;if(toggle.dataset.toggleType==='slidetoggle'&&!instantly&&duration!=='0'){twentytwentyMenuToggle(newTarget,duration);}else{newTarget.classList.toggle(classToToggle);}
if(targetString==='next'){toggle.classList.toggle(activeClass);}else if(target.classList.contains('sub-menu')){toggle.classList.toggle(activeClass);}else{_doc.querySelector('*[data-toggle-target="'+targetString+'"]').classList.toggle(activeClass);}
twentytwentyToggleAttribute(toggle,'aria-expanded','true','false');if(self.clickedEl&&-1!==toggle.getAttribute('class').indexOf('close-')){twentytwentyToggleAttribute(self.clickedEl,'aria-expanded','true','false');}
if(toggle.dataset.toggleBodyClass){_doc.body.classList.toggle(toggle.dataset.toggleBodyClass);}
if(toggle.dataset.setFocus){focusElement=_doc.querySelector(toggle.dataset.setFocus);if(focusElement){if(target.classList.contains(activeClass)){focusElement.focus();}else{focusElement.blur();}}}
target.dispatchEvent(twentytwenty.createEvent('toggled'));if(target.classList.contains(activeClass)){target.dispatchEvent(twentytwenty.createEvent('toggle-target-after-active'));}else{target.dispatchEvent(twentytwenty.createEvent('toggle-target-after-inactive'));}},timeOutTime);},toggle:function(){var self=this;document.querySelectorAll('*[data-toggle-target]').forEach(function(element){element.addEventListener('click',function(event){event.preventDefault();self.performToggle(element);});});},resizeCheck:function(){if(document.querySelectorAll('*[data-untoggle-above], *[data-untoggle-below], *[data-toggle-above], *[data-toggle-below]').length){window.addEventListener('resize',function(){var winWidth=window.innerWidth,toggles=document.querySelectorAll('.toggle');toggles.forEach(function(toggle){var unToggleAbove=toggle.dataset.untoggleAbove,unToggleBelow=toggle.dataset.untoggleBelow,toggleAbove=toggle.dataset.toggleAbove,toggleBelow=toggle.dataset.toggleBelow;if(!unToggleAbove&&!unToggleBelow&&!toggleAbove&&!toggleBelow){return;}
if((((unToggleAbove&&winWidth>unToggleAbove)||(unToggleBelow&&winWidth<unToggleBelow))&&toggle.classList.contains('active'))||(((toggleAbove&&winWidth>toggleAbove)||(toggleBelow&&winWidth<toggleBelow))&&!toggle.classList.contains('active'))){toggle.click();}});});}},untoggleOnEscapeKeyPress:function(){document.addEventListener('keyup',function(event){if(event.key==='Escape'){document.querySelectorAll('*[data-untoggle-on-escape].active').forEach(function(element){if(element.classList.contains('active')){element.click();}});}});}};function twentytwentyDomReady(fn){if(typeof fn!=='function'){return;}
if(document.readyState==='interactive'||document.readyState==='complete'){return fn();}
document.addEventListener('DOMContentLoaded',fn,false);}
twentytwentyDomReady(function(){twentytwenty.toggles.init();twentytwenty.coverModals.init();twentytwenty.intrinsicRatioVideos.init();twentytwenty.modalMenu.init();twentytwenty.primaryMenu.init();twentytwenty.touchEnabled.init();});function twentytwentyToggleAttribute(element,attribute,trueVal,falseVal){if(trueVal===undefined){trueVal=true;}
if(falseVal===undefined){falseVal=false;}
if(element.getAttribute(attribute)!==trueVal){element.setAttribute(attribute,trueVal);}else{element.setAttribute(attribute,falseVal);}}
function twentytwentyMenuToggle(target,duration){var initialParentHeight,finalParentHeight,menu,menuItems,transitionListener,initialPositions=[],finalPositions=[];if(!target){return;}
menu=target.closest('.menu-wrapper');menuItems=menu.querySelectorAll('.menu-item');menuItems.forEach(function(menuItem,index){initialPositions[index]={x:menuItem.offsetLeft,y:menuItem.offsetTop};});initialParentHeight=target.parentElement.offsetHeight;target.classList.add('toggling-target');target.classList.toggle('active');menuItems.forEach(function(menuItem,index){finalPositions[index]={x:menuItem.offsetLeft,y:menuItem.offsetTop};});finalParentHeight=target.parentElement.offsetHeight;target.classList.toggle('active');menu.classList.add('is-toggling');target.classList.toggle('active');menuItems.forEach(function(menuItem,index){var initialPosition=initialPositions[index];if(initialPosition.y===0&&menuItem.parentElement===target){initialPosition.y=initialParentHeight;}
menuItem.style.transform='translate('+initialPosition.x+'px, '+initialPosition.y+'px)';});requestAnimationFrame(function(){requestAnimationFrame(function(){menu.classList.add('is-animating');menuItems.forEach(function(menuItem,index){var finalPosition=finalPositions[index];if(finalPosition.y===0&&menuItem.parentElement===target){finalPosition.y=finalParentHeight;}
if(duration!==undefined){menuItem.style.transitionDuration=duration+'ms';}
menuItem.style.transform='translate('+finalPosition.x+'px, '+finalPosition.y+'px)';});if(duration!==undefined){target.style.transitionDuration=duration+'ms';}});transitionListener=function(){menu.classList.remove('is-animating');menu.classList.remove('is-toggling');target.classList.remove('toggling-target');menuItems.forEach(function(menuItem){menuItem.style.transform='';menuItem.style.transitionDuration='';});target.style.transitionDuration='';target.removeEventListener('transitionend',transitionListener);};target.addEventListener('transitionend',transitionListener);});}
function twentytwentyFindParents(target,query){var parents=[];function traverse(item){var parent=item.parentNode;if(parent instanceof HTMLElement){if(parent.matches(query)){parents.push(parent);}
traverse(parent);}}
traverse(target);return parents;};
/*! jQuery Migrate v1.4.1 | (c) jQuery Foundation and other contributors | jquery.org/license */
"undefined"==typeof jQuery.migrateMute&&(jQuery.migrateMute=!0),function(a,b,c){function d(c){var d=b.console;f[c]||(f[c]=!0,a.migrateWarnings.push(c),d&&d.warn&&!a.migrateMute&&(d.warn("JQMIGRATE: "+c),a.migrateTrace&&d.trace&&d.trace()))}function e(b,c,e,f){if(Object.defineProperty)try{return void Object.defineProperty(b,c,{configurable:!0,enumerable:!0,get:function(){return d(f),e},set:function(a){d(f),e=a}})}catch(g){}a._definePropertyBroken=!0,b[c]=e}a.migrateVersion="1.4.1";var f={};a.migrateWarnings=[],b.console&&b.console.log&&b.console.log("JQMIGRATE: Migrate is installed"+(a.migrateMute?"":" with logging active")+", version "+a.migrateVersion),a.migrateTrace===c&&(a.migrateTrace=!0),a.migrateReset=function(){f={},a.migrateWarnings.length=0},"BackCompat"===document.compatMode&&d("jQuery is not compatible with Quirks Mode");var g=a("<input/>",{size:1}).attr("size")&&a.attrFn,h=a.attr,i=a.attrHooks.value&&a.attrHooks.value.get||function(){return null},j=a.attrHooks.value&&a.attrHooks.value.set||function(){return c},k=/^(?:input|button)$/i,l=/^[238]$/,m=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,n=/^(?:checked|selected)$/i;e(a,"attrFn",g||{},"jQuery.attrFn is deprecated"),a.attr=function(b,e,f,i){var j=e.toLowerCase(),o=b&&b.nodeType;return i&&(h.length<4&&d("jQuery.fn.attr( props, pass ) is deprecated"),b&&!l.test(o)&&(g?e in g:a.isFunction(a.fn[e])))?a(b)[e](f):("type"===e&&f!==c&&k.test(b.nodeName)&&b.parentNode&&d("Can't change the 'type' of an input or button in IE 6/7/8"),!a.attrHooks[j]&&m.test(j)&&(a.attrHooks[j]={get:function(b,d){var e,f=a.prop(b,d);return f===!0||"boolean"!=typeof f&&(e=b.getAttributeNode(d))&&e.nodeValue!==!1?d.toLowerCase():c},set:function(b,c,d){var e;return c===!1?a.removeAttr(b,d):(e=a.propFix[d]||d,e in b&&(b[e]=!0),b.setAttribute(d,d.toLowerCase())),d}},n.test(j)&&d("jQuery.fn.attr('"+j+"') might use property instead of attribute")),h.call(a,b,e,f))},a.attrHooks.value={get:function(a,b){var c=(a.nodeName||"").toLowerCase();return"button"===c?i.apply(this,arguments):("input"!==c&&"option"!==c&&d("jQuery.fn.attr('value') no longer gets properties"),b in a?a.value:null)},set:function(a,b){var c=(a.nodeName||"").toLowerCase();return"button"===c?j.apply(this,arguments):("input"!==c&&"option"!==c&&d("jQuery.fn.attr('value', val) no longer sets properties"),void(a.value=b))}};var o,p,q=a.fn.init,r=a.find,s=a.parseJSON,t=/^\s*</,u=/\[(\s*[-\w]+\s*)([~|^$*]?=)\s*([-\w#]*?#[-\w#]*)\s*\]/,v=/\[(\s*[-\w]+\s*)([~|^$*]?=)\s*([-\w#]*?#[-\w#]*)\s*\]/g,w=/^([^<]*)(<[\w\W]+>)([^>]*)$/;a.fn.init=function(b,e,f){var g,h;return b&&"string"==typeof b&&!a.isPlainObject(e)&&(g=w.exec(a.trim(b)))&&g[0]&&(t.test(b)||d("$(html) HTML strings must start with '<' character"),g[3]&&d("$(html) HTML text after last tag is ignored"),"#"===g[0].charAt(0)&&(d("HTML string cannot start with a '#' character"),a.error("JQMIGRATE: Invalid selector string (XSS)")),e&&e.context&&e.context.nodeType&&(e=e.context),a.parseHTML)?q.call(this,a.parseHTML(g[2],e&&e.ownerDocument||e||document,!0),e,f):(h=q.apply(this,arguments),b&&b.selector!==c?(h.selector=b.selector,h.context=b.context):(h.selector="string"==typeof b?b:"",b&&(h.context=b.nodeType?b:e||document)),h)},a.fn.init.prototype=a.fn,a.find=function(a){var b=Array.prototype.slice.call(arguments);if("string"==typeof a&&u.test(a))try{document.querySelector(a)}catch(c){a=a.replace(v,function(a,b,c,d){return"["+b+c+'"'+d+'"]'});try{document.querySelector(a),d("Attribute selector with '#' must be quoted: "+b[0]),b[0]=a}catch(e){d("Attribute selector with '#' was not fixed: "+b[0])}}return r.apply(this,b)};var x;for(x in r)Object.prototype.hasOwnProperty.call(r,x)&&(a.find[x]=r[x]);a.parseJSON=function(a){return a?s.apply(this,arguments):(d("jQuery.parseJSON requires a valid JSON string"),null)},a.uaMatch=function(a){a=a.toLowerCase();var b=/(chrome)[ \/]([\w.]+)/.exec(a)||/(webkit)[ \/]([\w.]+)/.exec(a)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a)||/(msie) ([\w.]+)/.exec(a)||a.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a)||[];return{browser:b[1]||"",version:b[2]||"0"}},a.browser||(o=a.uaMatch(navigator.userAgent),p={},o.browser&&(p[o.browser]=!0,p.version=o.version),p.chrome?p.webkit=!0:p.webkit&&(p.safari=!0),a.browser=p),e(a,"browser",a.browser,"jQuery.browser is deprecated"),a.boxModel=a.support.boxModel="CSS1Compat"===document.compatMode,e(a,"boxModel",a.boxModel,"jQuery.boxModel is deprecated"),e(a.support,"boxModel",a.support.boxModel,"jQuery.support.boxModel is deprecated"),a.sub=function(){function b(a,c){return new b.fn.init(a,c)}a.extend(!0,b,this),b.superclass=this,b.fn=b.prototype=this(),b.fn.constructor=b,b.sub=this.sub,b.fn.init=function(d,e){var f=a.fn.init.call(this,d,e,c);return f instanceof b?f:b(f)},b.fn.init.prototype=b.fn;var c=b(document);return d("jQuery.sub() is deprecated"),b},a.fn.size=function(){return d("jQuery.fn.size() is deprecated; use the .length property"),this.length};var y=!1;a.swap&&a.each(["height","width","reliableMarginRight"],function(b,c){var d=a.cssHooks[c]&&a.cssHooks[c].get;d&&(a.cssHooks[c].get=function(){var a;return y=!0,a=d.apply(this,arguments),y=!1,a})}),a.swap=function(a,b,c,e){var f,g,h={};y||d("jQuery.swap() is undocumented and deprecated");for(g in b)h[g]=a.style[g],a.style[g]=b[g];f=c.apply(a,e||[]);for(g in b)a.style[g]=h[g];return f},a.ajaxSetup({converters:{"text json":a.parseJSON}});var z=a.fn.data;a.fn.data=function(b){var e,f,g=this[0];return!g||"events"!==b||1!==arguments.length||(e=a.data(g,b),f=a._data(g,b),e!==c&&e!==f||f===c)?z.apply(this,arguments):(d("Use of jQuery.fn.data('events') is deprecated"),f)};var A=/\/(java|ecma)script/i;a.clean||(a.clean=function(b,c,e,f){c=c||document,c=!c.nodeType&&c[0]||c,c=c.ownerDocument||c,d("jQuery.clean() is deprecated");var g,h,i,j,k=[];if(a.merge(k,a.buildFragment(b,c).childNodes),e)for(i=function(a){return!a.type||A.test(a.type)?f?f.push(a.parentNode?a.parentNode.removeChild(a):a):e.appendChild(a):void 0},g=0;null!=(h=k[g]);g++)a.nodeName(h,"script")&&i(h)||(e.appendChild(h),"undefined"!=typeof h.getElementsByTagName&&(j=a.grep(a.merge([],h.getElementsByTagName("script")),i),k.splice.apply(k,[g+1,0].concat(j)),g+=j.length));return k});var B=a.event.add,C=a.event.remove,D=a.event.trigger,E=a.fn.toggle,F=a.fn.live,G=a.fn.die,H=a.fn.load,I="ajaxStart|ajaxStop|ajaxSend|ajaxComplete|ajaxError|ajaxSuccess",J=new RegExp("\\b(?:"+I+")\\b"),K=/(?:^|\s)hover(\.\S+|)\b/,L=function(b){return"string"!=typeof b||a.event.special.hover?b:(K.test(b)&&d("'hover' pseudo-event is deprecated, use 'mouseenter mouseleave'"),b&&b.replace(K,"mouseenter$1 mouseleave$1"))};a.event.props&&"attrChange"!==a.event.props[0]&&a.event.props.unshift("attrChange","attrName","relatedNode","srcElement"),a.event.dispatch&&e(a.event,"handle",a.event.dispatch,"jQuery.event.handle is undocumented and deprecated"),a.event.add=function(a,b,c,e,f){a!==document&&J.test(b)&&d("AJAX events should be attached to document: "+b),B.call(this,a,L(b||""),c,e,f)},a.event.remove=function(a,b,c,d,e){C.call(this,a,L(b)||"",c,d,e)},a.each(["load","unload","error"],function(b,c){a.fn[c]=function(){var a=Array.prototype.slice.call(arguments,0);return"load"===c&&"string"==typeof a[0]?H.apply(this,a):(d("jQuery.fn."+c+"() is deprecated"),a.splice(0,0,c),arguments.length?this.bind.apply(this,a):(this.triggerHandler.apply(this,a),this))}}),a.fn.toggle=function(b,c){if(!a.isFunction(b)||!a.isFunction(c))return E.apply(this,arguments);d("jQuery.fn.toggle(handler, handler...) is deprecated");var e=arguments,f=b.guid||a.guid++,g=0,h=function(c){var d=(a._data(this,"lastToggle"+b.guid)||0)%g;return a._data(this,"lastToggle"+b.guid,d+1),c.preventDefault(),e[d].apply(this,arguments)||!1};for(h.guid=f;g<e.length;)e[g++].guid=f;return this.click(h)},a.fn.live=function(b,c,e){return d("jQuery.fn.live() is deprecated"),F?F.apply(this,arguments):(a(this.context).on(b,this.selector,c,e),this)},a.fn.die=function(b,c){return d("jQuery.fn.die() is deprecated"),G?G.apply(this,arguments):(a(this.context).off(b,this.selector||"**",c),this)},a.event.trigger=function(a,b,c,e){return c||J.test(a)||d("Global events are undocumented and deprecated"),D.call(this,a,b,c||document,e)},a.each(I.split("|"),function(b,c){a.event.special[c]={setup:function(){var b=this;return b!==document&&(a.event.add(document,c+"."+a.guid,function(){a.event.trigger(c,Array.prototype.slice.call(arguments,1),b,!0)}),a._data(this,c,a.guid++)),!1},teardown:function(){return this!==document&&a.event.remove(document,c+"."+a._data(this,c)),!1}}}),a.event.special.ready={setup:function(){this===document&&d("'ready' event is deprecated")}};var M=a.fn.andSelf||a.fn.addBack,N=a.fn.find;if(a.fn.andSelf=function(){return d("jQuery.fn.andSelf() replaced by jQuery.fn.addBack()"),M.apply(this,arguments)},a.fn.find=function(a){var b=N.apply(this,arguments);return b.context=this.context,b.selector=this.selector?this.selector+" "+a:a,b},a.Callbacks){var O=a.Deferred,P=[["resolve","done",a.Callbacks("once memory"),a.Callbacks("once memory"),"resolved"],["reject","fail",a.Callbacks("once memory"),a.Callbacks("once memory"),"rejected"],["notify","progress",a.Callbacks("memory"),a.Callbacks("memory")]];a.Deferred=function(b){var c=O(),e=c.promise();return c.pipe=e.pipe=function(){var b=arguments;return d("deferred.pipe() is deprecated"),a.Deferred(function(d){a.each(P,function(f,g){var h=a.isFunction(b[f])&&b[f];c[g[1]](function(){var b=h&&h.apply(this,arguments);b&&a.isFunction(b.promise)?b.promise().done(d.resolve).fail(d.reject).progress(d.notify):d[g[0]+"With"](this===e?d.promise():this,h?[b]:arguments)})}),b=null}).promise()},c.isResolved=function(){return d("deferred.isResolved is deprecated"),"resolved"===c.state()},c.isRejected=function(){return d("deferred.isRejected is deprecated"),"rejected"===c.state()},b&&b.call(c,c),c}}}(jQuery,window);
/*! This file is auto-generated */
!function(e,t){if("function"==typeof define&&define.amd)define("hoverintent",["module"],t);else if("undefined"!=typeof exports)t(module);else{var n={exports:{}};t(n),e.hoverintent=n.exports}}(this,function(e){"use strict";var t=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e};e.exports=function(e,n,o){function i(e,t){return y&&(y=clearTimeout(y)),b=0,p?void 0:o.call(e,t)}function r(e){m=e.clientX,d=e.clientY}function u(e,t){if(y&&(y=clearTimeout(y)),Math.abs(h-m)+Math.abs(E-d)<x.sensitivity)return b=1,p?void 0:n.call(e,t);h=m,E=d,y=setTimeout(function(){u(e,t)},x.interval)}function s(t){return L=!0,y&&(y=clearTimeout(y)),e.removeEventListener("mousemove",r,!1),1!==b&&(h=t.clientX,E=t.clientY,e.addEventListener("mousemove",r,!1),y=setTimeout(function(){u(e,t)},x.interval)),this}function c(t){return L=!1,y&&(y=clearTimeout(y)),e.removeEventListener("mousemove",r,!1),1===b&&(y=setTimeout(function(){i(e,t)},x.timeout)),this}function v(t){L||(p=!0,n.call(e,t))}function a(t){!L&&p&&(p=!1,o.call(e,t))}function f(){e.addEventListener("focus",v,!1),e.addEventListener("blur",a,!1)}function l(){e.removeEventListener("focus",v,!1),e.removeEventListener("blur",a,!1)}var m,d,h,E,L=!1,p=!1,T={},b=0,y=0,x={sensitivity:7,interval:100,timeout:0,handleFocus:!1};return T.options=function(e){var n=e.handleFocus!==x.handleFocus;return x=t({},x,e),n&&(x.handleFocus?f():l()),T},T.remove=function(){e&&(e.removeEventListener("mouseover",s,!1),e.removeEventListener("mouseout",c,!1),l())},e&&(e.addEventListener("mouseover",s,!1),e.addEventListener("mouseout",c,!1)),T}});
jQuery(document).ready(function()
{var percentage=jQuery('#wp-admin-bar-autoptimize-cache-info .autoptimize-radial-bar').attr('percentage');var rotate=percentage*1.8;jQuery('#wp-admin-bar-autoptimize-cache-info .autoptimize-radial-bar .mask.full, #wp-admin-bar-autoptimize-cache-info .autoptimize-radial-bar .fill').css({'-webkit-transform':'rotate('+rotate+'deg)','-ms-transform':'rotate('+rotate+'deg)','transform':'rotate('+rotate+'deg)'});jQuery('#wp-admin-bar-autoptimize-cache-info .autoptimize-radial-bar .inset').css('background-color',jQuery('#wp-admin-bar-autoptimize .ab-sub-wrapper').css('background-color'));jQuery('#wp-admin-bar-autoptimize-delete-cache .ab-item').css('background-color',jQuery('#wpadminbar').css('background-color'));jQuery('#wp-admin-bar-autoptimize-default li').click(function(e)
{var id=(typeof e.target.id!='undefined'&&e.target.id)?e.target.id:jQuery(e.target).parent('li').attr('id');var action='';if(id=='wp-admin-bar-autoptimize-delete-cache'){action='autoptimize_delete_cache';}else{return;}
jQuery('#wp-admin-bar-autoptimize').removeClass('hover');var modal_loading=jQuery('<div class="autoptimize-loading"></div>').appendTo('body').show();var success=function(){jQuery('#wp-admin-bar-autoptimize-cache-info .size').attr('class','size green').html('0.00 B');jQuery('#wp-admin-bar-autoptimize-cache-info .files').html('0');jQuery('#wp-admin-bar-autoptimize-cache-info .percentage .numbers').attr('class','numbers green').html('0%');jQuery('#wp-admin-bar-autoptimize-cache-info .autoptimize-radial-bar .fill').attr('class','fill bg-green');jQuery('#wp-admin-bar-autoptimize').attr('class','menupop bullet-green');jQuery('#wp-admin-bar-autoptimize-cache-info .autoptimize-radial-bar .mask.full, #wp-admin-bar-autoptimize-cache-info .autoptimize-radial-bar .fill').css({'-webkit-transform':'rotate(0deg)','-ms-transform':'rotate(0deg)','transform':'rotate(0deg)'});};var notice=function(){jQuery('<div id="ao-delete-cache-timeout" class="notice notice-error is-dismissible"><p><strong><span style="display:block;clear:both;">'+autoptimize_ajax_object.error_msg+'</span></strong></p><button type="button" class="notice-dismiss"><span class="screen-reader-text">'+autoptimize_ajax_object.dismiss_msg+'</span></button></div><br>').insertAfter('#wpbody .wrap h1:first-of-type').show();};jQuery.ajax({type:'GET',url:autoptimize_ajax_object.ajaxurl,data:{'action':action,'nonce':autoptimize_ajax_object.nonce},dataType:'json',cache:false,timeout:9000,success:function(cleared)
{modal_loading.remove();if(cleared){success();}else{notice();}},error:function(jqXHR,textStatus)
{modal_loading.remove();notice();}});});});
/*! This file is auto-generated */
!function(d,l){"use strict";var e=!1,o=!1;if(l.querySelector)if(d.addEventListener)e=!0;if(d.wp=d.wp||{},!d.wp.receiveEmbedMessage)if(d.wp.receiveEmbedMessage=function(e){var t=e.data;if(t)if(t.secret||t.message||t.value)if(!/[^a-zA-Z0-9]/.test(t.secret)){var r,a,i,s,n,o=l.querySelectorAll('iframe[data-secret="'+t.secret+'"]'),c=l.querySelectorAll('blockquote[data-secret="'+t.secret+'"]');for(r=0;r<c.length;r++)c[r].style.display="none";for(r=0;r<o.length;r++)if(a=o[r],e.source===a.contentWindow){if(a.removeAttribute("style"),"height"===t.message){if(1e3<(i=parseInt(t.value,10)))i=1e3;else if(~~i<200)i=200;a.height=i}if("link"===t.message)if(s=l.createElement("a"),n=l.createElement("a"),s.href=a.getAttribute("src"),n.href=t.value,n.host===s.host)if(l.activeElement===a)d.top.location.href=t.value}}},e)d.addEventListener("message",d.wp.receiveEmbedMessage,!1),l.addEventListener("DOMContentLoaded",t,!1),d.addEventListener("load",t,!1);function t(){if(!o){o=!0;var e,t,r,a,i=-1!==navigator.appVersion.indexOf("MSIE 10"),s=!!navigator.userAgent.match(/Trident.*rv:11\./),n=l.querySelectorAll("iframe.wp-embedded-content");for(t=0;t<n.length;t++){if(!(r=n[t]).getAttribute("data-secret"))a=Math.random().toString(36).substr(2,10),r.src+="#?secret="+a,r.setAttribute("data-secret",a);if(i||s)(e=r.cloneNode(!0)).removeAttribute("security"),r.parentNode.replaceChild(e,r)}}}}(window,document);