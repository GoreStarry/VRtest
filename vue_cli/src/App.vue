<template>
  <!-- <div id="app">
    <h1>{{ msg }}</h1>
  </div> -->

    <div>
      {{typing_text.text}}
    </div>
   <a-scene>
        <a-assets>
            <a-mixin id="ans_ani" attribute="rotation" from="0 0 0"
            begin="hover" to="0 360 0" dur="2500" fill="forwards" direction="alternate" repeat="1">
            </a-mixin>
        </a-assets>

        <a-entity id="camera" camera look-controls wasd-controls position="0 2 4">
            <a-entity position="0 0 -5" geometry="primitive: ring; radiusOuter: 0.06;
                              radiusInner: 0.05;" material="color: red; shader: flat" cursor="maxDistance: 100"></a-entity>
        </a-entity>
        
      <!--   <a-image id="star" :height="star.height" :width="star.width" src="./src/images/star.png" position="0 6 -10" >
        </a-image> -->

        <!-- <a-entity  position="0 1 0" geometry="primitive: plane;" material="color:red"  ></a-entity> -->

        <a-plane id="typing_text"  rotation="30 0 0" :draw="pure_typing" 
         :height="question.height" :width="question.width" position="0 7 -5"></a-plane>

        <!-- <a-plane id="typing_text" textwrap="textAlign: center; x: 128; y: 128; text: Hello world!" height="3" width="6" position="0 3 -10" color="green"></a-plane> -->

        <!-- <a-entity id="box" geometry="primitive: box" position="0 2 0" draw="background: #D7E8FF" textwrap="textAlign: center; x: 128; y: 128; text: Hello world!"></a-entity> -->

 
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

        <a-entity class="ans" position="-2 3 -3">
            <a-entity position="-0.7 0 0" text="text: YES!" material="color: green"></a-entity>
            <a-animation mixin="ans_ani"></a-animation>
        </a-entity>

        <a-entity position="2 3 -3" class="ans">
            <a-entity position="-0.5 0 0" text="text: NO!" material="color: red"></a-entity>
            <a-animation mixin="ans_ani"></a-animation>
        </a-entity>

        <a-sky src="./src/images/louvre.jpg" rotation="0 -99.5 0"></a-sky>
    </a-scene>
</template>

<script>
export default {
  data () {
    return {
      star: {
        width: 0,
        height: 0,
      },

      typing_text: {
        text: '123',
      },

      question: {
        width: 0,
        height: 0,
      },


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
    }
  },
  ready () {
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
</style>
