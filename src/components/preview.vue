<template>
  <div class="preview">
    <vue-preview :slides="list" @close="handleClose"></vue-preview>
  </div>
</template>

<script>
import Vue from 'vue'

import VuePreview from 'vue-preview'
// defalut install
Vue.use(VuePreview, {
  fullscreenEl: false, // 关闭全屏
  shareEl: false, // 关闭分享
  zoomEl: false, // 关闭放大按钮
  tapToClose: true, // 轻敲滑块关闭
  showHideOpacity: true, // 启用变焦+淡出过渡
})

export default {
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handleClose () {
      console.log('close event')
      this.$emit('close')
    }
  }
}
</script>

<style lang='less'>
.preview{
  overflow-x: hidden;
  overflow-y: hidden;
}
.van-col--8{
  text-align: center
}
.pswp__top-bar{
  height: 52px !important;
  padding: 10px 0 !important
}
.pswp__button{
  margin-right: 10px !important
}
.pswp__button--fs{
  background: url('../assets/images/quanping.png') no-repeat !important;
  background-size: 80% 80% !important
}
.pswp__button--share{
  background: url('../assets/images/fenxiang.png') no-repeat !important;
  background-size: 80% 80% !important
}
.pswp__button--close{
  background: url('../assets/images/guanbi.png') no-repeat !important;
  background-size: 80% 80% !important
}
.pswp__counter{
  top: 10px !important;
  height: 44px !important;
  line-height: 34px !important;
  font-size: 28px !important
}
.pswp__button, .pswp__button--arrow--left:before, .pswp__button--arrow--right:before{
  width: 44px !important;
  height: 44px !important;
}

.pswp__caption{
  min-height: 44px !important
}
.pswp__caption__center {
    max-width: 100% !important;
    font-size: 24px !important;
    padding: 10px !important;
    line-height: 30px !important;
}
.pswp__share-tooltip {
  font-size: 24px;
    top: 56px !important;
    border-radius: 2px !important;
    right: 1.05rem !important;
    -webkit-box-shadow: 0 2px 5px rgba(0,0,0,.25) !important;
    box-shadow: 0 2px 5px rgba(0,0,0,.25) !important;
    -webkit-transform: translateY(6px) !important;
    -ms-transform: translateY(6px) !important;
    transform: translateY(6px) !important;
}
.pswp--touch .pswp__share-tooltip a {
    padding: 16px 12px !important;
}
.pswp__share-tooltip a:first-child{
      border-radius: 2px 2px 0 0 !important;
}
a.pswp__share--facebook:before {
    top: -12px !important;
    right: 15px !important;
    border: 6px solid transparent !important;
}
.pswp__share-tooltip a {
    padding: 8px 12px !important;
    font-size: 24px !important;
    line-height: 30px !important;
}
figure{
  display: inline-block !important
}
</style>