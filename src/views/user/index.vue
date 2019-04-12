<template>
  <div class="content_group preview_dome">
    <preview :list="slide1"></preview>
    
  </div>
</template>

<script>
import Vue from 'vue'
import { Row, Col, Button } from 'vant'
import preview from '@/components/preview'

export default {
  components: {
      Row,
      Col,
      preview,
      Button
  },
  data () {
    return {
      slide1: [
        {
          src: 'http://imgsrc.baidu.com/imgad/pic/item/94cad1c8a786c91721ee3424c33d70cf3bc75739.jpg',
          msrc: 'http://imgsrc.baidu.com/imgad/pic/item/94cad1c8a786c91721ee3424c33d70cf3bc75739.jpg',
          alt: 'picture1',
          title: 'Image Caption 1',
          w: 715,
          h: 695
        },
        {
          src: 'http://img.sccnn.com/bimg/337/7807.jpg',
          msrc: 'http://img.sccnn.com/bimg/337/7807.jpg',
          alt: 'picture2',
          title: 'Image Caption 2',
          w: 600,
          h: 413
        },
        {
          src: 'http://pic17.nipic.com/20111107/6724438_101551419158_2.jpg',
          msrc: 'http://pic17.nipic.com/20111107/6724438_101551419158_2.jpg',
          alt: 'picture2',
          title: 'Image Caption 2',
          w: 635,
          h: 868
        }
      ],
      width: 1200,
      height: 1200
    }
  },
  mounted () {
    this.getImg(this.slide1)
  },
  methods: {
    handleClose () {
      console.log('close event')
    },
    getImg (list) {
      var that = this
      list.forEach((element, index) => {
        let img = new Image()
        img.src = element.msrc
        img.onload = function () {
          that.slide1[index].w = img.width
          that.slide1[index].h = img.height
        } 
      });
    }
  }
}
</script>

<style lang='less'>
.rongqi{
  width: 190px !important;
  height: 190px !important;
}
.preview_dome figure{
  width: 190px !important;
  height: 190px !important;
  line-height: 190px !important;
  margin-right: 10px !important
}
.preview_dome figure img{
    margin: 0 auto;
    display: inline-block;
    width: 100%;
    height: 100%;
  
}
</style>