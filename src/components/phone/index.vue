<template>
    <div class="phone">
			<div class="header">

			</div>
			<yd-cell-group>
        <yd-cell-item>
            <span slot="left">用户名：</span>
            <yd-input slot="right" required v-model="input1" max="20" placeholder="请输入用户名"></yd-input>
        </yd-cell-item>
        <yd-cell-item class="psw">
            <span slot="left">验证码：</span>
            <input type="text" slot="right" placeholder="请输入验证码">
            <yd-sendcode slot="right" 
                         v-model="start" 
                         @click.native="sendCode" 
                         type="warning"
            ></yd-sendcode>
        </yd-cell-item>
    </yd-cell-group>
		</div>
</template>
<script>
export default {
  data() {
    return {
      start: false
    };
  },
  methods: {
    sendCode() {
      this.$dialog.loading.open("发送中...");
      setTimeout(() => {
        this.start1 = true;
        this.$dialog.loading.close();

        this.$dialog.toast({
          mes: "已发送",
          icon: "success",
          timeout: 1500
        });
      }, 1000);
    }
  }
};
</script>
<style lang='scss' scoped>
.phone {
  padding-top: 0.4rem;
  .header {
    width: 90%;
    height: 2.08rem;
    margin: 0 auto;
    background: #f4f9ff;
  }
}
</style>
<style>
.yd-cell {
  margin-top: 0.4rem;
}
.yd-cell-item {
  border-top: 1px solid #eee;
  padding: 0 0.4rem;
}
.psw {
  border-bottom: 1px solid #eee;
}
</style>

