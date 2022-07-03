<template>
  <div class="home-container">
    <van-nav-bar class="page-nav-bar" fixed>
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
      <div class="more-btn" slot="nav-right" @click="show = true">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
    <van-popup
      v-model="show"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <ChannelEdit
        :myChannels="channels"
        :active="active"
        @updata-active="onUpdataActive"
      />
    </van-popup>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'
import ArticleList from './components/article-list.vue'
import ChannelEdit from './components/channel-edit.vue'
import { getChannelsAPI } from '@/api'
export default {
  name: 'HomePage',
  components: {
    ArticleList,
    ChannelEdit
  },
  props: {},
  data () {
    return {
      active: 0,
      channels: [],
      show: false
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created () {
    this.getcha()
  },
  mounted () { },
  methods: {
    async getcha () {
      try { // 获取频道列表
        if (this.user) {
          const { data } = await getChannelsAPI()
          this.channels = data.data.channels
        } else if (!getItem('CHANNEL')) {
          const { data } = await getChannelsAPI()
          this.channels = data.data.channels
        } else {
          this.channels = getItem('CHANNEL')
        }
      } catch (err) {
        console.log('请求失败', err)
      }
    },
    onUpdataActive (index, show = true) {
      this.active = index
      this.show = show
    }
  }
}
</script>

<style scoped lang="less">
.home-container {
  padding-top: 174px;
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
    .van-tabs__wrap {
      position: fixed;
      top: 92px;
      z-index: 1;
      left: 0;
      right: 0;
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
