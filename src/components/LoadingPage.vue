<template>
  <div class="loader">
    <img class="animated infinite pulse delay-2s" src="../assets/images/logo-white.svg"/>
  </div>
</template>

<script>
export default {
  name: 'LoadingPage'
}
</script>

<style lang="scss" scoped>
.loader {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  overflow-y: hidden;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: 0.7;
  background: #ccc;
  img {
      max-width: 100%;
      position: relative;
      transform: translate(-50%, -50%);
      width: 80px;
      height: 80px;
      margin-left: -40px;
      padding: 8px;
      filter: brightness(0.1);
      -webkit-border-radius: 10px;
      -moz-border-radius: 10px;
      -ms-border-radius: 10px;
      -o-border-radius: 10px;
      border-radius: 10px;
      -webkit-box-sizing: content-box;
      -moz-box-sizing: content-box;
      box-sizing: content-box;
    }
  }
</style>
