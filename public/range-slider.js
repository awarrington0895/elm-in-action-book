/* https://github.com/mm-jsr/jsr

Copyright 2017 Mateusz "Soanvig" Koteja

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.JSR=t()}(this,function(){"use strict";function e(e,t,i){e.addEventListener(t,i)}function t(i,n,s){i instanceof Array?i.forEach(function(i){i instanceof Array?t(i,n,s):e(i,n,s)}):e(i,n,s)}function i(e){var t=e.toString().split(".");return t[1]?t[1].length:0}function n(e,t,i){return(i-e)/(t-e)}function s(e,t,n,s){return function(e,t){var n=i(t),s=Math.pow(10,n);return e=Math.round(e/t)*t,Math.round(e*s)/s}(n=(t-e)*n+e,s)}var r=function(e){return function(e){return!!e&&"object"==typeof e}(e)&&!function(e){var t=Object.prototype.toString.call(e);return"[object RegExp]"===t||"[object Date]"===t||function(e){return e.$$typeof===o}(e)}(e)};var o="function"==typeof Symbol&&Symbol.for?Symbol.for("react.element"):60103;function l(e,t){var i;return(!t||!1!==t.clone)&&r(e)?u((i=e,Array.isArray(i)?[]:{}),e,t):e}function a(e,t,i){return e.concat(t).map(function(e){return l(e,i)})}function u(e,t,i){var n=Array.isArray(t);return n===Array.isArray(e)?n?((i||{arrayMerge:a}).arrayMerge||a)(e,t,i):function(e,t,i){var n={};return r(e)&&Object.keys(e).forEach(function(t){n[t]=l(e[t],i)}),Object.keys(t).forEach(function(s){r(t[s])&&e[s]?n[s]=u(e[s],t[s],i):n[s]=l(t[s],i)}),n}(e,t,i):l(t,i)}u.all=function(e,t){if(!Array.isArray(e))throw new Error("first argument should be an array");return e.reduce(function(e,i){return u(e,i,t)},{})};var c=u,h=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},d=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),f=function(e){if(Array.isArray(e)){for(var t=0,i=Array(e.length);t<e.length;t++)i[t]=e[t];return i}return Array.from(e)},g={name:"core",Klass:function(){function e(){h(this,e),this.logger=null,this.config={min:0,max:0,step:0},this.temp={sliderInMove:null,sliderClickX:0,barInMove:null,barClickX:0},this.modules={},this.values=[],this.valueInMove=[],this.stepRatio=0,this.stepRatioDecimals=0}return d(e,[{key:"_setValue",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if(!this.config.enabled)return null;t=null===t?function(e,t){var i=1,n=0;return e.forEach(function(e,s){var r=Math.abs(e-t);r<i&&(n=s,i=r)}),n}(this.values,e):parseInt(t),n&&(e=this.valueInMove[t]+e),null!==this.limit.min&&e<this.limit.min&&(e=this.limit.min),null!==this.limit.max&&e>this.limit.max&&(e=this.limit.max),void 0!==this.values[t-1]&&e<this.values[t-1]&&(e=this.values[t-1]),void 0!==this.values[t+1]&&e>this.values[t+1]&&(e=this.values[t+1]);var r=function(e,t){var n=i(t),s=Math.pow(10,n);return e=Math.round(e/t)*t,Math.round(e*s)/s}(e,this.stepRatio);r!==this.values[t]&&(this.values[t]=r,this.setSliderValue(r,t),this.modules.eventizer.trigger("core/value:update",t,s(this.config.min,this.config.max,r,this.config.step),r))}},{key:"_updateBars",value:function(e,t){var i=this.modules.renderer.body;if(i.bars){var n=i.bars[e-1],s=i.bars[e];n&&(n.style.right=100*(1-t)+"%"),s&&(s.style.left=100*t+"%")}}},{key:"setSliderValue",value:function(e,t){var i=this.modules.renderer.body.sliders[t],n=100*e+"%";this.logger.debug("JSR: Slider no. "+t+" set to value: "+e+"."),this.values[t]=e,i.style.left=n,this._updateBars(t,e)}},{key:"_initValues",value:function(){var e=this;this.values=[],this.config.values.forEach(function(t,i){t=n(e.config.min,e.config.max,t),e._setValue(t,i)})}},{key:"_initLimits",value:function(){this.limit={},this.setLimit("min",this.config.limit.min,!0),this.setLimit("max",this.config.limit.max,!0)}},{key:"_initData",value:function(){var e,t;this.stepRatio=(e=this.config.min,t=this.config.max,this.config.step/(t-e)),this.stepRatioDecimals=i(this.stepRatio)}},{key:"build",value:function(e){var t=e.config,i=e.modules,n=e.logger;this.config=t,this.logger=n,this.modules=i,this._initLimits(),this._initData()}},{key:"init",value:function(e){this.modules.renderer.appendRoot(e[0]),this._initValues(),function(){var e=this,i=this.modules.eventizer,n=this.modules.renderer.body;t(n.root,"mousedown",function(t){e.temp.mouseDown=!0,i.trigger("view/mousedown",t)}),t(document,"mousemove",function(t){e.temp.mouseDown&&(e.temp.mouseMove=!0,i.trigger("view/mousemove",t))}),t(document,"mouseup",function(t){i.trigger("view/mouseup",t),e.temp.mouseMove=!1,e.temp.mouseDown=!1}),t(n.root,"keydown",function(e){i.trigger("view/keydown",e)}),i.register("view/mouseup",function(t){!e.temp.mouseMove&&e.temp.mouseDown&&i.trigger("view/click",t)}),i.register("view/mousedown",function(t){if(t.target.classList.contains("jsr_slider")){t.stopPropagation(),e.temp.sliderInMove=parseInt(t.target.dataset.jsrId),e.temp.sliderClickX=t.clientX;var n,s,r,o=(n=e.values,s=e.temp.sliderInMove,r=[],n.forEach(function(e,t){e===n[s]&&r.push(t)}),r);o.length>1&&(e.temp.sliderInMove=o),i.trigger("view/slider:mousedown",t,o)}}),i.register("view/mousemove",function(t){if(null!==e.temp.sliderInMove){e.temp.sliderInMove instanceof Array&&(t.clientX<e.temp.sliderClickX?e.temp.sliderInMove=e.temp.sliderInMove[0]:e.temp.sliderInMove=e.temp.sliderInMove.pop()),n.sliders[e.temp.sliderInMove].focus(),n.sliders[e.temp.sliderInMove].classList.add("jsr_slider--active");var s=(t.clientX-e.temp.sliderClickX)/n.railOuter.offsetWidth;i.trigger("view/slider:mousemove",t,e.temp.sliderInMove,s)}}),i.register("view/mouseup",function(t){null!==e.temp.sliderInMove&&(n.sliders.forEach(function(e){e.classList.remove("jsr_slider--active")}),i.trigger("view/slider:mouseup",t,e.temp.sliderInMove),e.temp.sliderInMove=null)}),i.register("view/click",function(e){var t=(e.clientX-n.railOuter.getBoundingClientRect().left)/n.railOuter.offsetWidth;i.trigger("view/rail:click",e,t)}),n.bars&&(i.register("view/mousedown",function(t){t.target.classList.contains("jsr_bar")&&(t.stopPropagation(),e.temp.barInMove=parseInt(t.target.dataset.jsrId),e.temp.barClickX=t.clientX,i.trigger("view/bar:mousedown",t,e.temp.barInMove))}),i.register("view/mousemove",function(t){if(null!==e.temp.barInMove){e.temp.barIsMoved=!0;var s=(t.clientX-e.temp.barClickX)/n.railOuter.offsetWidth;i.trigger("view/bar:mousemove",t,e.temp.barInMove,s)}}),i.register("view/mouseup",function(t){null!==e.temp.barInMove&&(i.trigger("view/bar:mouseup",t,e.temp.barInMove),e.temp.barInMove=null,e.temp.barIsMoved=!1)})),i.register("view/keydown",function(e){var t=e.target.dataset.jsrId,n={37:-1,38:1,39:1,40:-1}[e.keyCode.toString()];if(!n)return!1;e.preventDefault(),i.trigger("view/root:arrow",e,t,n)}),i.register("view/slider:mousedown",function(t,i){e.logger.debug("JSR: Slider mousedown."),e.logger.debug(t),i.forEach(function(t){e.valueInMove[t]=e.values[t]})}),i.register("view/slider:mousemove",function(t,i,n){e.logger.debug("JSR: Slider mousemove."),e.logger.debug(t),e._setValue(n,i,!0)}),i.register("view/slider:mouseup",function(t){e.logger.debug("JSR: Slider mouseup."),e.logger.debug(t)}),i.register("view/rail:click",function(t,i){e.logger.debug("JSR: Rail clicked."),e.logger.debug(t),e._setValue(i)}),i.register("view/root:arrow",function(t,i,n){var s=e.values[i]+(t.shiftKey?.05:t.ctrlKey?10*e.stepRatio:e.stepRatio)*n;e._setValue(s,i)}),i.register("view/bar:mousedown",function(t,i){e.logger.debug("JSR: Bar mousedown."),e.logger.debug(t),e.valueInMove[i]=e.values[i],e.valueInMove[i+1]=e.values[i+1]}),i.register("view/bar:mousemove",function(t,i,n){e.logger.debug("JSR: Bar mousemove."),e.logger.debug(t),e._setValue(n,i,!0),e._setValue(n,i+1,!0)}),i.register("view/bar:mouseup",function(t){e.logger.debug("JSR: Bar mouseup."),e.logger.debug(t)})}.call(this),this.logger.info("JSR: Core initiated.")}},{key:"getValue",value:function(e){var t=this.values[e];return s(this.config.min,this.config.max,t,this.config.step)}},{key:"refresh",value:function(e){this.config=c(this.config,e,{arrayMerge:function(e,t){return t}}),this._initLimits(),this._initData(),this._initValues(),this.logger.debug("JSR: core refreshed")}},{key:"setValue",value:function(e,t){e=n(this.config.min,this.config.max,e),this._setValue(e,t)}},{key:"setLimit",value:function(e,t){var i=this,s=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if(null===t||void 0===t)this.limit[e]="min"===e?0:1;else{if(this.limit[e]=n(this.config.min,this.config.max,t),this.limit[e]<0?this.limit[e]=0:this.limit[e]>1&&(this.limit[e]=1),this.config.limit.show){var r=this.modules.renderer.body.limitBar;r.style.left=100*this.limit.min+"%",r.style.right=100*(1-this.limit.max)+"%"}if(s)return;this.values.forEach(function(e,t){i._setValue(e,t)})}}},{key:"view",value:function(){var e={classes:["jsr_slider"],attributes:{tabindex:0},count:this.config.sliders||1,alwaysArray:!0,name:"sliders",parent:"rail"};return[{classes:["jsr_rail-outer"],count:1,name:"railOuter",parent:"root"},{classes:["jsr_rail"],count:1,name:"rail",parent:"railOuter"},e,{classes:["jsr_bar"],count:e.count-1,alwaysArray:!0,name:"bars",parent:"rail"},{classes:["jsr_bar","jsr_bar--limit"],count:1,name:"limitBar",parent:"rail"}]}}]),e}()};var v=function(e,t){var i={};return function e(t,i,n,s){var r=i[t],o=r.count,l=[];if(o<=0)return l;n[t]=n[t]||[];for(var a=0;a<o;a+=1){var u,c=document.createElement("div");(u=c.classList).add.apply(u,f(r.classes)),n[t].push(c),l.push(c)}return r.children&&r.children.length>0&&r.children.forEach(function(r){for(var l=function(o){e(r,i,n,s).forEach(function(e){for(var l in s[r]=void 0===s[r]?0:s[r]+1,e.dataset.jsrId=s[r],i[r].attributes)e.setAttribute(l,i[r].attributes[l]);n[t][o].appendChild(e)})},a=0;a<o;a+=1)l(a)}),l}(t,e,i,{}),function(e,t){for(var i in e)1!==e[i].length||t[i].alwaysArray||(e[i]=e[i][0])}(i,e),i},m={name:"renderer",Klass:function(){function e(){h(this,e),this.logger=null,this.config={},this.modules={},this.body={},this.bodyStructure={root:{classes:["jsr"],count:1}}}return d(e,[{key:"_createBody",value:function(e){var t=c({},this.bodyStructure);for(var i in this.modules){if(this.modules[i].view)this.modules[i].view().forEach(function(e){t[e.name]=e,t[e.parent].children||(t[e.parent].children=[]),t[e.parent].children.push(e.name)})}return v(t,e)}},{key:"build",value:function(e){var t=e.modules,i=e.logger,n=e.config;this.modules=t,this.logger=i,this.config=n,this.body=this._createBody("root"),this.modules.eventizer.trigger("modules/renderer:builded")}},{key:"appendRoot",value:function(e){e.parentNode.insertBefore(this.body.root,e.nextSibling),this.modules.eventizer.trigger("modules/renderer:rootAppended")}}]),e}()},p=function(){function e(t){h(this,e),this.callback=t,this.enabled=!0}return d(e,[{key:"disable",value:function(){this.enabled=!1}},{key:"enable",value:function(){this.enabled=!0}},{key:"trigger",value:function(){this.enabled&&this.callback.apply(this,arguments)}}]),e}(),b={name:"eventizer",Klass:function(){function e(){h(this,e),this.store={}}return d(e,[{key:"_createNewStore",value:function(e){this.store[e]||(this.store[e]=[])}},{key:"_addListener",value:function(e,t){this._createNewStore(e);var i=new p(t);return this.store[e].push(i),i}},{key:"_dispatchEvent",value:function(e){if(!this.store[e])return!1;for(var t=this.store[e].length,i=arguments.length,n=Array(i>1?i-1:0),s=1;s<i;s++)n[s-1]=arguments[s];for(var r=0;r<t;r+=1){var o;(o=this.store[e][r]).trigger.apply(o,n)}}},{key:"register",value:function(e,t){return this._addListener(e,t)}},{key:"trigger",value:function(e){for(var t=arguments.length,i=Array(t>1?t-1:0),n=1;n<t;n++)i[n-1]=arguments[n];this._dispatchEvent.apply(this,[e].concat(i))}}]),e}()},y={debug:0,info:1,warn:2,error:3,disable:4},w=function(){function e(){h(this,e),this.level=1}return d(e,[{key:"setLevel",value:function(e){this.level=y[e]}},{key:"debug",value:function(){var e;this.level>0||(e=console).log.apply(e,arguments)}},{key:"log",value:function(){var e;this.level>1||(e=console).log.apply(e,arguments)}},{key:"info",value:function(){var e;this.level>1||(e=console).info.apply(e,arguments)}},{key:"warn",value:function(){var e;this.level>2||(e=console).warn.apply(e,arguments)}},{key:"error",value:function(){var e;this.level>3||(e=console).error.apply(e,arguments)}}]),e}(),M={name:"inputUpdater",Klass:function(){function e(){h(this,e),this.input=null}return d(e,[{key:"_bindEvents",value:function(){var e=this;this.modules.eventizer.register("core/value:update",function(t,i){e.inputs[t].value=i,e.modules.eventizer.trigger("input/value:update",e.inputs[t],i),e.logger.debug("JSR: Input "+t+" updated with value "+i)})}},{key:"build",value:function(e,t){var i=e.config,n=e.modules,s=e.logger;this.inputs=t.inputs,this.logger=s,this.config=i,this.modules=n,this._bindEvents()}}]),e}()},k=function(e,t,i){var n,s,r,o,l;function a(){var u=Date.now()-o;u<t&&u>=0?n=setTimeout(a,t-u):(n=null,i||(l=e.apply(r,s),r=s=null))}null==t&&(t=100);var u=function(){r=this,s=arguments,o=Date.now();var u=i&&!n;return n||(n=setTimeout(a,t)),u&&(l=e.apply(r,s),r=s=null),l};return u.clear=function(){n&&(clearTimeout(n),n=null)},u.flush=function(){n&&(l=e.apply(r,s),r=s=null,clearTimeout(n),n=null)},u};function _(e,t){this.mergedLabels.push(t),this.labels[e].appendChild(this.labels[t])}function x(){var e=this.labels;(function(){var e=this;this.mergedLabels.forEach(function(t){e.labelsParent.appendChild(e.labels[t])}),this.mergedLabels=[]}).call(this);for(var t=0,i=t+1;i<e.length;)e[t].getBoundingClientRect().right+5>=e[i].getBoundingClientRect().left?(_.call(this,t,i),i+=1):(t+=1,i+=1);this.minMax[0].getBoundingClientRect().right+5>=this.labels[0].getBoundingClientRect().left?this.minMax[0].style.opacity="0":this.minMax[0].style.opacity="1",this.labels[this.labels.length-1].getBoundingClientRect().right+5>=this.minMax[1].getBoundingClientRect().left?this.minMax[1].style.opacity="0":this.minMax[1].style.opacity="1"}var E={name:"labels",Klass:function(){function e(){h(this,e),this.labels=[],this.minMax=[],this.values=[],this.labelsParent=null,this.mergedLabels=[]}return d(e,[{key:"_bindEvents",value:function(){var e=this,n=this.modules.eventizer;n.register("core/value:update",function(t,n,s){e.values[t]=[n,s],function(e,t,n){var s=this.labels[e];if(this.config.step<1){var r=i(t),o=i(this.config.step)-r;if(o>0){var l=t.toString().split(".");t=l[0]+"."+(l[1]||0)+Array(o).join("0")}}s.innerHTML=this.formatter?this.formatter(t):t,this.values[e]=n;var a=s.getBoundingClientRect();s.style.left="calc("+100*n+"% - "+a.width/2+"px)",function(){return this.values.filter(function(e){return void 0!==e}).length===this.config.values.length}.call(this)&&x.call(this);var u=this.modules.renderer.body.root.getBoundingClientRect();(a=s.getBoundingClientRect()).right>u.right&&(s.style.left="calc(100% - "+a.width+"px)"),a.left<u.left&&(s.style.left="0")}.call(e,t,n,s)}),n.register("view/mousedown",function(t){if(t.target.classList.contains("jsr_label")){t.stopPropagation();var i=new MouseEvent("mousedown",t);e.modules.renderer.body.sliders[t.target.dataset.jsrId].dispatchEvent(i)}}),t(window,"resize",k(function(){x.call(e)},100))}},{key:"_parseMinMax",value:function(){this.minMax[0].innerHTML=this.formatter?this.formatter(this.config.min):this.config.min,this.minMax[1].innerHTML=this.formatter?this.formatter(this.config.max):this.config.max,this.minMax[0].style.left="0%",this.minMax[1].style.right="0%",this.config.labels.minMax||(this.minMax[0].style.display="none",this.minMax[1].style.display="none")}},{key:"build",value:function(e){var t=this,i=e.config,n=e.modules,s=e.logger;this.logger=s,this.config=c({labels:{minMax:!0,formatter:null}},i),this.modules=n,this.formatter=this.config.labels.formatter,this.modules.eventizer.register("modules/renderer:builded",function(){t.labels=t.modules.renderer.body.labels,t.labelsParent=t.labels[0].parentNode,t.minMax=t.modules.renderer.body.labelsMinMax,t._parseMinMax(),t._bindEvents()})}},{key:"refresh",value:function(e){this.config=c(this.config,e,{arrayMerge:function(e,t){return t}}),this.formatter=this.config.labels.formatter,this._parseMinMax(),x.call(this),this.logger.debug("JSR: labels refreshed")}},{key:"view",value:function(){return[{classes:["jsr_label"],children:[],count:this.config.sliders,alwaysArray:!0,parent:"rail",name:"labels"},{classes:["jsr_label","jsr_label--minmax"],children:[],count:2,parent:"rail",name:"labelsMinMax"}]}}]),e}()},R={name:"touchSupport",Klass:function(){function e(){h(this,e)}return d(e,[{key:"_bindEvents",value:function(){t(this.modules.renderer.body.root,"touchstart",function(e){document.documentElement.classList.add("jsr_lockscreen"),(e=e.targetTouches.item(0)).bubbles=!0,e.cancelable=!0;var t=new MouseEvent("mousedown",e);e.target.dispatchEvent(t)}),t(document,"touchmove",function(e){(e=e.targetTouches.item(0)).bubbles=!0,e.cancelable=!0;var t=new MouseEvent("mousemove",e);e.target.dispatchEvent(t)}),t(document,"touchend",function(e){document.documentElement.classList.remove("jsr_lockscreen"),(e=e.changedTouches.item(0)).bubbles=!0,e.cancelable=!0;var t=new MouseEvent("mouseup",e);e.target.dispatchEvent(t)})}},{key:"build",value:function(e){var t=e.config,i=e.modules,n=e.logger;this.logger=n,this.config=t,this.modules=i,this._bindEvents()}}]),e}()},S={name:"htmlLabels",Klass:function(){function e(){h(this,e)}return d(e,[{key:"_bindEvents",value:function(){var e=this;this.inputs.map(function(e){return e.id}).forEach(function(t,i){var n=document.querySelector('label[for="'+t+'"]');n&&n.addEventListener("click",function(){e.modules.renderer.body.sliders[i].focus()})})}},{key:"build",value:function(e,t){var i=e.config,n=e.modules,s=e.logger;this.logger=s,this.config=i,this.modules=n,this.inputs=t.inputs,this._bindEvents()}}]),e}()},I={name:"grid",Klass:function(){function e(){h(this,e)}return d(e,[{key:"_bindEvents",value:function(){var e=this;window.addEventListener("resize",k(function(){e.logger.debug("JSR: Canvas resized."),e._setDimensions(),e._render()},50))}},{key:"_setDimensions",value:function(){this.width=this.modules.renderer.body.railOuter.offsetWidth,this.height=this.config.grid.height+this.config.grid.fontSize+this.config.grid.textPadding,this.devicePixelRatio=window.devicePixelRatio||1,this.canvas.style.width=this.width+"px",this.canvas.width=this.width*this.devicePixelRatio,this.canvas.style.height=this.height+"px",this.canvas.height=this.height*this.devicePixelRatio,this.context.scale(window.devicePixelRatio,window.devicePixelRatio)}},{key:"_getNumberOfLines",value:function(){return Math.round(100)}},{key:"_render",value:function(){var e=this.width,t=this.config.grid.height,i=this.context,n=this._getNumberOfLines(),s=1/n;i.clearRect(0,0,e,t),i.beginPath(),i.lineWidth=1,i.fillStyle=i.strokeStyle=this.config.grid.color,i.font=this.config.grid.fontSize+"px "+this.config.grid.fontFamily,i.textBaseline="top";for(var r=0;r<=n;r+=1){var o=r*s*e;if(o=Math.round(100*o)/100,i.moveTo(o,0),i.lineTo(o,t),r%10==0){i.textAlign=0===r?"left":r===n?"right":"center";var l=(this.config.max-this.config.min)*(r/n)+this.config.min;this.config.labels&&this.config.labels.formatter&&(l=this.config.labels.formatter(l)),i.fillText(l.toString(),r*s*e,t+this.config.grid.textPadding)}}i.closePath(),i.stroke()}},{key:"build",value:function(e){var t=this,i=e.config,n=e.modules,s=e.logger;this.logger=s,this.config=c({grid:{color:"rgba(0, 0, 0, 0.3)",height:10,fontSize:10,fontFamily:"sans-serif",textPadding:5}},i),this.modules=n,this.canvas=document.createElement("canvas"),this.canvas.classList.add("jsr_canvas"),this.context=this.canvas.getContext("2d"),this.modules.eventizer.register("modules/renderer:rootAppended",function(){t.modules.renderer.body.railOuter.appendChild(t.canvas),t._setDimensions(),t._render()}),this._bindEvents()}},{key:"refresh",value:function(e){this.config=c(this.config,e,{arrayMerge:function(e,t){return t}}),this._setDimensions(),this._render(),this.logger.debug("JSR: grid refreshed")}}]),e}()};return function(){function e(t){var i=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};h(this,e);var s={log:"error",min:0,max:100,step:1,enabled:!0,limit:{show:!1},modules:{},modulesArray:[b,g,E,I,m,R,M,S]};this.config=c(s,n),this.specificConfig={inputUpdater:{},htmlLabels:{}},this.logger=new w,this.logger.setLevel(this.config.log),t=[].concat(t),this.inputs=t.map(function(e){return"string"==typeof e?document.querySelector(e):e});var r=this._validate({inputs:t});if(r)return r.forEach(function(e){i.logger.error(e)}),{};this.modules={},this.modulesArray=[],this.config.modulesArray.forEach(function(e,t){(void 0===i.config.modules[e.name]||i.config.modules[e.name])&&(i.modulesArray[t]=i.modules[e.name]=new e.Klass)}),this.specificConfig.inputUpdater.inputs=this.inputs,this.specificConfig.htmlLabels.inputs=this.inputs,this._buildModules(),this._init()}return d(e,[{key:"_validate",value:function(e){var t=[];return this.config.sliders!==this.config.values.length&&t.push("JSR: Number of sliders isn't equal to number of values."),this.inputs.length!==this.config.values.length&&t.push("JSR: Number of inputs isn't equal to number of values."),this.inputs.forEach(function(i,n){i||t.push("JSR: Input "+e.inputs[n]+" not found.")}),!!t.length&&t}},{key:"_buildModules",value:function(){for(var e in this.modules){var t=this.modules[e].build;t?(t.call(this.modules[e],{modules:this.modules,logger:this.logger,config:this.config},this.specificConfig[e]||{}),this.logger.info("JSR: Module "+e+" builded.")):this.logger.info("JSR: Module "+e+" skipped. No .build() method.")}}},{key:"_init",value:function(){this.inputs.forEach(function(e){e.style.display="none"}),this.modules.core.init(this.inputs)}},{key:"addEventListener",value:function(e,t){return this.modules.eventizer.register({update:"input/value:update"}[e],t),this}},{key:"setValue",value:function(e,t){return this.modules.core.setValue(t,e),this}},{key:"setLimit",value:function(e,t){return this.modules.core.setLimit(e,t),this}},{key:"disable",value:function(){return this.config.enabled=!1,this.modules.renderer.body.root.classList.add("jsr--disabled"),this}},{key:"enable",value:function(){return this.config.enabled=!0,this.modules.renderer.body.root.classList.remove("jsr--disabled"),this}},{key:"refresh",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;this.config=c(this.config,t,{arrayMerge:function(e,t){return t}}),i?this.modules[i].refresh&&this.modules[i].refresh(this.config):this.modulesArray.forEach(function(t){t.refresh&&t.refresh(e.config)})}}]),e}()});