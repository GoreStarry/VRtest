<template>
  <!-- <div id="app">
    <h1>{{ msg }}</h1>
  </div> -->
  
  <!-- <div class="cover"></div> -->
<div class="box__fixBtn">
  <div @click="prevSelect" class="btn__preNext btn__pre">Previous</div>
  <div @click="nextSelect" class="btn__preNext btn__next">Next</div>
</div>
  

   <a-scene>
        <a-assets>
            <a-mixin id="ans_ani" attribute="rotation" from="0 0 0"
            begin="hover" to="0 360 0" dur="2500" fill="forwards" direction="alternate" repeat="1">
            </a-mixin>
            <a-asset-item id="why-male-models" src="./src/DAT/3d/man/man2.dae"></a-asset-item>
            <a-asset-item id="d-star" src="./src/DAT/3d/star/20facestar.obj"></a-asset-item><a-asset-item id="d-star-mtl" src="./src/DAT/3d/star/20facestar.mtl"></a-asset-item>
            <img id="fall" src="./DAT/images/fall.png">
            <img id="goggles" src="./DAT/images/goggles.png">
            <img id="mozvr" src="./DAT/images/mozvr.png">
            <img id="price" src="./DAT/images/price.png">
            <img id="shadow2" src="./DAT/images/radial-shadow-2.png">
            <img id="shoes" src="./DAT/images/shoes.png">
            <img id="logo_star" src="./DAT/images/logo/star.png">
            <img id="logo_en" src="./DAT/images/logo/name_en.png">
            <img id="logo_cn" src="./DAT/images/logo/name_cn.png">
            <img id="logo_light" src="./DAT/images/logo/light.png">
            <img id="logo_g_light" src="./DAT/images/logo/green_light.png">
        </a-assets>

        <a-entity id="camera" camera look-controls wasd-controls position="0 2 2">
            <a-entity position="0 0 -5" geometry="primitive: ring; radiusOuter: 0.06;
                              radiusInner: 0.05;" material="color: red; shader: flat" cursor="maxDistance: 100"></a-entity>
        </a-entity>

    
      <!-- logo star -->
      <a-entity id="logo_body" v-if="!logo_done">
        <a-animation attribute="position" begin="logo_out" from="0 0 0" to="0 0 10" dur="3000"
                         easing="ease-out"></a-animation>
        <a-entity>
        <a-entity scale="0.15 0.15 0.15" position="0 2 0" 
          rotation="90 0 0"
          obj-model="obj: #d-star; mtl: #d-star-mtl"></a-entity>
          <a-animation attribute="rotation" from="0 0 0" to="0 360 0" dur="3000"
                         easing="ease-out" repeat="2"></a-animation>
        </a-entity>
        
        <!-- logo tilte -->
        <a-entity  position="0 1 0" scale="0 0 0">
          <a-image src="#logo_en" width="1.2" height="0.3"></a-image>
          <a-animation attribute="scale" begin="4000" from="0 0 0" to="1 1 1" dur="1500"
                         easing="ease-out"></a-animation>
        </a-entity>

        <!-- logo light -->
        <a-entity id="logo_light_emit" position="0 2 -.1">
          <a-image opacity="0.5" scale="1.5 1.5 1" src="#logo_light"></a-image>
          <a-animation attribute="rotation" from="0 0 0" to="0 0 360" dur="3000"
                         easing="ease-out" repeat="2"></a-animation>
        </a-entity>

        <!-- logo border -->
        <a-entity position="0 2 10">
          <a-image  scale="1.5 1.5 1" src="#logo_g_light"></a-image>
          <a-animation attribute="rotation" from="0 0 0" to="0 0 360" dur="3000"
                           easing="linear" repeat="2" animationend></a-animation>
          <a-animation attribute="position" begin="1200" from="0 2 6" to="0 2 0" dur="3000"
                           easing="linear" ></a-animation>
        </a-entity>
      </a-entity>



      <!-- model -->
      <a-entity v-if="logo_done" >
        
       <!--  <a-entity id="model" position="0 0 -2">
          <a-animation attribute="position" from="0 -10 -2" to="0 0 -2" dur="2000"
                       easing="linear"></a-animation>
          <a-animation attribute="rotation" from="0 -30 0" to="0 330 0" dur="15000"
                       easing="linear" repeat="infinite"></a-animation>
          <a-collada-model position="-.35 0 .55" rotation="0 -20 0" scale="1.5 1.5 1.5"
                           src="#why-male-models"></a-collada-model>
          <a-image src="#shadow2" rotation="-90 0 0" scale="0.5 0.5 0.5"></a-image>
        </a-entity> -->

      
        <a-entity class="ans" position="-3 20 -2" rotation=" 0 30 0">
            <a-entity scale="1.5 1.5 1.5" :text="user_name_vert" material="color: black"></a-entity>
            <a-animation attribute="position" from="-3 20 -2" to="-3 1 -2" begin="1000"
                       dur="1000"></a-animation>
        </a-entity>

   <!--      <a-curvedimage id="mozvr-logo" :src="change_img" radius="5.7" theta-length="36" height="1"
                       position="0 2.6 0" opacity="0.5">
          <a-animation attribute="rotation" from="0 10 0" to="0 200 0" begin="500"
                       dur="1000"></a-animation>
        </a-curvedimage> -->

        <a-image id="country" position="1 15 -2" :src="user_data[0].country" width="12" height="4" scale="0.2 0.2 0.2">
          <a-animation attribute="position" easing="ease-bounce" from="1 15 -2" to="1 0.5 -2" begin="1000"
                       dur="2000"></a-animation>
        </a-image>


        <a-box id="main_center" color="#101010" height="0.1" width="3" depth="3">
          <a-animation attribute="rotation" from="-270 0 0" to="-90 0 0" dur="750" begin="1000"
                       fill="both"></a-animation>
          <a-animation attribute="position" from="8 0 -9" to="8 3.5 -9" dur="750" begin="1000"
                       fill="both"></a-animation>
          <a-image :src="user_data[0].main_photo" width="3" height="3" rotation="90 0 0" position="0 -.1 0"></a-image>
        </a-box>

        <a-box id="main_left" color="#101010" height="0.1" width="3" depth="3">
          <a-animation attribute="rotation" from="-270 0 0" to="-90 0 0" dur="750" begin="1000"
                       fill="both"></a-animation>
          <a-animation attribute="position" from="0 0 -9" to="0 3.5 -9" dur="750" begin="1000"
                       fill="both"></a-animation>
          <a-image :src="user_data[1].main_photo" width="3" height="3" rotation="90 0 0" position="0 -.1 0"></a-image>
        </a-box>

        <a-box id="main_right" color="#101010" height="0.1" width="3" depth="3">
          <a-animation attribute="rotation" from="-270 0 0" to="-90 0 0" dur="750" begin="1000"
                       fill="both"></a-animation>
          <a-animation attribute="position" from="-8 0 -9" to="-8 3.5 -9" dur="750" begin="1000"
                       fill="both"></a-animation>
          <a-image :src="user_data[2].main_photo" width="3" height="3" rotation="90 0 0" position="0 -.1 0"></a-image>
        </a-box>

        <a-curvedimage id="stereoscopic-fall-collection-text" :src="user_data[0].age" radius="5.7"
                       theta-length="20" height=".8" position="0 0.9 0" scale=".4 .4 .4">
          <a-animation attribute="rotation" from="0 170 0" to="0 200 0" begin="750"
                       dur="1000"></a-animation>
        </a-curvedimage>

        <!-- extain -->
        <a-curvedimage id="extain1" :src="user_data[0].extain_photo[0]" radius="7" theta-length="20" height="2"
                       position="0 0.5 0" scale=".4 .4 .4">
          <a-animation attribute="rotation" from="0 200 0" to="0 100 0" begin="750"
                       dur="1000"></a-animation>
        </a-curvedimage>

        <a-curvedimage id="extain2" :src="user_data[0].extain_photo[1]" radius="7" theta-length="20" height="2"
                       position="0 0.5 0" scale=".4 .4 .4">
          <a-animation attribute="rotation" from="0 160 0" to="0 75 0" begin="750"
                       dur="1000"></a-animation>
        </a-curvedimage>
        <!--  -->

        <a-entity>
          <a-cylinder position="0 0.5 0" radius="4" height="1.6" side="back" open-ended="true"
                      color="#FFF"></a-cylinder>
        </a-entity>

        <a-sky color="#ECECEC"></a-sky>
        <a-light type="directional" color="#fff" intensity="0.2" position="-1 2 1"></a-light>
        <a-light type="ambient" color="#fff"></a-light>
      
      </a-entity>

      <a-plane id="typing_text"  rotation="30 0 0" :draw="pure_typing" 
       :height="question.height" :width="question.width" position="0 7 -5"></a-plane>


<!-- 
        <a-entity class="ans" position="-2 3 -3">
            <a-entity position="-0.7 0 0" text="text: YES!" material="color: green"></a-entity>
            <a-animation mixin="ans_ani"></a-animation>
        </a-entity>

        <a-entity position="2 3 -3" class="ans">
            <a-entity position="-0.5 0 0" text="text: NO!" material="color: red"></a-entity>
            <a-animation mixin="ans_ani"></a-animation>
        </a-entity> -->

        <!-- <a-sky src="./src/images/louvre.jpg" rotation="0 -99.5 0"></a-sky> -->
    </a-scene>

</template>

<script>
export default {
  data () {
    return {
      logo_done: true,

      now_page: 2,

      change_img: '#mozvr',

      typing_text: {
        text: '',
      },

      question: {
        width: 0,
        height: 0,
      },

      main_frame_light: {
        position: '',
      },

      user_data: [
        {
          user_name: 'Jack',
          main_photo: './src/DAT/images/data/man01-1.png',
          main_gray: './src/DAT/images/data/man01-grey.png',
          age: './src/DAT/images/data/man01-age.png',
          country: './src/DAT/images/data/man01-country.png',
          extain_photo: ['./src/DAT/images/data/man01-1.png','./src/DAT/images/data/man01-3.png'],
          position: '',
        },
        {
          user_name: 'Jing',
          main_photo: './src/DAT/images/data/',
          main_gray: './src/DAT/images/data/man02-grey.png',
          age: './src/DAT/images/data/man02-age.png',
          extain_photo: ['./src/DAT/images/data/','./src/DAT/images/data/'],
          extain_photo: [],
          position: '',
        },
        {
          user_name: 'Frank',
          main_photo: './src/DAT/images/data/',
          main_gray: './src/DAT/images/data/man03-grey.png',
          country: './src/DAT/images/data/man03-country.png',
          extain_photo: ['./src/DAT/images/data/','./src/DAT/images/data/'],
          position: '',
        }
      ],


      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Hello Vue23222!'
    }
  },
  computed:{
    pure_typing: function(){
      return {
        text: this.typing_text.text,
        width: 512,
        height: 256,
      }
    },
    user_name_vert: function() {
      return 'text: ' + this.user_data[0].user_name;
    }
  },
  methods: {
    prevSelect(){
      if(this.now_page!=0){
        this.now_page=this.now_page-1;
      }
    },
    nextSelect(){
      if(this.now_page!=4){
        this.now_page=this.now_page+1;
      }
    },
  },
  ready () {
    var scene = document.querySelector('a-scene');
    if (scene.hasLoaded) {
      aframe_init();
    } else {
      scene.addEventListener('loaded', aframe_init);
    }
    console.log(this.user_data[0].extain_photo[0])
    var logo_light_emit = document.getElementById("logo_light_emit");

    logo_light_emit.addEventListener('animationend',(res)=>{
      console.log(res);
      document.getElementById('logo_body').emit('logo_out')
      setTimeout(()=>{
        this.logo_done = true;
      },1000)
    });

    const aframe_init = () => {
      setTimeout(()=>{
        
        this.change_img = '#price';
      },3000)
      
    }

    

    var theater = theaterJS()
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
    var that = this;
    function runTheater() {
      theater
        .addActor('typing_text',that.typing_text)

      theater
        .addScene('typing_text: 對於愛情，當然是心動不如馬上行動。', 400)
        .addScene(theater.replay)
    }
    
   

    setTimeout(opening,2000)
    function opening() {
      TweenMax.to(that.question, 1, {
        bezier:[{width:0, height:0}, {width:5, height:0}, {width:6, height:3}], 
        ease:Linear.easeNone,
        repeat:0,
        onComplete: runTheater,
      });
    }
    
  }
}
</script>

<style>
body {
  font-family: Helvetica, sans-serif;
}

.box__fixBtn{
  position: fixed;
  display: flex;
  flex-direction: row;
  justify-content: center;
  bottom: 2rem;
  left: 0;
  right: 0;
  z-index: 2;
}
.btn__preNext{
  cursor: pointer;
  margin: 3rem;
  width: 100px;
  height: 40px;
  background-color: red;
  text-align: center;
  line-height: 40px;
}
</style>
