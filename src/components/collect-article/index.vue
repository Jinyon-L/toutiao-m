<template>
  <!-- 收藏 -->
  <van-icon
    :name="value ? 'star' : 'star-o'"
    :color="value ? '#ffa500' : '#777'"
    :loading="loading"
    @click="onCollect"
  />
</template>

<script>
import { deleteCollectAPI, addCollectAPI } from '@/api'
export default {
  name: 'CollectArticle',
  props: {
    value: {
      type: Boolean,
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
    async onCollect () {
      this.loading = true
      try {
        if (this.value) {
          await deleteCollectAPI(this.articleId)
        } else {
          await addCollectAPI(this.articleId)
        }
        this.$emit('input', !this.value)
        this.$toast.success(!this.value ? '收藏成功' : '已取消')
      } catch (err) {

      }
      this.loading = false
    }
  }
}
</script>

<style>
</style>
