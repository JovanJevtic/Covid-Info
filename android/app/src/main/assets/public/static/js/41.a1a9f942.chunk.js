(this["webpackJsonpionic-navigation"]=this["webpackJsonpionic-navigation"]||[]).push([[41],{167:function(n,t,o){"use strict";o.r(t),o.d(t,"startFocusVisible",(function(){return e}));var i=["Tab","ArrowDown","Space","Escape"," ","Shift","Enter","ArrowLeft","ArrowRight","ArrowUp"],e=function(){var n=[],t=!0,o=document,e=function(t){n.forEach((function(n){return n.classList.remove("ion-focused")})),t.forEach((function(n){return n.classList.add("ion-focused")})),n=t},s=function(){t=!1,e([])};o.addEventListener("keydown",(function(n){(t=i.includes(n.key))||e([])})),o.addEventListener("focusin",(function(n){if(t&&n.composedPath){var o=n.composedPath().filter((function(n){return!!n.classList&&n.classList.contains("ion-focusable")}));e(o)}})),o.addEventListener("focusout",(function(){o.activeElement===o.body&&e([])})),o.addEventListener("touchstart",s),o.addEventListener("mousedown",s)}}}]);
//# sourceMappingURL=41.a1a9f942.chunk.js.map