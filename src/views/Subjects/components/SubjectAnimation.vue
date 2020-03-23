<template>
  <div>
    <div class="container-custom">
      <div class="box">
        <div class="title">
          <span class="block"></span>
          <h1>
            {{subject.name.split(' ')[0]}}
            <span></span>
          </h1>
        </div>

        <div class="role">
          <div class="block"></div>
          <p>JS Pro</p>
        </div>
        <div>
          <h4 class="wordCarousel">
            <p class>You'll learn:</p>
              <div>
                <ul class="flip4">
                    <li
                      v-for="chapter in subject.Chapters"
                      :key="chapter.id"
                    >
                      <ListChaptersAnimation :title="chapter.title"/>
                    </li>
                </ul>
              </div>
          </h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ListChaptersAnimation from './ListChaptersAnimation'

export default {
  components: {
    ListChaptersAnimation
  },
  props: {
    subject: Object,
    status: String
  }
}
</script>

<style lang="scss" scoped>

@import url("https://fonts.googleapis.com/css?family=Lato:300,400|Poppins:300,400,800&display=swap");

.container-custom {
  width: 100%;
  background: #232323;

  display: flex;
  justify-content: center;
  align-items: center;

  .box {
    width: 250px;
    height: 250px;
    position: relative;
    display: flex;
    justify-content: center;
    flex-direction: column;

    .title {
      width: 100%;
      position: relative;
      display: flex;
      align-items: center;
      height: 50px;

      .block {
        width: 0%;
        height: inherit;
        background: #00CB54;
        position: absolute;
        animation: mainBlock 2s cubic-bezier(0.74, 0.06, 0.4, 0.92) forwards;
        display: flex;
      }

      h1 {
        font-family: "Poppins";
        color: #fff;
        font-size: 32px;
        -webkit-animation: mainFadeIn 2s forwards;
        -o-animation: mainFadeIn 2s forwards;
        animation: mainFadeIn 2s forwards;
        animation-delay: 1.6s;
        opacity: 0;
        display: flex;
        align-items: baseline;
        position: relative;

        span {
          width: 0px;
          height: 0px;
          -webkit-border-radius: 50%;
          -moz-border-radius: 50%;
          border-radius: 50%;

          background: #00CB54;
          -webkit-animation: load 0.6s cubic-bezier(0.74, 0.06, 0.4, 0.92)
            forwards;
          animation: popIn 0.8s cubic-bezier(0.74, 0.06, 0.4, 0.92) forwards;
          animation-delay: 2s;
          margin-left: 5px;
          margin-top: -10px;
          position: absolute;
          bottom: 13px;
          right: -12px;
        }
      }
    }

    .role {
      width: 100%;
      position: relative;
      display: flex;
      align-items: center;
      height: 30px;
      margin-top: -10px;

      .block {
        width: 0%;
        height: inherit;
        background: #fff200;
        position: absolute;
        animation: secBlock 2s cubic-bezier(0.74, 0.06, 0.4, 0.92) forwards;
        animation-delay: 2s;
        display: flex;
      }

      p {
        animation: secFadeIn 2s forwards;
        animation-delay: 3.2s;
        opacity: 0;
        font-weight: 400;
        font-family: "Lato";
        color: #ffffff;
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 5px;
      }
    }
  }
}

@keyframes mainBlock {
  0% {
    width: 0%;
    left: 0;
  }
  50% {
    width: 100%;
    left: 0;
  }
  100% {
    width: 0;
    left: 100%;
  }
}

@keyframes secBlock {
  0% {
    width: 0%;
    left: 0;
  }
  50% {
    width: 100%;
    left: 0;
  }
  100% {
    width: 0;
    left: 100%;
  }
}

@keyframes mainFadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes popIn {
  0% {
    width: 0px;
    height: 0px;
    background: #e9d856;
    border: 0px solid #ddd;
    opacity: 0;
  }
  50% {
    width: 10px;
    height: 10px;
    background: #e9d856;
    opacity: 1;
    bottom: 45px;
  }
  65% {
    width: 7px;
    height: 7px;
    bottom: 0px;
    width: 15px;
  }
  80% {
    width: 10px;
    height: 10px;
    bottom: 20px;
  }
  100% {
    width: 7px;
    height: 7px;
    background: #e9d856;
    border: 0px solid #222;
    bottom: 13px;
  }
}

@keyframes secFadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 0.5;
  }
}

.wordCarousel {
    font-weight: 400;
    font-family: "Lato";
    color: #ffffff;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 5px;
    opacity: 0.5;
    div {
      text-align: left;
      overflow: hidden;
      position: relative;
      height: 65px;
      padding-top: 10px;
      margin-top: -10px;
        li {
          color: #ccc;
          font-weight: 700;
          padding: 0;
          height: 45px;
          margin-bottom: 45px;
          display: block;
        }
    }
    p {
    font-weight: 400;
    font-family: "Lato";
    color: #ffffff;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 5px;
    opacity: 0.5;
    margin-bottom: 0;
    }
}
.flip4{
  padding-left: 0;
}

.flip4 { animation: flip4 10s cubic-bezier(0.23, 1, 0.32, 1.2) infinite; }

@keyframes flip4 {
    0% { margin-top: -360px; }
    5% { margin-top: -270px; }
    25% { margin-top: -270px; }
    30% { margin-top: -180px; }
    50% { margin-top: -180px; }
    55% { margin-top: -90px; }
    75% { margin-top: -90px; }
    80% { margin-top: 0px; }
    99.99% { margin-top: 0px; }
    100% { margin-top: -270px; }
}
</style>
