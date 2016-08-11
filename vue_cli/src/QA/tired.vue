<template>
  
  <div  v-show="logo_done" :class="['btn__confirm',{'btn__confirm--act': select_target}]" @click="confirmClick">确定</div>

  <user-profile 
    :players-data="players"
    :now-index="profile_index"
    :profile-close="profileClose" 
    :profile-switch="profile_switch"></user-profile>
    
  <a-scene v-show="logo_done">  
        <a-assets>
            <img id="adv1" src="./images/ad/ad1.jpg">
            <img id="adv2" src="./images/ad/ad2.jpg">
            <img id="ans_never" src="./images/qa_weis/never.png">
            <img id="ans_some_time" src="./images/qa_weis/some_time.png">
            <img id="ans_usual" src="./images/qa_weis/usual.png">
            <img id="ans_always" src="./images/qa_weis/always.png">
            <img id="sleep_time_1" src="./images/qa_weis/sleep_time_1.png">
            <img id="sleep_time_2" src="./images/qa_weis/sleep_time_2.png">
            <img id="sleep_time_3" src="./images/qa_weis/sleep_time_3.png">
            <img id="sleep_time_4" src="./images/qa_weis/sleep_time_4.png">
            <img id="sleep_long_1" src="./images/qa_weis/sleep_long_1.png">
            <img id="sleep_long_2" src="./images/qa_weis/sleep_long_2.png">
            <img id="sleep_long_3" src="./images/qa_weis/sleep_long_3.png">
            <img id="sleep_long_4" src="./images/qa_weis/sleep_long_4.png">
            <img id="img_yes" src="./images/qa_weis/img_yes.png">
            <img id="img_no" src="./images/qa_weis/img_no.png">
            <img id="sky" src="./images/sky_tina.jpg">
          
        </a-assets>

        <a-entity id="camera" camera look-controls wasd-controls position="0 2 8">
            <a-entity position="0 0 -5" geometry="primitive: ring; radiusOuter: 0.06;
                              radiusInner: 0.05;" material="color: red; shader: flat" cursor="maxDistance: 100"></a-entity>
        </a-entity>

        <a-curvedimage src="#adv1" 
          height="5"
          radius="5.7"
          theta-length="120"
          position="10 6 3"
          rotation="0 50 0"></a-curvedimage>

        <a-curvedimage src="#adv2" 
          height="5"
          radius="5.7"
          theta-length="120"
          position="-10 6 3"
          rotation="0 -190 0"></a-curvedimage>
 
        <a-entity
            id="ans_box"
            position="-1.8 20 -5"
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
              @mouseenter="ansMouseEnter(index)"
              @mouseleave="ansMouseLeave(index)"
              :position="answersPosition($index)">
              <a-image id="answer_{{now_ques_step}}_{{index}}" src="#{{answer.id}}"
                :height="answer_height" :width="answer_width">
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

        <a-entity id="typing_text" geometry="primitive: plane; width: 8; height: 2;" position="0.1 6 -1" rotation="20 0 0" draw="width: 800;height: 200;" :textwrap="pure_typing">
        </a-entity>


        <!-- <a-sky src="./src/images/louvreA.jpg" rotation="0 -99.5 0"></a-sky> -->
        <a-sky src="#sky" rotation="0 -90 0"></a-sky>
    </a-scene>

    <div id="box__tired_logo"  v-show="!logo_done">
        <img id="img__r_b_hand" src="./images/logo/r_b_hand.png" alt="">
        <img id="img_l_b_medicine" src="./images/logo/l_b_medicine.png" alt="">
        <img id="img_c_c_discription" src="./images/logo/c_c_discription.png" alt="">
        <img id="img_r_t_text1" src="./images/logo/r_t_text1.png" alt="">
        <img id="img_c_t_text2" src="./images/logo/c_t_text2.png" alt="">
        <img id="img_r_c_text3" src="./images/logo/r_c_text3.png" alt="">
        <img id="img_c_t_logo" src="./images/logo/c_t_logo.png" alt="">
        <div id="lihgt"></div>
        <img id="img_l_t_leaf1" src="./images/logo/l_t_leaf1.png" alt="">
        <img id="img_r_t_leaf2" src="./images/logo/r_t_leaf2.png" alt="">
        <img id="img_r_c_leaf3" src="./images/logo/r_c_leaf3.png" alt="">
        <img id="img_bg" src="./images/logo/bg.png" alt="">
    </div>

</template>

<script>
import UserProfile from './component/user_profile.vue';
require('gsap/src/minified/TweenMax.min.js');

import {q_medical} from './QA_data/medical.js';

import {players} from './QA_data/players.js';


var theater = theaterJS({
  "minSpeed": 80,
  "maxSpeed": 250
});

export default {
  components: {
    'user-profile': UserProfile,
  },
  data () {
    return {
      logo_done: false,


      players: players, 
      profile_switch: false,
      profile_index: 0,

      /*profile animation*/
      profile_aniBlock: false,
      profile_tl: new TimelineLite(),
      profile_tl_close: new TimelineMax({onComplete: ()=>{
        this.profile_switch = false;
      }}),

      answer_width: 8,
      answer_height: 2,


      typing_text: {
        text: '',
      },
      
      /*QA data*/
      data_question: q_medical,
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
        width: 800,
        height: 200, 
      }
    }
  },
  methods: {
    answersPosition(index){
      const left_right = index % 2 == 0 ? -1 : 1;
      const x = left_right * (index % 2 * this.answer_width + 0.5) - 2 ;
      const y = Math.floor(index/2) * ( -this.answer_height - 1) - 16;
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
          const ans_target = Object.keys(this.data_question[this.now_ques_step].answers[this.now_ans_select])[0];
          
          if(ans_target.length<2){
            document.getElementById('ans_box').emit('out_answer');
            setTimeout(()=>{
              document.getElementById(`answer_${this.now_ques_step}_${this.now_ans_select}`).emit('leave_ans_option');
            },1000)
            setTimeout(()=>{
              this.now_ques_step = ans_target;
              this.runTheater();
            },1500)
          }else{//get result
            
          }

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
    logo_start_init(()=>{
      this.logo_done = true;
      setTimeout(opening,2000)
      document.getElementById('typing_text').emit('init_question');
    });
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

    
    
    function opening() {
      that.runTheater();
      document.getElementById('ans_box').emit('start_answer');
      // TweenMax.to(that.question, 1, {
      //   bezier:[{width:0, height:0}, {width:5, height:0}, {width:8, height:1}], 
      //   ease:Linear.easeNone,
      //   repeat:0,
      //   onComplete: that.runTheater,
      // });
    }
    
  }
}

function logo_start_init(callbackFun) {
  var hand = document.getElementById('img__r_b_hand');
  var medicine = document.getElementById('img_l_b_medicine');
  var disc = document.getElementById('img_c_c_discription');
  var text1 = document.getElementById('img_r_t_text1');
  var text2 = document.getElementById('img_c_t_text2');
  var text3 = document.getElementById('img_r_c_text3');
  var logo = document.getElementById('img_c_t_logo');
  var leaf1 = document.getElementById('img_l_t_leaf1');
  var leaf2 = document.getElementById('img_r_t_leaf2');
  var leaf3 = document.getElementById('img_r_c_leaf3');
  var bg = document.getElementById('img_bg');
  var lihgt = document.getElementById('lihgt');

  var tl = new TimelineMax();

  bg.onload = startAnimation;

  function startAnimation() {
      document.getElementById('box__tired_logo').style.opacity = '1';

      setTimeout(logoAni, 1);

  }

  function logoAni() {
      tl.from(text1, 0.5, {
              delay: 1,
              y: '-30%',
              autoAlpha: 0,
          }).to(text2, 0.5, {
              y: '50%',
              autoAlpha: 1,
          }).from(text3, 1, {
              y: '-80%',
              autoAlpha: 0,
              ease: Bounce.easeOut,
          })
          .addLabel('jump', 3.5)
          .to(text2, 0.8, {
              y: '0%',
              ease: Elastic.easeOut.config(1.75, 0.2),
          }, 'jump')
          .to(logo, 0.2, {
              autoAlpha: 1,
          }, 'jump')
          .fromTo(logo, 0.8, {
              y: '50%'
          }, {
              y: '0%',
              ease: Back.easeOut.config(30),
          }, 'jump')
          .addLabel('slogan', 4.6)
          .addLabel('background', 7.8)
          .addLabel('light', 6.2)
          .from(hand, 1, {
              autoAlpha: 0,
              x: '30%',
          }, 'background')
          .from(medicine, 1, {
              autoAlpha: 0,
              x: '-30%',
          }, 'background')
          .from([leaf1, leaf2, leaf3], 0.5, {
              autoAlpha: 0,
          })
          .from(leaf1, 1, {
              x: '-10%',
              y: '-10%',
              repeat: -1,
              yoyo: true,
              ease: Power0.easeNone,
          }, 'background')
          .from(leaf2, 1.2, {
              delay: 0.3,
              x: '5%',
              y: '-10%',
              repeat: -1,
              yoyo: true,
              ease: Power0.easeNone,
          }, 'background')
          .from(leaf3, 1.5, {
              delay: 0.6,
              x: '20%',
              y: '-20%',
              repeat: -1,
              yoyo: true,
              ease: Power0.easeNone,
          }, 'background')
          .from(disc, 2, {
              autoAlpha: 0,
              onComplete: function() {
                setTimeout(callbackFun,8000);
              }
          }, 'slogan')
  //        .fromTo(lihgt, 0.5, {
  //            autoAlpha: 0,
  //        }, {
  //            autoAlpha: 1,
  //            repeat: -1,
  //            yoyo: true,
  //        }, 'light')
          .from(lihgt, 1, {
              x: '-400%',
              repeat: -1,
              repeatDelay: 3,
          }, 'light')
  }
}
</script>

<style lang="sass">
  @import './tired.scss';
  @import './component/logo_tired.scss';
</style>
