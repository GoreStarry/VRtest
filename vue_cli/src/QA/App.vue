<template>
  
  <!-- <div :class="['btn__confirm',{'btn__confirm--act': select_target}]" @click="confirmClick">Confirm</div> -->

  <user-profile 
    :players-data="players"
    :now-index="profile_index"
    :profile-close="profileClose" 
    :profile-switch="profile_switch"></user-profile>
    
  <a-scene id="abody" @click.stop.prevent="bodyClick">  
        <a-assets>
            <a-mixin id="ans_ani" attribute="rotation" from="0 0 0"
            begin="hover" to="0 360 0" dur="2500" fill="forwards" direction="alternate" repeat="1">
            </a-mixin>
        </a-assets>

        <a-entity id="camera" camera universal-controls="movementEnabled: true;"
           position="0 2 8">
            <a-entity position="0 0 -5" geometry="primitive: ring; radiusOuter: 0.06;
                              radiusInner: 0.05;" material="color: red; shader: flat" cursor="maxDistance: 100"></a-entity>
        </a-entity>

        <a-entity rotation="0 45 0">
          <a-entity class="players"
            @click.stop="confirmClick"
            @mouseenter="playerMouseenter($index)"
            @mouseleave="targetMouseleave()"
            
            v-for="(index,player) in players" 
            track-by="$index"
            look-at="#player_watch"
            position="{{15*Math.cos(Math.PI/4 * index)}} 1 {{15*Math.sin(Math.PI/4 * index)}}">
            <a-torus id="player_{{$index}}" color="#5d472a" position="0 0 0" segments-radial="50" segments-tubular="200" radius="2"
              radius-tubular="0.1">
              <a-animation
                attribute="rotation" 
                begin="hover_player"
                easing="ease-out"
                from="0 0 0"
                to="0 360 0"
                dur="1000"
              ></a-animation>
            </a-torus>
            <a-ring radius-inner="0.0001" radius-outer="1.8" :src="player.mugshot"></a-ring>
            <a-animation attribute="position" delay="{{$index * 200}}" from="{{15*Math.cos(Math.PI/4 * $index)}} 1 {{15*Math.sin(Math.PI/4 * $index)}}" to="{{15*Math.cos(Math.PI/4 * $index)}} 1.3 {{15*Math.sin(Math.PI/4 * $index)}}" dur="700" easing="linear" repeat="indefinite" direction="alternate"></a-animation>
           </a-entity>
        </a-entity>
          
    
       <!--  <a-entity
            id="ans_box"
            position="0 3 0">
            <a-animation attribute="position" begin="start_answer"
            from="-1.8 6 -5"
            to="-1.8 6 -15"
            easing="ease-out"
            dur="2000"
            direction="alternate"
            fill="forwards"
            repeat="1"
            ></a-animation>
            <a-animation attribute="visible" begin="start_answer"
            from="-1.8 6 -5"
            to="-1.8 6 -15"
            easing="ease-out"
            dur="2000"
            direction="alternate"
            fill="forwards"
            repeat="1"
            ></a-animation>
            <a-entity
              v-for="(index,answer) in data_question['1'].answers"
              track-by="$index"
              :position="answersPosition($index,4,data_question['1'].answers.length)">
              <a-ring radius-inner="0.0001" radius-outer="2" :src="answer.img_url"></a-ring>
            </a-entity>
            <a-animation mixin="ans_ani"></a-animation>
        </a-entity>   -->
        <a-entity id="player_watch" position="-1.8 2 -5"></a-entity>

        <a-entity
            id="ans_box"
            position="0 20 -5"
            rotation="180 0 0"
            visible="false"
            >

            <a-animation attribute="rotation" begin="start_answer"
              from="180 0 0"
              to="0 0 0"
              easing="ease-out"
              dur="2000"
              fill="forwards"
            ></a-animation>

            <a-animation attribute="visible" begin="start_answer"
              to="true"
              dur="1000"
            ></a-animation>

            <a-animation attribute="rotation" begin="out_answer"
              from="0 0 0"
              to="180 0 0"
              easing="ease-in"
              dur="2000"
              fill="forwards"
            ></a-animation>

            <a-animation attribute="visible" begin="out_answer"
              delay="2000"
              to="false"
              dur="1000"
            ></a-animation>


            <a-entity
              v-for="(index,answer) in data_question[now_ques_step].answers"
              track-by="id"
              @click="confirmClick"
              @mouseenter="ansMouseEnter(index)"
              @mouseleave="ansMouseLeave(index)"
              :position="answersPosition($index,answer.width,answer.height)">
              <a-image id="answer_{{now_ques_step}}_{{index}}" :src="answer.img_url"
                :height="answer.height" :width="answer.width">
                <a-animation attribute="position" begin="hover_ans_option"
                  from="0 0 0"
                  to="0 0 4"
                  easing="ease-out"
                  dur="1000"
                  fill="forwards"
                ></a-animation>
                <a-animation attribute="position" begin="leave_ans_option"
                  from="0 0 4"
                  to="0 0 0"
                  easing="ease-out"
                  dur="1000"
                  fill="forwards"
                ></a-animation>
              </a-image>
          
            </a-entity>

        </a-entity>  

        <a-entity id="typing_text" geometry="primitive: plane; width: 10; height: 3;" position="0 7 -1" rotation="30 0 0" draw="width: 1000;height: 300;" :textwrap="pure_typing"></a-entity>


        <a-sky src="./src/images/louvreA.jpg" rotation="0 -99.5 0"></a-sky>
    </a-scene>
</template>

<script>
import UserProfile from './component/user_profile.vue';
require('gsap/src/minified/TweenMax.min.js');

import {qa_demo} from './QA_data/qa_demo.js';

import {players} from './QA_data/players.js';


var theater = theaterJS({
  "minSpeed": 30,
  "maxSpeed": 60
});

export default {
  components: {
    'user-profile': UserProfile,
  },
  data () {
    return {
      players: players, 
      profile_switch: false,
      profile_index: 0,
      modal_on: false,

      /*profile animation*/
      profile_aniBlock: false,
      profile_tl: new TimelineLite(),
      profile_tl_close: new TimelineMax({onComplete: ()=>{
        this.profile_switch = false;
      }}),


      typing_text: {
        text: '',
      },
      
      /*QA data*/
      data_question: qa_demo,
      now_ans_select: false,
      now_ques_step: 1,

      question: {
        width: 0,
        height: 0,
      },

      answer_width: 8,
      answer_height: 2,

      select_active: false,
      
      /*
        player,
        answer,
       */
      select_target: false,
      
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
        textAlign: 'center',
        lineHeight: 60,
        x: 400,
        y: 20,
        width: 1000,
        height: 300, 
      }
    }
  },
  methods: {
    bodyClick(){
      if(this.modal_on){
        // this.profile_switch = false;
        // this.modal_on = false;
        this.profileClose();
      }
    },
    answersPosition(index,width,height){
      const left_right = index % 2 == 0 ? -1 : 1;
      const x = left_right * (index % 2 * width + 0.2) - width / 2 ;
      const y = Math.floor(index/2) * ( -height - 1) - 16;
      return `${x} ${y} -2`;
    },
    ansMouseEnter(index){
      this.select_target = 'answer';
      this.now_ans_select = index;
      document.getElementById(`answer_${this.now_ques_step}_${index}`).emit('hover_ans_option');
    },
    ansMouseLeave(index){
      this.select_target = false;
      document.getElementById(`answer_${this.now_ques_step}_${index}`).emit('leave_ans_option');
    },
    confirmClick (){
      if(this.profile_switch){
        this.profileClose();
        this.profile_switch = false;
        return false;
      }
      switch(this.select_target){
        case 'player':
          if(!this.profile_switch){
            this.profile_switch = true;
            setTimeout(()=>{
              this.modal_on = true;
            },500)
            this.profile_tl.staggerTo(this.profile_aniBlock, 0.5,{
              cycle:{
                x: ['0%','0%']
              },
              autoAlpha: 1,
              ease: Power1.easeOut
            },0.3);
          }else{
            this.profile_switch = true;
          }
          break;
        case 'answer': 
          // get next question number   
          // const ans_target = Object.keys(this.data_question[this.now_ques_step].answers[this.now_ans_select])[0];
          // console.log(ans_target);
          // if(ans_target.length<2){
            document.getElementById('ans_box').emit('out_answer');
            setTimeout(()=>{
              document.getElementById(`answer_${this.now_ques_step}_${this.now_ans_select}`).emit('leave_ans_option');
            },1000)
            setTimeout(()=>{
              this.now_ques_step = this.now_ques_step + 1;
              this.runTheater();
            },1500)
          // }else{//get result
            
          // }
          break;
          

        default:
          return false;
      }
    },
    runTheater() {
      theater
        .addScene(`typing_text: ${this.data_question[this.now_ques_step].question}`, 200)
        setTimeout(()=>{
          document.getElementById('ans_box').emit('start_answer');
        },2000)
    },
    playerMouseenter(index){
      this.select_target = 'player';
      this.profile_index = index;
      document.getElementById(`player_${index}`).emit('hover_player');
    },
    targetMouseleave(){
      this.select_target = false;
    },
    profileClose(){
      this.profile_tl_close.staggerTo(this.profile_aniBlock, 0.3,{
        cycle:{
          x: ['-100%','100%']
        },
        autoAlpha: 0,
        ease: Power1.easeOut,
        onComplete: ()=>{
          this.profile_switch = false;
          this.modal_on = false;
        },
      },0.1);
    },
  },
  ready () {
    document.getElementById('typing_text').emit('init_question');
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
