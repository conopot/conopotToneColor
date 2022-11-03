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
    <div class="welcome-share">
      <div class="shared-text">이 페이지 공유하기</div>
      <div class="share-icon">
        <a class="img-kakao" @click="sendkakao">
          <button class="kakao-share-btn">카카오톡 공유</button>
        </a>
        <a class="img-url" @click="doCopy">
          <button class="link-share-btn">링크 공유</button>
        </a>
      </div>
    </div>
</div> 
</template>

<script>
import MeasurePage from './MeasurePage.vue'
import { mapMutations } from 'vuex'

export default {
  name: 'WelcomePage',
  props: {
    step : Number,
    singers : Object,
  },
  components: {
    MeasurePage,
  },
  data() {
      return {
        myInput: window.location.href,
      }
  },
  methods: {
    ...mapMutations(['setMore']),
    result(name){
       this.$emit("result", name);
     },

    sendkakao: function () {
      window.Kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
                title: "애창곡 노트",
                description: "내 음색에 맞는 가수 찾기",
                imageUrl: "https://drive.google.com/file/d/1Vw33z5Hy6BgJOEzPvjligDaqf4hE6tZj/view?usp=sharing",
                link: {
                    mobileWebUrl: "https://conopot.netlify.app",
                    webUrl: "https://conopot.netlify.app"
                }
            },
      })
    },
    doCopy() {
      this.$copyText(this.myInput);
      alert(this.myInput + '을 복사했습니다.');
    }
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

.welcome-share {
  margin : 2rem;
}

.share-icon {
  margin : 0.5rem;
}


.kakao-share-btn {
  margin-right: 0.5rem;
  padding : 0.5rem;
  background-color: #FFEB3A;
  color: #40232A;
  border-radius: 15px;
  border: none;
  font-weight: 600;
}

.link-share-btn {
  margin-left: 0.5rem;
    padding : 0.5rem;
    background-color: lightskyblue;
    color: white;
    border-radius: 15px;
    border: none;
    font-weight: 600;
}


.post {
  width: 100%;
}
.likes {
  width: 22px;
  display: block;
  left: 0;
  margin: 15px;
}
.likes:hover {
  opacity: 0.5;
  filter: alpha(opacity=50);
}
.profile {
  background-image: url("https://placeimg.com/100/100/arch");
  width: 30px;
  height: 30px;
  background-size: 100%;
  border-radius: 50%;
  float: left;
}
.profile-name {
  display: block;
  float: left;
  padding-left: 10px;
  padding-top: 7px;
  font-size: 14px;
}
.post-header {
  height: 30px;
  padding: 10px;
}
.post-body {
  background-image: url("https://placeimg.com/640/480/animals");
  height: 450px;
  background-position: center;
  background-size: cover;
}
.post-content {
  padding-left: 15px;
  padding-right: 15px;
  font-size: 14px;
}
.date {
  font-size: 11px;
  color: grey;
  margin-top: -8px;
} 

.slider-frame {
  overflow: hidden;
  height: 15rem;
  width: auto;
}

@-webkit-keyframes slide_animation{
  0% {left:-120px;}
  10% {left:-120px;}
  20% {left:-240px;}
  30% {left:-240px;}
  40% {left:-360px;}
  50% {left:-360px;}
  60% {left:-240px;}
  70% {left:-240px;}
  80% {left:-120px;}
  90% {left:-120px;}
  100% {left:-120px;}
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