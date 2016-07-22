import Vue from 'vue'
import App from './App.vue'
// import Logo from './DAT/component/logo/Logo.vue';
require('gsap/src/minified/TweenMax.min.js'); 
var draw = require('./lib/draw/draw.js').component;
// var textwrap = require("aframe-textwrap-component").component;

AFRAME.registerComponent("draw", draw);
// AFRAME.registerComponent("textwrap", textwrap);

// Vue.component('logo_component',Logo);

var logo_component = Vue.extend(App)

new Vue({
  el: 'body',
  components: { 
  	App,
  	// Logo,
  }
})
