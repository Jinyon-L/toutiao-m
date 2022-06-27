<template>
  <div class="article-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <van-cell
        v-for="(item, index) in list"
        :key="index"
        :title="item.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getArticlesAPI } from '@/api'
export default {
  data () {
    return {
      list: [],
      error: false,
      loading: false,
      finished: false,
      timestamp: null
    }
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
        this.error = true
        this.loading = false
      }

      // 加载状态结束
      this.loading = false

      // 数据限制加载40条
      if (this.list.length >= 40) {
        this.finished = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
.article-list {
  margin-top: 3px;
  padding-bottom: 100px;
}
</style>>
