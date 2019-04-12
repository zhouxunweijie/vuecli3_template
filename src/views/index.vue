<template>
  <div class="content">
    <div class="tabbar_content">

      <transition>
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
      </transition>
      <transition>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </transition>
    </div>

    <Tabbar v-model="active">
      <TabbarItem icon="home-o" to="/home">主页</TabbarItem>
      <TabbarItem icon="search" dot to="/store">商城</TabbarItem>
      <TabbarItem icon="friends-o" info="5" to="/forum">论坛</TabbarItem>
      <TabbarItem icon="setting-o" info="20" to="/user">个人中心</TabbarItem>
    </Tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant'

export default {
  name: '',
  components: {
    Tabbar,
    TabbarItem
  },
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style lang='less' scoped>
.tabbar_content{
  height: calc(100% - 1.33333rem);
  position: relative;
  top: 0;
  left: 0;
  background-image: url('../assets/svg-loaders/bars.svg');
  background-repeat:  no-repeat;
  background-position: center;
  background-size: .86rem;
}
</style>
