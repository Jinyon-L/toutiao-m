<template>
  <!-- 点赞 -->
  <van-icon
    :name="value === 1 ? 'good-job' : 'good-job-o'"
    :color="value === 1 ? '#e5645f' : '#777'"
    :loading="loading"
    @click="onLike"
  />
</template>

<script>
import { addLikeAPI, deleteLikeAPI } from '@/api'
export default {
  name: 'LikeArticle',
  props: {
    value: {
      type: Number,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    async onLike () {
      this.loading = true
      try {
        let status = -1
        if (this.value === 1) {
          await deleteLikeAPI(this.articleId)
        } else {
          await addLikeAPI(this.articleId)
          status = 1
        }
        this.$emit('input', status)
        this.$toast.success(this.status === 1 ? '点赞成功' : '已取消')
      } catch (err) {

      }
      this.loading = false
    }
  }
}
</script>

<style>
</style>
