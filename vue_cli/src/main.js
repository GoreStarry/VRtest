import Vue from 'vue'
import App from './App.vue'
// require('gsap');
require('./lib/theater.min.js');
var draw = require('./lib/draw/draw.js').component;
// var textwrap = require("aframe-textwrap-component").component;

AFRAME.registerComponent("draw", draw);
// AFRAME.registerComponent("textwrap", textwrap);

new Vue({
  el: 'body',
  components: { App }
})
