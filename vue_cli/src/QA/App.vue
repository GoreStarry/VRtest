<template>
  
  <div :class="['btn__confirm',{'btn__confirm--act': select_target}]" @click="confirmClick">Confirm</div>

  <user-profile 
    :players-data="players"
    :now-index="profile_index"
    :profile-close="profileClose" 
    :profile-switch="profile_switch"></user-profile>
    
  <a-scene>  
        <a-assets>
            <a-mixin id="ans_ani" attribute="rotation" from="0 0 0"
            begin="hover" to="0 360 0" dur="2500" fill="forwards" direction="alternate" repeat="1">
            </a-mixin>
        </a-assets>

        <a-entity id="camera" camera look-controls wasd-controls position="0 2 8">
            <a-entity position="0 0 -5" geometry="primitive: ring; radiusOuter: 0.06;
                              radiusInner: 0.05;" material="color: red; shader: flat" cursor="maxDistance: 100"></a-entity>
        </a-entity>


        <a-entity class="players"
          @mouseenter="playerMouseenter($index)"
          @mouseleave="targetMouseleave()"
          v-for="(index,player) in players" 
          track-by="$index"
          look-at=".ans"
          position="{{15*Math.cos(Math.PI/4 * $index)}} 1 {{15*Math.sin(Math.PI/4 * $index)}}">
          <a-torus color="#5d472a" position="0 0 0" segments-radial="50" segments-tubular="200" radius="2"
            radius-tubular="0.1"></a-torus>
          <a-ring radius-inner="0.0001" radius-outer="2" :src="player.mugshot"></a-ring>
          <a-animation attribute="position" begin="{{$index * 200}}" from="{{15*Math.cos(Math.PI/4 * $index)}} 1 {{15*Math.sin(Math.PI/4 * $index)}}" to="{{15*Math.cos(Math.PI/4 * $index)}} 1.3 {{15*Math.sin(Math.PI/4 * $index)}}" dur="700" easing="linear" repeat="indefinite" direction="alternate"></a-animation>
        </a-entity>
          
      

        <!-- <a-plane id="typing_text"  rotation="30 0 0" :draw="pure_typing" 
         :height="question.height" :width="question.width" position="0 7 -1"></a-plane> -->

        <!-- <a-plane id="typing_text"  rotation="30 0 0" :draw="pure_typing" 
         height="4" width="10" position="0 7 -1"></a-plane> -->


 
        <!-- <a-entity id="title" bmfont-text="text: |" material="color: white" position="-1.8 6 -5" >
            <a-animation attribute="position" begin="fly"
            from="-1.8 6 -5"
            to="-1.8 6 -15"
            easing="ease-out"
            dur="2000"
            direction="alternate"
            fill="forwards"
            repeat="1"
            ></a-animation>
        </a-entity> -->

        <a-entity
            id="ans_yes"
            class="ans"
            @mouseenter="ansMouseEnter(0)"
            @mouseleave="targetMouseleave()"
            position="-2 3 0">
            <a-entity position="-0.7 0 0" text="text: YES!" material="color: green"></a-entity>
            <a-plane opacity="0" height="0.8" width="1.2"></a-plane>
            <a-animation mixin="ans_ani"></a-animation>
        </a-entity>

        <a-entity
            id="ans_no"
            class="ans"
            @mouseenter="ansMouseEnter(1)"
            @mouseleave="targetMouseleave()"
            position="2 3 0" >
            <a-plane opacity="0" height="0.8" width="1.2"></a-plane>
            <a-entity position="-0.5 0 0" text="text: NO!" material="color: red"></a-entity>
            <a-animation mixin="ans_ani"></a-animation>
        </a-entity>

        <a-entity id="plane" geometry="primitive: plane; width: 8; height: 5;" position="0 2 1" draw="background: black;  width: 800; height: 500;" textwrap="textAlign: left; x: 0; y: 0; width: 800; height: 500; text: Hello world!Hello world!Hello world!Hello world!Hello world!Hello world! 中文測試123，中文測試123中文測試123中文測試123中文測試123中文測試123。"></a-entity>

        <!-- <a-plane id="typing_text_wrap" position="0 2 1" draw="background: black" textwrap="textAlign: left; x: 0; y: 0; text: Hello world!Hello world!Hello world!Hello world!Hello world!Hello world!"
         height="4" width="10" ></a-plane> -->


        <a-sky src="./src/images/louvreA.jpg" rotation="0 -99.5 0"></a-sky>
    </a-scene>
</template>

<script>
import UserProfile from './component/user_profile.vue';
require('gsap/src/minified/TweenMax.min.js');

import {question} from './QA_data/best_part.js';
import {players} from './QA_data/players.js';


var theater = theaterJS({
  "minSpeed": {
    "erase": 80,
    "type": 80,
  },

  "maxSpeed": {
    "erase": 350,
    "type": 350
  }
});

export default {
  components: {
    'user-profile': UserProfile,
  },
  data () {
    return {
      players: players, 

      typing_text: {
        text: '1f4',
      },
      
      /*QA data*/
      data_question: question,
      now_ans_select: false,
      now_ques_step: 1,

      question: {
        width: 0,
        height: 0,
      },

      select_active: false,
      
      /*
        player,
        answer,
       */
      select_target: false,
      
      profile_switch: false,
      profile_index: 0,

      /*profile animation*/
      profile_aniBlock: false,
      profile_tl: new TimelineLite(),
      profile_tl_close: new TimelineMax({onComplete: ()=>{
        this.profile_switch = false;
      }}),

    }
  },
  computed:{
    circle_position: function(index) {
      // angle = Math.cos(Math.PI/3)
      // const x = 3*;
      // return `${30*} 0 ${}`;
    },
    pure_typing: function(){
      return {
        text: this.typing_text.text,
        width: 512,
        height: 256,
      }
    }
  },
  methods: {
    ansMouseEnter(option){
      this.select_target = 'answer';
      this.now_ans_select = option;
      var ansID = option ? 'ans_no' : 'ans_yes';
      document.getElementById(ansID).emit('hover');
    },
    confirmClick (){
      switch(this.select_target){

        case 'player':
          if(!this.profile_switch){
            this.profile_switch = true;
            
            this.profile_tl.staggerTo(this.profile_aniBlock, 0.3,{
              // cycle:{
              //   x: ['0%','0%']
              // },
              autoAlpha: 1,
              ease: Power1.easeOut
            },0.1);
          }else{
            this.profile_switch = true;
          }
        case 'answer': 
          // get next question number
          this.now_ques_step = Object.keys(this.data_question[this.now_ques_step].answers[this.now_ans_select])[0];
          this.runTheater();

        default:
          return false;
      }
    },
    runTheater() {
      console.log(this.data_question[this.now_ques_step].question);
      theater
        .addScene(`typing_text: ${this.data_question[this.now_ques_step].question}`, 200)
        // .addScene(theater.replay)
    },
    playerMouseenter(index){
      this.select_target = 'player';
      this.profile_index = index;
    },
    targetMouseleave(){
      this.select_target = false;
    },
    profileClose(){
      
      this.profile_tl_close.staggerTo(this.profile_aniBlock, 0.3,{
        // cycle:{
        //   x: ['-100%','100%']
        // },
        autoAlpha: 0,
        ease: Power1.easeOut
      },0.1);
    },
  },
  ready () {
    this.profile_aniBlock = document.querySelectorAll('.box__info_block');

    /* Question Animation */
    theater
      .on('type:start, erase:start', function () {
        // add a class to actor's dom element when he starts typing/erasing
        var actor = theater.getCurrentActor()
        actor.$element.classList.add('is-typing')
      })
      .on('type:end, erase:end', function () {
        // and then remove it when he's done
        var actor = theater.getCurrentActor()
        actor.$element.classList.remove('is-typing')
      })
      
    theater
        .addActor('typing_text',this.typing_text)

    var that = this;

    setTimeout(opening,2000)
    function opening() {
      that.runTheater();
      // TweenMax.to(that.question, 1, {
      //   bezier:[{width:0, height:0}, {width:5, height:0}, {width:8, height:1}], 
      //   ease:Linear.easeNone,
      //   repeat:0,
      //   onComplete: that.runTheater,
      // });
    }
    
  }
}
</script>

<style lang="sass">
  @import './App.scss';
</style>
