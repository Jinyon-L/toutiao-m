<template>
  <div>
    <van-nav-bar
      :title="
        comment.reply_count > 0 ? `${comment.reply_count}条回复` : '0条回复'
      "
      @click-right="$emit('close')"
    >
      <van-icon slot="right" name="cross" size="18" />
    </van-nav-bar>
    <CommentItem :comment="comment" @reply-click="isPostShow = true" />
    <van-cell title="全部回复" />
    <CommentList
      :source="comment.com_id"
      :type="'c'"
      :list="commentList"
      @reply-click="isPostShow = true"
    />
    <!-- 评论 -->
    <van-popup v-model="isPostShow" position="bottom">
      <PostComment :target="comment.com_id" @post-success="onPostSuccess" />
    </van-popup>
    <!-- 评论 -->
  </div>
</template>

<script>
import CommentItem from './comment-item.vue'
import CommentList from './comment-list.vue'
import PostComment from './comment-post.vue'
export default {
  name: 'CommentReply',
  components: {
    CommentItem,
    CommentList,
    PostComment
  },
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isPostShow: false,
      comment1: this.comment,
      commentList: []
    }
  },
  methods: {
    onPostSuccess (data) {
      this.comment1.reply_count++
      this.isPostShow = false
      this.commentList.unshift(data.new_obj)
    }
  }
}
</script>

<style>
</style>
