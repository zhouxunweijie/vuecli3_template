<template>
  <div class="content_group content_group_fixed" id="home">
    <NavBar fixed left-arrow @click-left="onClickLeft" title="汉字测试"></NavBar>
    <List :getData="getData" :defaultFromData="defaultFromData">
      <template slot-scope="props">
        <Cell v-for="(el, index) in props.data" :key="index" @click="itemClick(el)">{{`当前的名称为： ${el.name}, 年龄为${el.age}`}}</Cell>
      </template>
    </List>
  </div>
</template>

<script>
import { NavBar, Button, Cell} from 'vant'
import { onClickLeft } from '@/minxins'
import List from '@/components/List'
import { getData } from '@/axios/api/common'

export default {
  name: '',
  mixins: [onClickLeft],
  components: {
    NavBar,
    Button,
    Cell,
    List
  },
  data() {
    return {
      getData
    }
  },
  methods: {
    itemClick (el) {
      console.log(el.name)
    }
  }
}
</script>

<style lang='less'>
.title {
  font-size: 36px;
  text-align: center;
  color: #000;
}
.title1 {
  width: 150px;
}

#home .van-list{
  min-height: calc(100vh - 1.22667rem - 1.33333rem)
}
</style>