<template>
  <div class="progress-bar" ref="progressBar" @click="progressClick">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper" ref="progressBtn"
        @touchstart.prevent="progressTouchStart"
        @touchmove.prevent="progressTouchMove"
        @touchend="progressTouchEnd"
      >
        <div class="progress-btn">
          <div class="progressBtn"></div>
          <div v-if='timeNum' class="currentTime">{{currentTime}}/{{duration}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { prefixStyle } from "@/common/js/dom";

const progressBtnWidth = 16;
const transform = prefixStyle("transform"); // eslint-disable-line

export default {
  props: {
    percent: {
      type: Number,
      default: 0
    },
    currentTime:{
      type: String,
      default: ''
    },
    currentTime:{
      type: String,
      default: ''
    },
    duration:{
      type: String,
      default: ''
    }
  },
  data(){
    return {
      timeNum:false
    }
  },
  created() {
    this.touch = {};
  },
  methods: {
    progressTouchStart(e) {
      this.touch.initiated = true;
      this.touch.startX = e.touches[0].pageX;
      this.touch.left = this.$refs.progress.clientWidth; // - progressBtnWidth / 2
    },
    progressTouchMove(e) {
      this.timeNum = true
      setTimeout(()=>{
        this.timeNum = false
      },4000)
      if (!this.touch.initiated) {
        return;
      }
      const deltaX = e.touches[0].pageX - this.touch.startX;
      const offsetWidth = Math.min(
        this.$refs.progressBar.clientWidth - progressBtnWidth,
        Math.max(0, this.touch.left + deltaX)
      );
      // console.log(e.touches[0].pageX, this.$refs.progressBar.clientWidth, progressBtnWidth, 0, this.touch.left + deltaX, this.$refs.progressBar.clientWidth - progressBtnWidth, offsetWidth)
      this._offset(offsetWidth);
    },
    progressTouchEnd() {
      this.touch.initiated = false;
      this._triggerPercent();
    },
    progressClick(e) {
      const rect = this.$refs.progressBar.getBoundingClientRect();
      const offsetWidth = e.pageX - rect.left;
      this._offset(offsetWidth);
      // 这里当我们点击 progressBtn 的时候，e.offsetX 获取不对
      // this._offset(e.offsetX)
      this._triggerPercent();
    },
    _triggerPercent() {
      const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth;
      const percent = this.$refs.progress.clientWidth / barWidth;
      this.$emit("percentChange", percent);
    },
    _offset(offsetWidth) {
      const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth;
      const percent = (offsetWidth / barWidth * 100).toFixed(2);
      this.$refs.progress.style.width = `${percent}%`;
      this.$refs.progressBtn.style.left = `${percent}%`;
    }
  },
  watch: {
    percent(newPercent) {
      if (newPercent >= 0 && !this.touch.initiated) {
        // const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
        // const offsetWidth = newPercent * barWidth
        // this._offset(offsetWidth)
        this.$refs.progress.style.width = `${newPercent}%`;
        this.$refs.progressBtn.style.left = `${newPercent}%`;
      }
    }
  }
};
</script>

<style scoped>
.progress-bar {
  height: 30px;
}
.progress-bar .bar-inner {
  position: relative;
  top: 13px;
  height: .06rem;
  background: rgba(0, 0, 0, 0.2);
}
.progress-bar .bar-inner .progress {
  position: absolute;
  height: 100%;
  left: 0;
  background: #458EE7;
}
.progress-bar .bar-inner .progress-btn-wrapper {
  position: absolute;
  transform: translate3d(-16px, 0, 0);
  left: 0;
  top: -13px;
  width: 30px;
  height: 30px;
}
.progress-bar .bar-inner .progress-btn-wrapper .progressBtn {
  position: relative;
  top: .08rem;
  left: 7px;
  box-sizing: border-box;
  width: .21rem;
  height: .42rem;
  /* border: 1px solid red; */
  border-radius: .3rem;
  background: #458EE7;
}
.progress-btn{
  position: relative;
}
.currentTime{
  position:absolute;
  top:-0.3rem;
  left:-0.2rem;
  color:#999;
}
</style>
