import jsonp from 'jsonp'
import qs from 'qs'
var ua = window.navigator.userAgent.toLowerCase();
// // 定义分享的函数
 export default  function shareOnWx () {
     if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    let data = {
      url: window.location.href.split('#')[0],
    }
    jsonp('https://pay.yunshuxie.com/v1/h5_share/query/signature_jsonp.htm?'+qs.stringify(data), null, (err, res) => {
      if (err) {
        alert('网络错误！')
      } else {
        if (res.returnCode === '0') {
          wx.config({
              debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: 'wx1c5b5da7759ea0f4',
              timestamp: res.data.timestamp, // 必填，生成签名的时间戳
              nonceStr: res.data.noncestr, // 必填，生成签名的随机串
              signature: res.data.sign, // 必填，签名，见附录1
              jsApiList: ['chooseWXPay','onMenuShareAppMessage','translateVoice','showAllNonBaseMenuItem', 'onMenuShareTimeline', 'chooseImage', 'uploadImage', 'startRecord', 'stopRecord', 'onVoiceRecordEnd', 'playVoice', 'onVoicePlayEnd', 'pauseVoice', 'stopVoice', 'uploadVoice', 'downloadVoice','previewImage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
             wx.ready(function(){
              // 定义初始诵读的分享文案
              var title = "云舒写|每日一段写作素材课";
              var desc = '每天5分钟，听北大硕博士老师讲作文素材，一听就会的写作素材课，专注解决孩子素材积累和运用难题…………'
              var links = 'https://pay.yunshuxie.com/su/m1.htm?k=xzsc'
              // var links = 'https://pay.yunshuxie.com/su/m1.htm?k=xzsc'
              var imgUrl = 'https://oss-ysx-pic.yunshuxie.com/activity/2018/shareicon/share-mryd.png?x-oss-process=image/resize,h_120'
               //分享给微信好友
              wx.onMenuShareAppMessage({
                title: title, // 分享标题
                desc: desc, // 分享描述
                link: links, // 分享链接
                imgUrl: imgUrl, // 分享图标
                success: function(res) {
                   // Toast.succeed('分享成功')
                },
                cancel: function(res) {},
                fail: function(res) {
                  
                }
              });
              // 2.1 监听“分享到朋友圈”，按钮点击、自定义分享内容及分享结果接口
              wx.onMenuShareTimeline({
                title: title, // 分享标题
                desc: desc, // 分享描述
                link: links, // 分享链接
                imgUrl: imgUrl, // 分享图标
                success: function(res) {
                  
                },
                cancel: function(res) {},
                fail: function(res) {
                  
                }
              });
            });
        } else {
          alert(res.returnMsg)
        }
      }
    })
  }
  }