<template>
    <div class="list">
        <div class="header">
					教学百篇案例第一期
				</div>
				<yd-tab >
					<yd-tab-panel label="小学">
						<div class="listItem" >
							<div class="listItem_top">
								<span class="index">01</span>
								<div class="list_all">
									<span class="title">《江畔独步寻花》</span><span class="desc">教学计及评析教学计及评析教学计及评析教学计及评析</span>
								</div>
								<span class="lock"></span>
							</div>
							<div class="listItem_bottom">
								<div>
									<span class="arrow">7488</span>
									<span class="time">12:00</span>
								</div>
								<span class="btn">试听课</span>
							</div>
						</div>
					</yd-tab-panel>
					<yd-tab-panel label="初中">
					</yd-tab-panel>
					<yd-tab-panel label="高中">
					</yd-tab-panel>
				</yd-tab>
				<yd-tabbar :fixed='true' class="yd-tabbar">
					<div class="navbar_bottom">邀请好友解锁全部课程</div>
				</yd-tabbar>
    </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style scoped lang="scss">
.list {
  .header {
    background: #f4f9ff;
    margin: 0.4rem auto;
    width: 90%;
    height: 3.72rem;
    line-height: 3.72rem;
    font-size: 0.36rem;
    font-weight: 700;
    text-align: center;
    box-shadow: #ddd 0px 0px 10px;
  }
  .listItem {
    margin: 0.2rem auto;
    width: 90%;
    border-bottom: 1px solid #eee;
    padding: 0.3rem 0;
    .listItem_top {
			position: relative;
      font-size: 0.32rem;
      color: #494f56;
      margin-bottom: 0.2rem;
			padding-right: .5rem;
			line-height: .5rem;
			.list_all{
				margin-left: .5rem;
			}
			.desc{
				margin-right: .5rem;
				word-break: break-all;
				text-align: justify;
			}
			.title{
				margin-right: .15rem;
			}
			.index{
				position:absolute;
				top:0rem;
				left:0;
			}
			.lock{
				margin-left: .2rem;
				position:absolute;
				top:.06rem;
				right:0;
				width: .24rem;
				height: .28rem;
				background: url(../../../static/img/lock.png) center center no-repeat;
        background-size: 100% 100%;
			}
    }
    .listItem_bottom {
			display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.28rem;
      color: #999;
      margin-left: 0.7rem;
      span {
        display: inline-block;
      }
      .arrow {
        background: url(../../../static/img/arrow.png) left center no-repeat;
        background-size: 0.14rem 0.16rem;
        padding-left: 0.3rem;
      }
			.time {
				margin-left: .3rem;
        background: url(../../../static/img/time.png) left center no-repeat;
        background-size: .22rem .22rem;
        padding-left: 0.4rem;
      }
			.btn{
				width: 1.4rem;
				height:.5rem;
				line-height: .5rem;
				background: #5EA6FF;
				color: #fff;
				text-align: center;
				border-radius: .1rem;
			}
    }
  }
  .navbar_bottom {
    margin: 0.07rem auto;
    width: 90%;
    height: 0.88rem;
    line-height: 0.88rem;
    text-align: center;
    font-size: 0.36rem;
    border-radius: 0.14rem;
    color: #fff;
    background: #ff8d31;
  }
}
</style>
<style>
.yd-tabbar {
  box-shadow: #ccc 0px 0px 10px;
}
.yd-tab-box {
  border-bottom: 1px solid #eee !important;
  position: relative;
  padding-top: 0.2rem;
}
.yd-tab-box::before {
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  background-color: #f8f8f8;
  height: 0.15rem;
  content: "";
}
</style>


