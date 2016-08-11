import Vue from 'vue'
import App from './QA/App.vue'

require('gsap/src/minified/TweenMax.min.js'); 

require('aframe'); 
require('aframe-text-component');
var draw = require('./lib/draw/draw.js').component;
var textwrap = require('./lib/draw/textwrap.js').component;
AFRAME.registerComponent("draw", draw);

var extras = require('aframe-extras');
AFRAME.registerComponent('velocity', extras.math.velocity); // Register a single component.
extras.physics.registerAll();                               // Register a particular package, and its dependencies.
extras.registerAll();                                       // Register everything.

new Vue({
  el: 'body',
  components: {
  	App,
  }
})
