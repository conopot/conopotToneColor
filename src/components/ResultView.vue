<template>
  <!-- 측정 결과 페이지 -->
  <div>
    <ResultPage :singerName="singerName"/>
  </div>
</template>

<script>
import ResultPage from './ResultPage.vue'

export default {
  data() {
    return {
      singerName : this.$route.params.singer,
    }
  },
  components: {
    ResultPage,
  },
}
</script>

<style>

</style>