<template>
 <div class="content_group content_group_fixed" id="home">
    <NavBar fixed left-arrow @click-left="onClickLeft" title="论坛测试"></NavBar>
    <div ref="height" class="height"></div>
    <PullRefresh v-model="pullRefreshLoading" @refresh="onRefresh" :disabled='pullRefreshDisableds' :head-height="headHeight">
      <List
        ref="List"
        v-model="ListLoading"
        :finished="ListFinished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <Cell
          v-for="(item, index) in list"
          :key="index"
          :title="item.name"
        />
      </List>
    </PullRefresh>
  </div>
</template>

<script>
import { List, Cell, NavBar,PullRefresh} from 'vant'
import { onClickLeft } from '@/minxins'
import { getData } from '@/axios/api/common'
export default {
  data() {
    return {
      list: [], // 储存数据的容器
      pageSize: 10, // 分页请求个数
      pageNumber: 0, // 分页初始页数
      headHeight: 100, // 默认下拉刷新提示高度100，会自动获取refs.height的高度

      pullRefreshLoading: false, // 下拉刷新是否完成，设置为false代表数据刷新完成
      pullRefreshDisableds: false, // 下拉刷新是否禁用
      pullGetDataLoading: false, // 是否下拉刷新请求数据中

      ListLoading: false, // 上拉加载是否完成
      ListError: false, // 上拉加载是否请求错误
      ListFinished: false, // 上拉加载是否已经没有了数据
      ListGetDataLoading: false, // 是否上拉加载请求数据中
    };
  },
  mixins: [onClickLeft],
  components: {
    List,
    Cell,
    NavBar,
    PullRefresh
  },
  mounted() {
    // dom准备好之后获取height的高度
    this.$nextTick(() => {
      this.headHeight = this.$refs.height.clientHeight
      this.$refs.height.remove()
    })
  },
  methods: {
        // 下拉成功后触发
    onRefresh () {
      // 请求中退出
      if (this.pullGetDataLoading){return false}
      this.pullGetDataLoading = true

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
              that.pullGetDataLoading = false
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
      console.log('进来；额')
       // 请求中退出
      if (this.ListGetDataLoading){return false}
      this.ListGetDataLoading = true

      let that = this
      this.pageNumber++

      this.getList({
        pageSize: this.pageSize,
        pageNumber: this.pageNumber
      }).then(res => {
        if(res.code == 200) {
          that.list.push(...res.list)

          that.ListLoading = false
          that.$nextTick(() => {
            this.ListGetDataLoading = false
          })
          //that.ListError = false
          if(res.list.length < that.pageSize){
            that.ListFinished = true
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
        getData(obj).then(res => {

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