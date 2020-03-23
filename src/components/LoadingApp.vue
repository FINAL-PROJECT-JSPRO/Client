<template>
  <div class="sp-loader">
    <img class="animated infinite pulse delay-2s" src="../assets/images/logo-black.svg" />
  </div>
</template>

<script>
export default {
  name: 'LoadingApp'
}
</script>

<style lang="scss" scoped>
.sp-loader {
    position: fixed;
    z-index: 2000;
    height: 100%;
    overflow-y: hidden;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: #fff;
    img {
      max-width: 100%;
      position: relative;
      top: 40%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 150px;
      height: 150px;
      margin-left: -40px;
      padding: 8px;
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
