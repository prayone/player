<template>
    <div class="study">
			<div class="header">
				<div class="title">《江畔独步寻花》<span class="desc">教学设计及评析</span></div>
				<div class="author">林长山</div>
				<div class="img"><img src="../../../static/img/img.png" alt=""></div>
				<div class="player-progress">
					<progress-bar :percent="percent" @percentChange="onProgressBarChange" :duration="format(currentSong.duration)" :currentTime="format(currentSong.currentTime)"></progress-bar>
					<div class="audio-time">
						<div class="current-time" v-html="format(currentSong.currentTime)">00:00</div>
						<div class="total-time" v-html="format(currentSong.duration)">12:32</div>
					</div>
				</div>
				<div class="player-controls">
					<div class="controls-box">
						<i class="studyList" @click="prev"></i>
						<i class="iconfont icon-play-prev" @click="prev"></i>
						<i :class="[!playing ? 'iconfont icon-play-on' : 'iconfont icon-play-pause']"  @click="play"></i>
						<i class="iconfont icon-play-next" @click="next"></i>
						<i class="inviteFrend" @click="prev"></i>
					</div>
				</div>
			</div>
		</div>
</template>
<script>
import ProgressBar from "../../base/progress-bar/progress-bar.vue";
export default {
  components: {
    ProgressBar
  },
  data() {
    return {
			index:0,
			percent: 0,
			playing:false,
      playlist: [],
      currentSong: {
        duration: 0,
        currentTime: 0
      }
    };
  },
  created() {
    this.playlist = [
      {
        fileId: "67694",
        img:
          "https://oss-ysx-pic.yunshuxie.com/course/2018/05/21/10/1526871135161243086.jpg",
        url:
          "https://oss-ysx-pic.yunshuxie.com/course/2018/05/21/10/1526871136431gpgc1d.mp3"
      },
      {
        fileId: "67695",
        img:
          "https://oss-ysx-pic.yunshuxie.com/course/2018/05/21/10/1526871135445v274ec.jpg",
        url:
          "https://oss-ysx-pic.yunshuxie.com/course/2018/05/21/10/1526871136786m2om3p.mp3"
      },
      {
        fileId: "68292",
        img:
          "https://oss-ysx-pic.yunshuxie.com/course/2018/05/24/19/1527159653700dz8use.jpg",
        url:
          "https://oss-ysx-pic.yunshuxie.com/course/2018/05/24/19/1527159654294w6oxnf.mp3"
      },
      {
        fileId: "67697",
        img:
          "https://oss-ysx-pic.yunshuxie.com/course/2018/05/21/10/1526871136138qx29vs.jpg",
        url:
          "https://oss-ysx-pic.yunshuxie.com/course/2018/05/21/10/1526871145486onbza2.mp3"
      }
    ];
    this.currentAudioUrl = this.playlist[this.index].url;
    this.audioPlayer = new Audio();
    this.audioPlayer.ontimeupdate = () => {
      this.currentSong.currentTime = this.audioPlayer.currentTime;
      this.currentSong.duration = this.audioPlayer.duration;
      let percent = (
        this.audioPlayer.currentTime /
        this.audioPlayer.duration *
        100
      ).toFixed(2);
      this.percent = Number(percent);
    };
    this.audioPlayer.onended = () => {
      // this.playing = false;
      this.skip("next");
    };
  },
  watch: {
    percent() {
      return this.currentSong.currentTime / this.currentSong.duration;
    }
  },
  methods: {
    prev() {
      alert('prev')
      this.skip("prev");
    },
    next() {
      alert('next')
      this.skip("next");
    },
    togglePlaying() {
      if (!this.songReady) {
        return;
      }
      this.playing = !this.playing;
    },
    ready() {
      this.songReady = true;
      console.log("play");
    },
    play(index) {
      console.log('index=====',index);
      index = typeof index === "number" ? index : this.index;
      let src = this.playlist[index].url.replace(
        /^http(s)?:/,
        this.isAndroid() ? "http:" : "https:"
      );
      const oldSrc = this.audioPlayer.src;
      if (src === oldSrc) {
        if (this.audioPlayer.paused) {
          this.audioPlayer.play();
          this.playing = true;
        } else {
          this.audioPlayer.pause();
          this.playing = false;
        }
        return;
      }
      this.audioPlayer.src = src;
      this.audioPlayer.play();
      this.playing = true;
      this.index = index
    },
    skip(direction) {
      let index = 0;
      let listLength = this.playlist.length;
      if (direction === "prev") {
        index = this.index - 1;
        if (index < 0) {
          // 循环播放
          index = listLength - 1;
        }
      } else if (direction === "next") {
        index = this.index + 1;
        if (index >= listLength) {
          index = 0;
        }
      }
      this.skipTo(index);
    },
    skipTo(index) {
      if (this.audioPlayer.src) {
        this.playing = false;
      }
      // 进度条进度
      this.percent = 0;
      this.play(index);
    },
    onProgressBarChange(percent) {
      const currentTime = this.audioPlayer.duration * percent;
      this.audioPlayer.currentTime = currentTime;
      if (!this.playing) {
        this.togglePlaying();
      }
    },
    format(interval) {
      interval = interval | 0;
      const minute = (interval / 60) | 0;
      const second = this._pad(interval % 60);
      return `${minute}:${second}`;
    },
    _pad(num, n = 2) {
      let len = num.toString().length;
      while (len < n) {
        num = "0" + num;
        len++;
      }
      return num;
    },
    isAndroid() {
      let ua = window.navigator.userAgent;
      return /Android/i.test(ua);
    }
  }
};
</script>
<style scoped lang='scss'>
.header {
  padding: 0.4rem;
  .title {
    font-size: 0.36rem;
    font-weight: 700;
    text-align: center;
  }
  .author {
    text-align: center;
    font-size: 0.28rem;
    margin: 0.2rem 0;
  }
  .img {
    width: 2.8rem;
    height: 3.24rem;
    margin: 0 auto;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .player-progress {
		margin-top:.2rem;
    padding: 0 .2rem;
    height: .6rem;
    position: relative;
    .progress-bar {
      position: relative;
      top: 0;
      z-index: 2;
    }
  }
  .audio-time {
    position: absolute;
    top: 20px;
    left: 0;
    right: 0;
    padding: 5px 10px 0;
    z-index: 2;
    display: flex;
    justify-content: space-between;
    user-select: none;
    .current-time{
			font-size: 14px;
			color: #458EE7;
		}
    .total-time {
      font-size: 14px;
      color: #8c8c8c;
    }
  }
  .player-controls {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 90px;
  }

  .acts-btn {
    width: 110px;
    // flex: 0 0 110px;
    height: 100%;
  }
  .controls-box {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
		padding: 0 .2rem;
    .iconfont {
      font-size: 42px;
      color: #20c785;
			width: 1rem;
			height:1rem;
    }
		.icon-play-prev{
			background: url(../../../static/img/prev.png) center center no-repeat;
			background-size:.24rem .3rem; 
			margin-right: .4rem;
		}
		.icon-play-next{
			background: url(../../../static/img/next.png) center center no-repeat;
			background-size:.24rem .3rem; 
			margin-left: .4rem;

		}
    .icon-play-on{
			background: url(../../../static/img/play.png);
			background-size:100% 100%; 
		}
    .icon-play-pause {
      background: url(../../../static/img/pause.png);
			background-size:100% 100%; 
    }
		.studyList {
			width: .8rem;
			height: .7rem;
      background: url(../../../static/img/studyList.png);
			background-size:100% 100%; 
			margin-right: .2rem;
    }
		.inviteFrend {
			width: .81rem;
			height: .68rem;
      background: url(../../../static/img/inviteFrend.png);
			background-size:100% 100%; 
    }
  }
}
</style>


