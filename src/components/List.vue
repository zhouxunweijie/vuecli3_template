<template>
  <div>
    <div ref="height" class="height"></div>
    <PullRefresh v-model="pullRefreshLoading" @refresh="onRefresh" :disabled='pullRefreshDisabled' :head-height="headHeight">
      <List
        ref="List"
        v-model="ListLoading"
        :finished="ListFinished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <slot :data="list"></slot>
      </List>
    </PullRefresh>
  </div>
</template>

<script>
import { List, Cell, PullRefresh} from 'vant'
export default {
  props: {
    getData: {
      type: Function
    },
    disabled: {
      type: Boolean,
      default: false
    },
    defaultFromData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      list: [], // 储存数据的容器
      pageSize: 10, // 分页请求个数
      pageNumber: 1, // 分页初始页数
      headHeight: 100, // 默认下拉刷新提示高度100，会自动获取refs.height的高度

      pullRefreshLoading: false, // 下拉刷新是否完成，设置为false代表数据刷新完成
      pullRefreshDisabled: false, // 下拉刷新是否禁用
      GetDataLoading: false, // 是否请求数据中

      ListLoading: false, // 上拉加载是否完成
      ListError: false, // 上拉加载是否请求错误
      ListFinished: false, // 上拉加载是否已经没有了数据
    };
  },
  components: {
    List,
    PullRefresh
  },
  mounted() {
    // dom准备好之后获取height的高度
    this.$nextTick(() => {
      this.headHeight = this.$refs.height.clientHeight
      this.$refs.height.remove()
    })
  },
  watch: {
    disabled (val) {
      this.pullRefreshDisabled = val
    }
  },
  methods: {
    // 下拉成功后触发
    onRefresh () {
      // 请求中退出
      if (this.GetDataLoading){return false}
      this.GetDataLoading = true

      let that = this
      that.ListFinished = false; // 刷新时将上拉加载的状态改为可以上拉加载

      // 如果刷新就只获取最新的10条数据
      that.pageNumber = 1
      that.getList({
        pageSize: that.pageSize,
        pageNumber: that.pageNumber
      }).then(res => {
        if(res.code == 200) {
          
          window.setTimeout(() => {
            that.list = res.list
            that.pullRefreshLoading = false
            // 
            that.$nextTick(() => {
              that.GetDataLoading = false // 请求完毕

              that.pageNumber = 2 // 触发上拉加载时从第二页开始
              that.$refs.List.check()
            })
          },3000)
        } else {
          that.ListError = true
        }
      }).catch(res => {
        that.ListError = true
      })
    },
    // 上拉刷新方法
    onLoad () {
       // 请求中退出
      if (this.GetDataLoading){ this.ListLoading = false ;console.log('上拉加载禁止中'); return false}
      this.GetDataLoading = true

      let that = this

      this.getList({
        pageSize: this.pageSize,
        pageNumber: this.pageNumber
      }).then(res => {
        if(res.code == 200) {
          that.list.push(...res.list)

          that.ListLoading = false
          that.$nextTick(() => {
            this.GetDataLoading = false
          })
          //that.ListError = false
          if(res.list.length < that.pageSize){
            that.ListFinished = true
          } else {
            // 数据请求成功后将页数加一
            that.pageNumber++
          }
        } else {
          that.ListError = true
        }
      }).catch(res => {
        that.ListError = true
      })
    },
    getList (obj) {
      let that = this
      // 返回一个promise
      return new Promise((resolve, reject) => {
        // 添加上默认提交数据
        obj = Object.assign((that.defaultFromData || {}), obj)
        // 用传进来的promise去请求数据
        that.getData(obj).then(res => {
          // 触发加载完成函数
          that.$emit('end', res)
          resolve(res)
        }).catch(res => {

          reject(res)
        })
      })
    }
  }
}
</script>

<style lang='less' scoped>
.height{
  height: 1.33333rem;
  position: fixed;
  top: 1.33333rem;
  left: 0;
}
</style>