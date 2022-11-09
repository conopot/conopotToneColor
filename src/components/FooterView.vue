<template>
    <div class="welcome-share">
      <div class="shared-text">이 페이지 <span class="result-text-orange">공유</span>하기</div>
      <div class="share-icon">
        <a class="img-kakao" @click="sendkakao">
          <button class="kakao-share-btn">카카오톡 공유</button>
        </a>
        <a class="img-url" @click="doCopy">
          <button class="link-share-btn">링크 공유</button>
        </a>
      </div>
    </div>
    <div class="footer-result-container">
      <div class="footer-result-subtitle">지금 <span class="result-text-orange">애창곡 노트</span> 에서 노래 저장하고 </div>
      <div class="footer-result-subtitle">부를 노래 <span class="result-text-orange">추천</span> 받아 보세요 🐱 </div>
      <img class="result-footer-image-promotion" src="../assets/promotion_cat.png" />
      <div class="share-icon">
          <a href="https://play.google.com/store/apps/details?id=com.soma.conopot">
            <img src="../assets/googleplay.png">
          </a>
          <a href="https://apps.apple.com/kr/app/%EC%95%A0%EC%B0%BD%EA%B3%A1-%EB%85%B8%ED%8A%B8-%EB%85%B8%EB%9E%98%EB%B0%A9%EC%97%90%EC%84%9C-%EB%B6%80%EB%A5%BC-%EB%85%B8%EB%9E%98-%EA%B8%B0%EB%A1%9D-%EB%B0%8F-%EA%B4%80%EB%A6%AC/id1627953850">
            <img src="../assets/appstore.png">
          </a>
        </div>
    </div>
    <img class="result-footer-image" src="../assets/footerImage.png" />
</template>

<script>
import { mapMutations } from 'vuex'

export default {
    name: 'FooterView',
    data() {
      return {
        myInput: window.location.href,
      }
    },    
    methods: {
    ...mapMutations(['setMore']),

    sendkakao: function () {
      window.Kakao.Link.sendCustom(
        {
          templateId: (this.$route.singer != "") ? 85420 : 85617,
        }
      )
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

.welcome-share {
  margin: 2rem;
  border-radius: 10px;
  padding-top: 1rem;
  border: solid #FFD6A9;
}

.result-text-orange {
    color: #F0A500;
}

.share-icon {
  margin : 0.5rem;
}

.footer-result-container {
  margin: 2rem;
  border-radius: 10px;
  padding-top: 1rem;
  border: solid #FFD6A9;
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

.result-footer-image-promotion {
    margin-top: 1em;
    margin-bottom: 1em;
    width: 12em;
}

.footer-result-subtitle {
  font-size: 1.2em;
}

.playstore-link {
    margin: 0.5rem;
}

.appstore-link {
    margin: 0.5rem;
}

.share-icon a {
  margin: 0.5rem;
}
</style>