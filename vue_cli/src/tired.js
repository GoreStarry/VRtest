import Vue from 'vue'
import App from './QA/tired.vue'

require('gsap/src/minified/TweenMax.min.js'); 

require('aframe'); 
require('aframe-text-component');
var draw = require('./lib/draw/draw.js').component;
var textwrap = require('./lib/draw/textwrap.js').component;
AFRAME.registerComponent("draw", draw);
// AFRAME.registerComponent("textwrap", textwrap);

new Vue({
  el: 'body',
  components: { 
  	App,
  }
})
