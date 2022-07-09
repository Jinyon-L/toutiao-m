<template>
  <!-- 关注组件 -->
  <van-button v-if="isFollowed" round :loading="loading" @click="onFollow"
    >已关注</van-button
  >
  <van-button
    v-else
    type="info"
    color="#3296fa"
    round
    size="small"
    :loading="loading"
    icon="plus"
    @click="onFollow"
    >关注</van-button
  >
</template>

<script>
import { addFollowAPI, deleteFollowAPI } from '@/api'

export default {
  name: 'FollowUser',
  model: {
    prop: 'isFollowed',
    event: 'update-isFollowed'
  },
  props: {
    isFollowed: {
      type: Boolean,
      required: true
    },
    userId: {
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
    async onFollow () {
      this.loading = true
      try {
        if (this.isFollowed) {
          const { data } = await deleteFollowAPI(this.userId)
          console.log(data)
        } else {
          const { data } = await addFollowAPI(this.userId)
          console.log(data)
        }
        this.$emit('update-isFollowed', !this.isFollowed)
      } catch (err) {
        let message = '操作失败！'
        if (err.response && err.response.status === 400) {
          message = '不能关注自己！'
        }
        this.$toast(message)
      }
      this.loading = false
    }
  }
}
</script>

<style></style>
