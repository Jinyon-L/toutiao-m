<template>
  <div class="my-container">
    <div v-if="user" class="header user-info">
      <div class="base-info">
        <div class="left">
          <van-image class="avatar" round fit="cover" :src="userInfo.photo" />
          <span class="name">{{ userInfo.name }}</span>
        </div>
        <div class="right">
          <van-button size="mini" round to="/user-profile">编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="count">{{ userInfo.art_count }}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.follow_count }}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.fans_count }}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.like_count }}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <div v-else class="header not-login">
      <div class="login-btn" @click="$router.push('/login')">
        <img class="mobile-img" src="@/assets/mobile.png" alt="" />
        <span class="text">登录 / 注册</span>
      </div>
    </div>

    <van-grid class="grid-nav" :column-num="2" clickable>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-lishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>
    <van-cell-group>
      <van-cell title="消息123通知" is-link />
      <van-cell title="小智同学" is-link />
    </van-cell-group>
    <van-cell
      v-if="user"
      clickable
      title="退出登录"
      class="lgout-cell"
      @click="onLogout"
    />
  </div>
</template>

<script>
import { getUserInfoAPI } from '@/api'
import { mapState } from 'vuex'
export default {
  name: 'MyPage',
  components: {},
  props: {},
  data () {
    return {
      userInfo: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created () {
    if (this.user) {
      this.loadUserInfo()
    }
  },
  mounted () { },
  methods: {
    onLogout () {
      this.$dialog.confirm({
        title: '确定退出当前账号'
      })
        .then(() => {
          // on confirm
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // on cancel
        })
    },
    async loadUserInfo () { // 获取自己的个人信息
      try {
        const { data } = await getUserInfoAPI()
        this.userInfo = data.data
        // console.log(this.userInfo)
      } catch (err) { }
    }
  }

}
</script>

<style scoped lang="less">
.my-container {
  .header {
    height: 360px;
    background-image: url(~@/assets/banner.png);
    background-size: cover;
  }

  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;

    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .mobile-img {
        width: 132px;
        height: 132px;
      }

      .text {
        margin-top: 15px;
        color: #fff;
        font-size: 32px;
      }
    }
  }

  .user-info {
    .base-info {
      height: 231px;
      padding: 76px 32px 23px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;

      .left {
        display: flex;
        align-items: center;

        .avatar {
          width: 132px;
          height: 132px;
          border: 1px solid #fff;
        }

        .name {
          margin-left: 15px;
          font-size: 30px;
          color: #fff;
        }
      }
    }

    .data-stats {
      display: flex;

      .data-item {
        height: 130px;
        display: flex;
        flex: 1;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        color: #fff;

        .count {
          font-size: 36px;
        }

        .text {
          font-size: 23px;
        }
      }
    }
  }

  .grid-item {
    height: 141px;

    i.toutiao {
      font-size: 45px;
    }

    .toutiao-shoucang {
      color: #eb5253;
    }

    .toutiao-lishi {
      color: #ff9d1d;
    }

    span.text {
      font-size: 28px;
    }
  }

  .lgout-cell {
    text-align: center;
    color: #d86262;
    margin-top: 9px;
  }
}
</style>
