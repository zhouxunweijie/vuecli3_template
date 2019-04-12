<template>
  <div id="app" class="content" v-cloak>
    <!-- 引导页 -->
    <guidance v-show="$store.state.common.isGuidance" @click="open"/>

    <router-view/>
  </div>
</template>

<script>
import guidance from '@/components/guidance'
export default {
  components: {
    guidance
  },
  methods: {
    open () {
      this.$store.state.common.isGuidance = false
    }
  }
}
</script>

<style lang="less">
[v-cloak] {
    display: none;
}

#app {
  color: @black;
}

// 进度条
.van-progress{
  position: fixed;
  z-index: 10;
  width: 100%
}
</style>
