<template>
  <div class="measure-title">
    <div id="label-container"></div>
    <p class="result-content">{{ current }}</p>
    <button v-if="recordStatus == 0" type="button" @click="init">녹음하기</button>
    <button v-if="recordStatus == 1" type="button" @click="stop">중지</button>
    <button v-if="recordStatus == 2" type="button" @click="inference">결과보기</button>
  </div> 
</template>

<script>

export default {
  name: 'MeasurePage',
  data() {
    return {
      recordStatus : 0,
      recognizer : Object,
      classLabels : Array,
      scoreBySinger : Array,
      bestSingerByScore : '',
      current : '',
    }
  },
  methods: {
    init: async function () {
        //record 상태 변경 (준비 -> 측정 중지)
        this.recordStatus = 1;

        this.recognizer = await this.createModel();
        this.classLabels = this.recognizer.wordLabels(); // class label, 즉 가수 라벨을 받아옴 (ex. 임창정 = 1, 아이유 = 2)
        const labelContainer = document.getElementById("label-container");
        for (let i = 0; i < this.classLabels.length; i++) {
            labelContainer.appendChild(document.createElement("div"));
        }

        // 각 가수당 몇 점을 얻었는지 저장
        // 저장하는 이유 : 가수 별로 나온 점수들을 누적해놓고, 누적 점수가 가장 높은 가수를 결과 화면에 보여주기 위해서
        this.scoreBySinger = [];
        for (let i = 0; i < this.classLabels.length; i++) { // init arr
            this.scoreBySinger.push(0.0);
        }

        // listen() takes two arguments:
        // 1. A callback function that is invoked anytime a word is recognized. // 단어가 인식 될 때마다 호출
        // 2. A configuration object with adjustable fields
        this.recognizer.listen(result => {

            // render the probability scores per class
            for (let i = 0; i < this.classLabels.length; i++) {
                const classPrediction = this.classLabels[i] + ": " + result.scores[i].toFixed(2);
                this.scoreBySinger[i] += result.scores[i];
                labelContainer.childNodes[i].innerHTML = classPrediction; // 이번 Turn(1초)에 각 label들이 몇 점을 얻었는지 ex) 10cm: 0.06
            }
        }, {
            includeSpectrogram: true, // in case listen should return result.spectrogram
            probabilityThreshold: 0.75,
            invokeCallbackOnNoiseAndUnknown: true,
            overlapFactor: 0.50 // probably want between 0.5 and 0.75. More info in README
        });

        // Stop the recognition in 10 seconds.
        // 이건 내가 임의로 10초까지만 녹음하도록 해 놓은 거고, 요구사항처럼 최소 10초, 최대 1분까지로 정하면 될듯
        setTimeout(() => this.recognizer.stopListening(), 10000);
    },

    createModel: async function () {
      const URL = "https://teachablemachine.withgoogle.com/models/ZHjjyd5ts/";
      const checkpointURL = URL + "model.json"; // model topology
      const metadataURL = URL + "metadata.json"; // model metadata

      const recognizer = window.speechCommands.create(
          "BROWSER_FFT", // fourier transform type, not useful to change
          undefined, // speech commands vocabulary feature, not useful for your models
          checkpointURL,
          metadataURL);

      // check that model and metadata are loaded via HTTPS requests.
      await recognizer.ensureModelLoaded();

      return recognizer;
    },

    stop: function () {
        //record 상태 변경 (중지 -> 측정 결과 확인)
        this.recordStatus = 2;
        this.recognizer.stopListening();
        console.log("Stop Listening");
    },
    inference: function () {
      // 점수 배열 돌면서 가장 높은 점수를 받은 가수를 출력 -> 이 때 배경소음 제외
        let cmp = -1.0;
        for (let i = 0; i < this.classLabels.length; i++) {
            // console.log(i + " : " + classLabels[i]);
            if (this.classLabels[i] === '배경 소음') continue;
            if (cmp < this.scoreBySinger[i]) {
                this.bestSingerByScore = this.classLabels[i];
                cmp = this.scoreBySinger[i];
            }
        }

        console.log("Max Score : " + cmp);
        // 만약 최고점수가 0점이면, 다시 측정하라고 처리해주기 !!!!
        this.current = "최고점수 : " + this.bestSingerByScore;
        this.$emit("result", this.bestSingerByScore);
    },
  }
}

</script>

<style>
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');

* {
    font-family: 'Pretendard';  
}

button {
  margin-top : 0.5rem;
  padding : 5px 3rem 5px 3rem;
  background-color: #FF8A3D;
  color: white;
  border-radius: 15px;
  border: none;
  font-weight: 600;
}

button:active {
    transform: scale(0.98);
    /* Scaling button to 0.98 to its original size */
    box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
    /* Lowering the shadow */
}

.result-content {
  margin: 3rem;
}

</style>