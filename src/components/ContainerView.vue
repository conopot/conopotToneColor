<template>
  <!-- 웰컴 페이지 -->
  <div v-if="step == 0">
    <WelcomePage :step="step" :singers="singers" v-on:result="showResult"/>
  </div>  
  <!-- 측정 결과 페이지 -->
  <div v-if="step == 1">
    <ResultPage/>
  </div>
</template>

<script>
import WelcomePage from './WelcomePage.vue'
import ResultPage from './ResultPage.vue'
import singerData from '../assets/singerdata.js'
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      singers : singerData,
      step : 0,
    }
  },
  components: {
    WelcomePage,
    ResultPage,
  },
  methods: {
    ...mapMutations(['setMore']),
    showResult(){
       this.step = 1;
     },
  }
}
</script>

<style>
.guestHeader {
  padding-left: 20px;
  margin: 10px 10px 10px 10px;
}
.guest-total{
  position:relative; 
  padding-top: 10px;
  margin: 15px 20px 15px 20px;
  color: #000; 
  border-radius: 10px; 
  background-color: #E6E6E6;
}
.guest-comment{
  background-color: #FFF;
  padding: 30px 0px 30px 0px;
}

.guest-box h5 {
  margin: 0px 0px 4px 10px;
}
.input-box{
  font-size: 15px;
  border: 0;
  outline: none;
  padding-left: 10px;
}
.guest-input{
  position:relative; 
  margin: 15px 20px 15px 20px;
  padding: 0px 10px 10px 0px;
  color: #000; 
  border-radius: 10px; 
}

.upload-image{
width: 100%;
height: 450px;
background: cornflowerblue;
background-size : cover;
}
.filters{
overflow-x:scroll;
white-space: nowrap;
}
.filter-1 {
width: 100px;
height: 100px;
background-color: cornflowerblue;
margin: 10px 10px 10px auto;
padding: 8px;
display: inline-block;
color : white;
background-size: cover;
}
.filters::-webkit-scrollbar {
height: 5px;
}
.filters::-webkit-scrollbar-track {
background: #f1f1f1; 
}
.filters::-webkit-scrollbar-thumb {
background: #888; 
border-radius: 5px;
}
.filters::-webkit-scrollbar-thumb:hover {
background: #555; 
}
.write-box {
border: none;
width: 90%;
height: 100px;
padding: 15px;
margin: auto;
display: block;
outline: none;
}
.guest-box {
  padding: 15px;
  margin: auto;
}
</style>