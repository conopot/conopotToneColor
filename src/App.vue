<template>
  <div class="header">
    <img src="./assets/logo.png" class="logo" />
  </div>
  <router-view />

  <!-- <ContainerView/> -->
 
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>

body {
  margin: 0;
  background-color: #082032;
}
ul {
  padding: 5px;
  list-style-type: none;
}
.logo {
  height: 50%;
  margin: auto;
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 10px;
}
.header {
  width: 100%;
  height: 40px;
  background-color: #082032;
  padding-bottom: 8px;
  position: sticky;
  top: 0;
  z-index: 100;
}

#app {
  box-sizing: border-box;
  font-family: "consolas";
  margin-top: 60px;
  width: 100%;
  max-width: 460px;
  margin: auto;
  position: relative;
}
</style>
