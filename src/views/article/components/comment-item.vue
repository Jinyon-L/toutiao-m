<template>
  <van-cell class="comment-item">
    <van-image
      slot="icon"
      class="avatar"
      round
      fit="cover"
      :src="comment.aut_photo"
    />
    <div slot="title" class="title-wrap">
      <div class="user-name">{{ comment.aut_name }}</div>
      <van-icon
        class="like-btn"
        :color="comment.is_liking ? '#e5645f' : ''"
        :name="comment.is_liking ? 'good-job' : 'good-job-o'"
        @click="onCommentLike"
        :loading="commentLoading"
        >{{ comment.like_count || "赞" }}</van-icon
      >
    </div>

    <div slot="label">
      <p class="comment-content">{{ comment.content }}</p>
      <div class="bottom-info">
        <span class="comment-pubdate">{{
          comment.pubdate | relativeTime
        }}</span>
        <van-button class="reply-btn" round @click="$emit('reply-click')"
          >回复 {{ comment.reply_count }}</van-button
        >
      </div>
    </div>
  </van-cell>
</template>

<script>
import { addCommentLikeAPI, deleteCommentLikeAPI } from '@/api'
export default {
  name: 'CommentItem',
  components: {},
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      commentLoading: false,
      comment1: this.comment
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    async onCommentLike () {
      this.commentLoading = true
      if (this.comment.is_liking) {
        await deleteCommentLikeAPI(this.comment.com_id)
        this.comment1.like_count--
      } else {
        await addCommentLikeAPI(this.comment.com_id)
        this.comment1.like_count++
      }
      this.comment1.is_liking = !this.comment1.is_liking
      this.commentLoading = false
    }
  }
}
</script>

<style scoped lang="less">
.comment-item {
  .avatar {
    width: 72px;
    height: 72px;
    margin-right: 25px;
  }
  .title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-name {
      color: #406599;
      font-size: 26px;
    }
  }
  .comment-content {
    font-size: 32px;
    color: #222222;
    word-break: break-all;
    text-align: justify;
  }
  .comment-pubdate {
    font-size: 19px;
    color: #222;
    margin-right: 25px;
  }
  .bottom-info {
    display: flex;
    align-items: center;
  }
  .reply-btn {
    width: 135px;
    height: 48px;
    line-height: 48px;
    font-size: 21px;
    color: #222;
  }
  .like-btn {
    height: 30px;
    padding: 0;
    border: none;
    font-size: 30px;
    line-height: 30px;
    margin-right: 7px;
  }
}
</style>
