<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div v-if="isDeleteShow">
        <span @click="clearFn">全部删除</span>
        &nbsp;&nbsp;
        <span @click="isDeleteShow = false">完成</span>
      </div>
      <van-icon v-else @click="isDeleteShow = true" name="delete" />
    </van-cell>
    <van-cell
      v-for="(item, index) in searchHistories1"
      :key="index"
      :title="item"
      @click="onSearchClick(item, index)"
    >
      <van-icon v-show="isDeleteShow" name="close" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  components: {},
  props: {
    searchHistories: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isDeleteShow: false,
      searchHistories1: this.searchHistories
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    onSearchClick (item, index) {
      if (this.isDeleteShow) {
        this.searchHistories1.splice(index, 1)
      } else {
        this.$emit('search', item)
      }
    },
    clearFn () {
      this.$emit('clear-histories') // 请求清除父节点数据
      this.searchHistories1 = []
    }
  }
}
</script>

<style scoped lang="less"></style>
