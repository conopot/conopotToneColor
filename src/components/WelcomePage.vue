<template>
  <div class="welcome-title">
    <h3>내 음색에 가장 어울리는 가수는?</h3>
    <img class="img-singer" src="../assets/iu.png"/>
    <div>위 사진은 Carousel 처럼 사진 둥둥 띄울 예정</div>
    <div class="welcome-subtitle"><span class="toneAnalysis">음색 분석</span>을 위해 당신의 목소리를 녹음해주세요! </div>
    <div class="analysis-box">
      <div>❗️ 결과의 정확성을 위해</div>
      <div>녹음은 10초 이상 진행해주세요!</div>
      <button class="analysis-button">녹음하기</button>
    </div>
    <div class="shared-text">이 페이지 공유하기</div>
</div> 
</template>

<script>
export default {
  name: 'WelcomePage',
  props: {
    singer : Object,
  },
//   data() {
//     return {
//       likes : this.post.likes,
//     }
//   },
//   methods: {
//     incLike() {
//       this.likes++;
//     }
//   }
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
    margin : 2rem;
    padding: 10px 30px;
    box-shadow: 3px 3px 3px grey;
    border-radius: 15px;
}

.analysis-button {
    margin-top : 0.5rem;
    padding : 5px 3rem 5px 3rem;
    background-color: #FF8A3D;
    color: white;
    border-radius: 15px;
    border: none;
    font-weight: 600;
}

.shared-text {
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
</style>