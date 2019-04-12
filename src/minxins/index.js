// 返回事件
export const onClickLeft = {
  methods: {
    onClickLeft () {
      this.$router.back()
    }
  }
}


export const Opacity = {
  data () {
    return {
      Opacity: 0
    }
  },
  methods: {
    show () {
      this.Opacity = 100
    }
  },
}