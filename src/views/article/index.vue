<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div v-if="loading" class="loading-wrap">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div v-else-if="article.title" class="article-detail">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{ article.aut_name }}</div>
          <div slot="label" class="publish-date">{{ article.pubdate }}</div>
          <!-- @update-isFollowed="article.is_followed = $event"
          :isFollowed="article.is_followed" -->
          <FollowUser
            class="follow-btn"
            v-model="article.is_followed"
            :userId="article.aut_id"
          />
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content markdown-body"
          v-html="article.content"
          ref="article-content"
        ></div>
        <van-divider>正文结束</van-divider>
        <!-- 文章评论 -->
        <CommentList
          :list="commmentList"
          :source="article.art_id"
          @onload-success="totalCommentCount = $event.total_count"
          @reply-click="onReplyClick"
        />
        <!-- 文章评论 -->

        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button
            class="comment-btn"
            type="default"
            round
            size="small"
            @click="isPostShow = true"
            >写评论</van-button
          >
          <van-icon
            name="comment-o"
            :info="totalCommentCount"
            color="#777"
            @click="commentClickFn"
          />
          <CollectArticle
            v-model="article.is_collected"
            :article-id="article.art_id"
          />
          <!-- <van-icon color="#777" name="good-job-o" /> -->
          <LikeArticle
            v-model="article.attitude"
            :article-id="article.art_id"
          />
          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->

        <!-- 评论 -->
        <van-popup v-model="isPostShow" position="bottom">
          <PostComment :target="article.art_id" @post-success="onPostSuccess" />
        </van-popup>
        <!-- 评论 -->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div v-else-if="errStatus === 404" class="error-wrap">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div v-else class="error-wrap">
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button @click="loadArticle" class="retry-btn">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <!-- 回复 -->
      <van-popup v-model="isReplyShow" position="bottom" style="height: 90%">
        <CommentReply
          v-if="isReplyShow"
          :comment="currentComment"
          @close="isReplyShow = false"
        />
      </van-popup>
      <!-- 回复 -->
    </div>
  </div>
</template>

<script>
import { getArticlesByIdAPI } from '@/api'
import { ImagePreview } from 'vant'
import FollowUser from '@/components/follow-user'
import CollectArticle from '@/components/collect-article'
import LikeArticle from '@/components/like-article'
import CommentList from './components/comment-list.vue'
import PostComment from './components/comment-post.vue'
import CommentReply from './components/comment-reply.vue'

export default {
  name: 'ArticleIndex',
  components: {
    FollowUser,
    CollectArticle,
    LikeArticle,
    CommentList,
    PostComment,
    CommentReply
  },
  provide: function () {
    return {
      articleId: this.articleId
    }
  },
  props: {
    articleId: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      article: {},
      loading: true,
      errStatus: 0,
      followLoading: false,
      totalCommentCount: 0,
      isPostShow: false,
      commmentList: [],
      isReplyShow: false,
      currentComment: {}
    }
  },
  computed: {},
  watch: {
  },
  created () {
    this.loadArticle()
  },
  mounted () { },
  methods: {
    async loadArticle () {
      this.loading = true
      try {
        const { data } = await getArticlesByIdAPI(this.articleId)
        // if (Math.random() > 0.5) {
        //   JSON.parse('dsafgnjgnknzk')
        // }
        this.article = data.data
        // console.log(data.data)
        this.loading = false
        // setTimeout(() => {
        //   // console.log(this.$refs['article-content'])
        //   this.previewImage()
        // }, 0)
      } catch (err) {
        if (err.response && err.errStatus === 404) {
          this.errStatus = 404
        }
        this.loading = false
      }
    },
    previewImage () {
      const articleContent = this.$refs['article-content']
      const imgs = articleContent.querySelectorAll('img')
      // console.log(imgs)
      const images = []
      imgs.forEach((element, index) => {
        images.push(element.src)
        ImagePreview({
          images,
          startPosition: index
        })
      })
      // console.log(images)
    },
    onPostSuccess (data) {
      this.isPostShow = false
      this.commmentList.unshift(data.new_obj)
      this.totalCommentCount++
    },
    onReplyClick (item) {
      // console.log(item)
      this.currentComment = item
      this.isReplyShow = true
    },
    // 点击评论图标视口滚动到评论位置
    commentClickFn () {
      const mainWrap = document.querySelector('.main-wrap')
      const articleContent = document.querySelector('.article-content')
      const articleHeight = articleContent.scrollHeight
      // console.log(articleHeight)
      mainWrap.scrollTo({
        top: articleHeight,
        behavior: 'smooth'
      })
    }
  }
}
</script>

<style scoped lang="less">
@import "./github-markdown.css";
.article-container {
  .page-nav-bar {
    /deep/ .van-icon {
      color: #fff;
    }
  }
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
