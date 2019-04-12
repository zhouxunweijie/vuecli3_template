<template>
  <div ref="wrapper" class="wrapper">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  mounted() {
    this.$nextTick(() => {
      new BScroll(this.$refs.wrapper)
    })
  }
 }
</script>

<style lang="less" scoped>
.wrapper{
  height: 100%
}
</style>
