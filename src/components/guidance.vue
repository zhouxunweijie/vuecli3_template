<template>
  <div class="guidance">
    <Swipe @change="onChange" :loop='false'>
      <SwipeItem v-for="(el, index) in images" :key="index">
        <img :src="el">
        <span round type="danger" class="button" @click="open" v-if="index === images.length - 1">点击进入</span>
      </SwipeItem>
      <div class="custom-indicator" slot="indicator">
        {{ current + 1 }}/4
      </div>
    </Swipe>
  </div>
</template>

<script>
// 引导页
import { Swipe, SwipeItem, Button} from 'vant'
export default {
  name: 'guidance',
  components: {
    Swipe,
    SwipeItem,
    Button
  },
  data() { 
    return {
      current: 0,
      images: [
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553845620896&di=fa82b21abf9b3583698972720f1709e6&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F8075391e8f2b1031b5e51fa6695a4072b179e9911b2dc-eCCSmP_fw658',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553845621550&di=19c96ba6256b722c8807fe3aba3beb52&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01836556e369c66ac72531cb80e3e9.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553845621549&di=ce8498a53b250d04328df64c0f60f752&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01d2e9596af87aa8012193a321e48d.jpg%401280w_1l_2o_100sh.png',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553845621550&di=70c789d958b2ef195be650cea059db60&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01725755420aed0000019ae92d9ae0.jpg%401280w_1l_2o_100sh.png'
      ]
    }
  },
  methods: {
    onChange(index) {
      this.current = index;
    },
    open () {
      this.$emit('click')
    }
  }
 }
</script>

<style lang='less'>
.guidance{
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  z-index: 999;
}
.guidance .van-swipe{
  height: 100%;
  cursor: pointer;
}
.guidance .custom-indicator {
  position: absolute;
  right: 20px;
  bottom: 20px;
  padding: 5px 15px;
  font-size: 24px;
  color: #fff;
  background: rgba(0, 0, 0, 0.1);
}
.van-swipe-item img{
  width: 100%;
  height: 100%
}
.guidance .button{
  position: absolute;
  width: 518px;
  height: 80px;
  line-height: 80px;
  top: 80%;
  transform: translate(-50%, 50%);
  left: 50%;
  background-color: #75c7c3;
  color: #ddffff;
  font-size: 32px;
  border-radius: 10em;
  text-align: center;
  letter-spacing: .1rem
}
</style>