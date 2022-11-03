<template>
  <div class="result-page">
    <div class="singer-info">
      <div class="result-title">내 음색에 어울리는 가수는</div>
      <div class="result-singer-name">{{ singerName }}</div>
      <img class="result-singer-image" :src="singerProfile" />
    </div>
    <div class="result-subtitle"><span class="result-text-orange">애창곡 노트</span> 회원들이 가장 많이 저장한 노래 </div>
    <div class="result-singer-song-list">
      <div class="result-singer-song-card">
        <div class="song-title">1위</div>
        <img class="song-image" :src="singerSong1" />
        <div class="song-title">{{ title[this.singerName][0] }}</div>
      </div>
      <div class="result-singer-song-card">
        <div class="song-title">2위</div>
        <img class="song-image" :src="singerSong2" />
        <div class="song-title">{{ title[this.singerName][1] }}</div>
      </div>
      <div class="result-singer-song-card">
        <div class="song-title">3위</div>
        <img class="song-image" :src="singerSong3" />
        <div class="song-title">{{ title[this.singerName][2] }}</div>
      </div>
    </div>
    <img class="result-footer-image" src="../assets/promotion.png" />
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
    <img class="result-footer-image" src="../assets/footerImage.png" />
  </div> 
</template>

<script>
import songtitle from '../assets/songtitle.js'
import { mapMutations } from 'vuex'

export default {
  name: 'ResultPage',
  props: {
    singerName : String, //받아온 가수 이름
  },
  data() {
    return {
      singerProfile : require(`../assets/singerData/${this.singerName}/profile.png`), 
      singerSong1 : require(`../assets/singerData/${this.singerName}/1.png`),
      singerSong2 : require(`../assets/singerData/${this.singerName}/2.png`),
      singerSong3 : require(`../assets/singerData/${this.singerName}/3.png`),
      title : songtitle,
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

* {
  text-align : center;
}
.result-page {
  width: 100%;
}

.result-title {
  font-size: 1em;
  font-weight: 600;
  margin-top: 1em;
}

.result-singer-name {
  font-weight: 600;
  color: #FF8A3D;
  margin-top: 1em;
}

.result-singer-image {
  margin-top: 1.5em;
  border-radius: 50%;
}

.result-subtitle {
  font-weight: 600;
  margin-top: 2em;
}

.result-text-orange {
  font-weight: 600;
  color: #FF8A3D;
}

.result-singer-song-list {
  display: flex;
  margin: 1.5rem;
}

.result-singer-song-card {
  flex: 1;

  margin: 0.5em;
  padding: 0.5em;
  box-shadow: 0px 8px 6px -6px #666;
  border-radius: 5px;
}

.result-singer-song-card > img {
  width: 6em;
}

.result-footer-image {
  margin-top: 3em;
  width: 25em;
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
</style>