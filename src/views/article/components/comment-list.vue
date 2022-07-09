<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    :error="error"
    error-text="加载失败, 请重试"
    @load="onLoad"
  >
    <ArticleComment
      v-for="(item, index) in list"
      :key="index"
      :comment="item"
    />
  </van-list>
</template>

<script>
import { getCommentsAPI } from '@/api'
import ArticleComment from './comment-item.vue'
export default {
  name: 'CommentList',
  components: {
    ArticleComment
  },
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      error: false
    }
  },
  created () {
    this.onLoad()
  },
  methods: {
    async onLoad () {
      try {
        const { data } = await getCommentsAPI({
          type: 'a', // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
          source: this.source, // 源id，文章id或评论id
          offset: this.offset,
          limit: this.limit
        })
        console.log(data)
        const { results } = data.data
        this.list.push(...results)
        this.$emit('onload-success', data.data)
        this.loading = false
        if (results.length) {
          this.offset = data.data.last_id
        } else {
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>

<style>
</style>
