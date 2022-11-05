<template>
  <div class="welcome-title">
    <h3 class="welcome-title-text">내 <span class="toneAnalysis">음색</span>에 가장 어울리는 <span class="toneAnalysis">가수</span>는?</h3>
    <div>AI 음성 분석을 통한 내 목소리와 어울리는 가수 찾기</div>
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
    <div class="welcome-measure-card">
      <div class="welcome-subtitle"><span class="toneAnalysis">음색 분석</span>을 위해 당신의 목소리를 녹음해주세요! </div>
      <div class="analysis-box">
        <MeasurePage v-on:result="result"/>
      </div>
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
    color: white;
}
.welcome-title {
    text-align : center;
}

.welcome-title-text {
  font-size: 1.3rem;
}

span.toneAnalysis {
    color: #F0A500;
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
  margin: 1em;
  position: relative;
  float: left;
}

.welcome-measure-card {
  margin: 2rem;
  border-radius: 10px;
  padding-top: 1rem;
  border: solid #FFD6A9;
}

.welcome-subtitle {
  text-align : center;
  font-weight: 600;
  padding-bottom: 0.5rem;
  font-size: 0.9em;
}

</style>