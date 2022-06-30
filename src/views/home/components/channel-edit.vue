<template>
  <div class="chnannel-edit">
    <van-cell class="myChnannel">
      <div class="text" slot="title">我的频道</div>
      <van-button slot="default" round size="mini" color="red" plain
        >编辑</van-button
      >
    </van-cell>
    <van-grid class="my-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(value, index) in myChannels"
        :key="index"
        icon="clear"
      >
        <span class="text" :class="{ active: index === active }" slot="text">{{
          value.name
        }}</span>
      </van-grid-item>
    </van-grid>
    <van-cell class="rec-grid" title="推荐频道" />
    <van-grid direction="horizontal" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in recommendChannels"
        :key="index"
        icon="plus"
        :text="channel.name"
        @click="onAddChannel(channel)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllchannelsAPI } from '@/api'
export default {
  data () {
    return {
      allChannels: [],
      myChannels1: this.myChannels
    }
  },
  computed: {
    recommendChannels () {
      return this.allChannels.filter(channels => {
        return !this.myChannels.find(myChannels => {
          return myChannels.id === channels.id
        })
      })
    }
  },
  props: {
    active: {
      type: Number,
      required: true
    },
    myChannels: {
      type: Array,
      required: true
    }
  },
  created () {
    this.loadAllChannels()
  },
  methods: {
    async loadAllChannels () {
      try {
        const { data } = await getAllchannelsAPI()
        this.allChannels = data.data.channels
      } catch (err) {
        this.$toast('数据获取失败')
      }
    },
    onAddChannel (channel) {
      console.log(channel)
      this.myChannels1.push(channel)
    }
  }
}
</script>

<style lang="less" scoped>
.chnannel-edit {
  padding: 85px 0;
  .myChnannel {
    .text {
      font-size: 32px;
      color: #333;
    }
    /deep/ .van-button {
      width: 104px;
      height: 48px;
      font-size: 26px;
    }
  }
  /deep/ .my-grid {
    .grid-item {
      .van-icon-clear {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
        color: #cacaca;
        z-index: 2;
      }
    }
  }
  /deep/ .grid-item {
    width: 160px;
    height: 75px;
    .van-grid-item__content {
      white-space: nowrap;
      background-color: #f4f5f6;
      .van-grid-item__text,
      .text {
        margin-top: 0;
        font-size: 28px;
        color: #222;
      }
      .active {
        color: red;
      }
      .van-icon-plus {
        font-size: 28px;
      }
    }
  }
}
</style>
>
