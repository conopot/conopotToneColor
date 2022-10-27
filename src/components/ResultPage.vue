<template>
  <div class="result-page">
    <h1>측정 결과 페이지</h1>
    <div>{{ singerName }}</div>
  </div> 
</template>

<script>
export default {
  name: 'ResultPage',
  props: {
    singer : Object,
    singerName : String,
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

.result-page {
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