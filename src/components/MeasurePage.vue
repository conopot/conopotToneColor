<template>
  <div class="measure-text">
    <div v-if="recordStatus == 0">결과의 정확성을 위해</div>
    <div v-if="recordStatus == 0">녹음은 10초 이상 진행해주세요!</div>
    <div v-if="recordStatus == 1">측정 중입니다 ..</div>
    <div v-if="recordStatus == 2">결과보기 버튼을 눌러주세요!</div>
  </div>
  <canvas
      id="pitch-graph"
      aria-label="Recorded pitch graph"
      v-if="recordStatus == 1"
      >No pitches recorded
      </canvas>
  <div class="measure-title">
    <!-- <div id="label-container"></div> -->
    <!-- <p class="result-content">{{ current }}</p> -->
    <button v-if="recordStatus == 0" type="button" @click="init">녹음하기&nbsp;&nbsp;🎤</button>
    <button v-if="recordStatus == 1" type="button" @click="stop">중지</button>
    <button class="retry-button" v-if="recordStatus == 2" type="button" @click="retry">다시 측정하기</button>
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
      history: [],
      historyLength : 100,
      minClarityPercent : 95,
      minPitch : 60,
      maxPitch : 10000,
      overrideSampleRate : false,
      desiredSampleRate : 44100,
      sampleRate : null,
      inputBufferSize : 2048,
      canvas : Object,
      micStream : Object,
      analyserNode : Object,
      detector : Object,
      inputBuffer : Object,
      intervalHandle : Object,
    }
  },
  methods: {
    init: async function () {
        //record 상태 변경 (준비 -> 측정 중지)
        this.recordStatus = 1;

        this.recognizer = await this.createModel();
        this.classLabels = this.recognizer.wordLabels(); // class label, 즉 가수 라벨을 받아옴 (ex. 임창정 = 1, 아이유 = 2)

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
                this.scoreBySinger[i] += result.scores[i];
            }
        }, {
            includeSpectrogram: true, // in case listen should return result.spectrogram
            probabilityThreshold: 0.75,
            invokeCallbackOnNoiseAndUnknown: true,
            overlapFactor: 0.50 // probably want between 0.5 and 0.75. More info in README
        });

      
      this.canvas = document.getElementById("pitch-graph");

      this.setUpdatePitchInterval(50);

      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        this.micStream = stream;
        this.resetAudioContext();
      });


      // Stop the recognition in 10 seconds.
      // 이건 내가 임의로 10초까지만 녹음하도록 해 놓은 거고, 요구사항처럼 최소 10초, 최대 1분까지로 정하면 될듯
      // setTimeout(() => this.recognizer.stopListening(), 60000);
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

    retry: function() {
      this.init();
    },

    drawGraph: function() {
        if (!this.canvas) return;
        this.canvas.style.color = "white";

        const [w, h] = [this.canvas.width, this.canvas.height];
        const ctx = this.canvas.getContext("2d");
        if (!ctx) return;

        ctx.clearRect(0, 0, w, h);

        const matchesConditions = ([pitch, clarity]) =>
          pitch >= this.minPitch &&
          pitch <= this.maxPitch &&
          100 * clarity >= this.minClarityPercent;
        const filteredHistory = this.history.filter(matchesConditions);
        if (filteredHistory.length == 0) {
          this.canvas.innerText = "No pitches recorded";
          return;
        }

        const headingHeight = 100;
        const labelWidth = 100;
        const yPadding = 20;

        let [lastPitch, lastClarityPercent] =
          filteredHistory[filteredHistory.length - 1];
        lastPitch = Math.round(lastPitch * 10) / 10;
        lastClarityPercent = Math.round(lastClarityPercent * 1000) / 10;

        this.canvas.innerText = `Last pitch: ${lastPitch.toFixed(
          1
        )} Hz at ${lastClarityPercent.toFixed(1)}% clarity`;

        const filteredPitches = filteredHistory.map(([pitch]) => pitch);
        const logMin = Math.log2(Math.min(...filteredPitches));
        const logMax = Math.log2(Math.max(...filteredPitches));
        const xOffset =
          ((w - labelWidth) * (this.historyLength - this.history.length)) / this.historyLength;
        const x = (i) => xOffset + ((w - labelWidth) * i) / (this.historyLength - 1);
        const y = (v) =>
          headingHeight +
          yPadding +
          (h - headingHeight - 2 * yPadding) *
            (1 - (Math.log2(v) - logMin) / (logMax - logMin));

        ctx.font = "14px system-ui, -apple-system";
        ctx.fillStyle = "#FFFFFF";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(
          `${lastPitch.toFixed(1)} Hz (${lastClarityPercent.toFixed(1)}%)`,
          w / 2,
          headingHeight / 2,
          w
        );

        ctx.lineWidth = 1;
        ctx.strokeStyle = "#FF8A3D";
        ctx.beginPath();
        for (let i = 0; i < this.history.length; i++) {
          if (
            i > 0 &&
            matchesConditions(this.history[i - 1]) &&
            matchesConditions(this.history[i])
          ) {
            ctx.lineTo(x(i), y(this.history[i][0]));
          } else {
            ctx.moveTo(x(i), y(this.history[i][0]));
          }
        }
        ctx.stroke();

        ctx.font = "14px system-ui, -apple-system";
        ctx.fillStyle = "#FFFFFF";
        ctx.strokeStyle = "#FFFFFF";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.beginPath();
        ctx.moveTo(0, y(lastPitch));
        ctx.lineTo(w - labelWidth, y(lastPitch));
        ctx.stroke();
        ctx.fillText(
          `${lastPitch.toFixed(1)} Hz`,
          w - labelWidth,
          y(lastPitch),
          labelWidth
        );
      },

      updatePitch: function() {
        if (!this.analyserNode || !this.detector || !this.sampleRate || !this.inputBuffer) return;

        this.analyserNode.getFloatTimeDomainData(this.inputBuffer);
        this.history.push(this.detector.findPitch(this.inputBuffer, this.sampleRate));
        if (this.history.length > this.historyLength) {
          this.history.shift();
        }
      },

      setUpdatePitchInterval: function(interval) {
        if (this.intervalHandle !== undefined) {
          clearInterval(this.intervalHandle);
        }
        this.intervalHandle = setInterval(() => {
          this.updatePitch();
          this.drawGraph();
        }, interval);
      },

      resetAudioContext: async function() {
        const { PitchDetector } = await import ("pitchy");
        this.sampleRate = this.analyserNode = this.inputBuffer = null;

        const audioContextOptions = {};
        if (this.overrideSampleRate) {
          audioContextOptions.sampleRate = this.desiredSampleRate;
        }
        const audioContext = new AudioContext(audioContextOptions);
        this.sampleRate = audioContext.sampleRate;

        this.analyserNode = new AnalyserNode(audioContext, {
          fftSize: this.inputBufferSize,
        });
        audioContext.createMediaStreamSource(this.micStream).connect(this.analyserNode);
        this.detector = PitchDetector.forFloat32Array(this.analyserNode.fftSize);
        this.inputBuffer = new Float32Array(this.detector.inputLength);
      }
  },
}


</script>

<style>
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');

* {
    font-family: 'Pretendard';  
}


button {
  margin : 1rem;
  padding : 10px 2rem 10px 2rem;
  background-color: #FF8A3D;
  color: white;
  border-radius: 10px;
  border: none;
  font-weight: 600;
}

.retry-button {
  margin : 1rem;
  padding : 10px 1rem 10px 1rem;
  background-color: #001253;
  color: white;
  border-radius: 10px;
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

canvas {
  margin-top: 1rem;
  align-content: center;
  border: 0.5px solid #FFD6A9;
  color: white;
}

.row {
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;

  margin-top: 0.5rem;
  width: 100%;
}

.measure-text {
  font-size: 0.9em;
}
</style>