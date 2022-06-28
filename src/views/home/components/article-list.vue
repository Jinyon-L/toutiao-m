<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      :success-text="successText"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <ArticleItem
          v-for="(item, index) in list"
          :key="index"
          :article="item"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import ArticleItem from '@/components/article-item'
import { getArticlesAPI } from '@/api'
export default {
  data () {
    return {
      list: [],
      error: false,
      loading: false,
      finished: false,
      timestamp: null,
      isLoading: false,
      successText: ''
    }
  },
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  methods: {
    async onLoad () {
      // 获取新闻推荐数据
      try {
        const { data } = await getArticlesAPI({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now()
        })
        // 请求失败测试
        // if (Math.random() > 0.5) { JSON.parse('AVXVGXfdcngchfgfc') }
        this.list.push(...data.data.results)
      } catch (err) {
        console.log(err)
        this.error = true // 数据加载失败，将 error 设置成 true 即可显示错误提示
        this.loading = false // 加载状态结束
      }

      // 加载状态结束
      this.loading = false

      // 数据限制加载40条
      if (this.list.length >= 40) {
        this.finished = true // 数据加载完毕，将 finished 设置成 true 即可。
      }
    },
    async onRefresh () {
      // 下拉刷新数据
      try {
        const { data } = await getArticlesAPI({
          channel_id: this.channel.id,
          timestamp: Date.now()
        })
        // 请求失败测试
        // if (Math.random() > 0.5) { JSON.parse('AVXVGXfdcngchfgfc') }
        this.list.unshift(...data.data.results)
        this.successText = `刷新成功，获取最新${data.data.results.length
          }条数据`
        this.isLoading = false
      } catch (err) {
        this.successText = '刷新失败'
        this.isLoading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.article-list {
  height: 79vh;
  overflow-y: auto;
  margin-top: 3px;
  padding-bottom: 100px;
}
</style>>
