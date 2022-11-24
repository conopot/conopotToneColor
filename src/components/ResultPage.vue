<template>
  <div class="result-page">
    <div class="singer-info">
      <div class="result-title">내 음색에 어울리는 가수는</div>
      <div class="result-singer-name">{{ singerName }}</div>
      <img class="result-singer-image" :src="singerProfile" />
      <a href="https://conopot.netlify.app">
      <button type="button">측정하러 가기</button>
      </a>
    </div>
    <div class="singer-body">
      <div class="result-subtitle"><span class="result-text-orange">애창곡 노트</span> 회원들이 가장 많이 저장한 <span class="result-text-orange">이 가수의 </span>노래 </div>
      <div class="result-singer-song-list">
        <div class="result-singer-song-card">
          <div class="song-title" style="color:#D5A11E">1위</div>
          <img class="song-image" :src="singerSong1" />
          <div class="song-title">{{ title[this.singerName][0] }}</div>
        </div>
        <div class="result-singer-song-card">
          <div class="song-title" style="color:#A3A3A3">2위</div>
          <img class="song-image" :src="singerSong2" />
          <div class="song-title">{{ title[this.singerName][1] }}</div>
        </div>
        <div class="result-singer-song-card">
          <div class="song-title" style="color:#CD7F32">3위</div>
          <img class="song-image" :src="singerSong3" />
          <div class="song-title">{{ title[this.singerName][2] }}</div>
        </div>
      </div>
    </div>
    <div class="result-notice">결과를 믿지 못하시겠다면, 직접 해당 가수의 노래를 틀어 측정해보세요!</div>
    <FooterView />
  </div> 
</template>

<script>
import songtitle from '../assets/songtitle.js'
import FooterView from './FooterView.vue'
import { mapMutations } from 'vuex'

export default {
  name: 'ResultPage',
  props: {
    singerName : String, //받아온 가수 이름
  },
  components: {
    FooterView,
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
  font-weight: 600;
}

.singer-info {
  margin: 2rem;
  border-radius: 10px;
  padding-top: 1rem;
  border: solid #FFD6A9;
}

.singer-body {
    border-radius: 10px;
    padding-top: 1rem;
    padding: 1rem;
}
.result-page {
  width: 100%;
}

.result-title {
  font-size: 1.3em;
}

.result-singer-name {
  color: #FF8A3D;
  margin-top: 1em;
  font-size: 1.5em;
}

.result-singer-image {
  margin: 1.5em;
  border-radius: 50%;
}

.result-subtitle {
  font-size: 1.2em;
}

.result-notice {
  font-size: 0.9em;
  color: #FF8A3D;
  margin: 1em;
}

.result-singer-song-list {
  display: flex;
  margin-top: 1.5rem;
}

.result-singer-song-card {
  flex: 1;
  border-radius: 5px;
}

.result-singer-song-card > img {
  width: 6em;
}

.result-footer-image {
  margin-bottom: 1em;
  width: 20em;
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
}

.link-share-btn {
  margin-left: 0.5rem;
    padding : 0.5rem;
    background-color: lightskyblue;
    color: white;
    border-radius: 15px;
    border: none;
}

.song-image {
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;
}
</style>