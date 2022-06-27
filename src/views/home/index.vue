<template>
  <div class="home-container">
    <van-nav-bar class="page-nav-bar">
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        >搜索</van-button
      >
    </van-nav-bar>
    <van-tabs class="channel-tabs" v-model="active" swipeable animated>
      <van-tab v-for="obj in channels" :key="obj.id" :title="obj.name">
        <ArticleList :channel="obj" />
      </van-tab>
      <div class="placeholder" slot="nav-right"></div>
      <div class="more-btn" slot="nav-right">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
  </div>
</template>

<script>
import ArticleList from './components/article-list.vue'
import { getChannelsAPI } from '@/api'
export default {
  name: 'HomePage',
  components: {
    ArticleList
  },
  props: {},
  data () {
    return {
      active: 0,
      channels: []
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getcha()
  },
  mounted () { },
  methods: {
    async getcha () {
      try {
        const { data } = await getChannelsAPI()
        this.channels = data.data.channels
      } catch (err) {
        console.log('请求失败', err)
      }
    }
  }
}
</script>

<style scoped lang="less">
.home-container {
  /deep/ .van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    /deep/ .van-icon {
      font-size: 32px;
    }
  }
  /deep/ .channel-tabs {
    .van-tabs_wrap {
      height: 82px;
    }
    .van-tab {
      min-width: 170px;
      color: #777;
    }
    .van-tab--active {
      color: #333;
    }
    .van-tabs__line {
      width: 31px;
      bottom: 38px;
    }
    .placeholder {
      flex-shrink: 0;
      width: 66px;
      height: 82px;
    }
    .more-btn {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 82px;
      background-color: #fff;
      i.toutiao {
        font-size: 35px;
      }
    }
  }
}
</style>
