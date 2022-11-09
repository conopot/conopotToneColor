<template>
  <!-- 웰컴 페이지 -->
  <div v-if="step == 0">
    <WelcomePage :step="step" v-on:result="showResult"/>
  </div>  
  <!-- 측정 결과 페이지 -->
  <div v-if="step == 1">
    <ResultPage :singerName="singerName"/>
  </div>
</template>

<script>
import WelcomePage from './WelcomePage.vue'
import ResultPage from './ResultPage.vue'

export default {
  data() {
    return {
      singerName : '',
      step : 0,
    }
  },
  components: {
    WelcomePage,
    ResultPage,
  },
  methods: {
    showResult(name){
       this.$router.push(`/${name}`);
     },
  }
}
</script>

<style>

</style>