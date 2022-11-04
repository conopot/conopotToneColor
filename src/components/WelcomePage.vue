<template>
  <div class="welcome-title">
    <h3>내 음색에 가장 어울리는 가수는?</h3>
    <div class="slider-frame">
      <div class="slide-images">
        <div class="img-container">
          <img src="../assets/singerData/10cm/profile.png">
        </div>
        <div class="img-container">
          <img src="../assets/singerData/경서/profile.png">
        </div>
        <div class="img-container">
          <img src="../assets/singerData/성시경/profile.png">
        </div>
        <div class="img-container">
          <img src="../assets/singerData/임창정/profile.png">
        </div>
        <div class="img-container">
          <img src="../assets/singerData/폴킴/profile.png">
        </div>
      </div>
    </div>
    <div class="welcome-subtitle"><span class="toneAnalysis">음색 분석</span>을 위해 당신의 목소리를 녹음해주세요! </div>
    <div class="analysis-box">
      <MeasurePage v-on:result="result"/>
    </div>
    <FooterView />
</div> 
</template>

<script>
import MeasurePage from './MeasurePage.vue'
import FooterView from './FooterView.vue'

export default {
  name: 'WelcomePage',
  props: {
    step : Number,
    singers : Object,
  },
  components: {
    MeasurePage,
    FooterView,
  },
  methods: {
    result(name){
       this.$emit("result", name);
     },
  },
}

</script>

<style>
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');

* {
    font-family: 'Pretendard';  
}
.welcome-title {
    text-align : center;
}
.welcome-subtitle {
    margin-top : 5rem;
    text-align : center;
    font-weight: 600;
}
span.toneAnalysis {
    color: #FF8A3D;
}

.analysis-box {
    margin : 1rem;
    box-shadow: 0px 8px 6px -6px #666;
    border-radius: 15px;
}

.shared-text {
    font-weight: 600;
}

.slider-frame {
  overflow: hidden;
  height: 15rem;
  width: auto;
}

@-webkit-keyframes slide_animation {
  0% {left:-60px;}
  /* 10% {left:-120px;}
  20% {left:-240px;}
  30% {left:-240px;}
  40% {left:-360px;} */
  50% {left:-720px;}
  /* 60% {left:-240px;}
  70% {left:-240px;}
  80% {left:-120px;}
  90% {left:-120px;} */
  100% {left:-60px;}
}

.slide-images{
  height: 15rem;
  width: 100rem;
  margin: 0 0 0 -24px;
  position: relative;
  -webkit-animation-name: slide_animation;
  -webkit-animation-duration: 33s;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-direction: alternate;
  -webkit-animation-play-state: running;
}

.img-container{
  height: 15em;
  width: 10em;
  margin: 2em;
  position: relative;
  float: left;
}
</style>