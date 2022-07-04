<template>
  <div class="search-suggestion">
    <van-cell
      v-for="(text, index) in suggestions"
      :key="index"
      icon="search"
      @click="$emit('search', text)"
    >
      <div slot="title" v-html="highlight(text)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchAPI } from '@/api'
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestions: []
    }
  },
  computed: {},
  watch: {
    searchText: {
      handler: debounce(function (val) {
        this.getSearchFn(val)
      }, 500),
      //   handler (val) {
      //     this.getSearchFn(val)
      //   },
      immediate: true
    }
  },
  created () { },
  mounted () { },
  methods: {
    async getSearchFn (q) {
      try {
        const { data } = await getSearchAPI(q)
        const options = data.data.options
        if (!options[0]) { // 后台数据options[0]存在null
          this.suggestions = []
          return
        }
        this.suggestions = options
      } catch (err) {
        this.$toast('请求失败')
      }
    },
    highlight (text) {
      if (text) {
        const highlightStr = `<span style="color: #3296fa">${this.searchText}</span>`
        const reg = new RegExp(this.searchText, 'gi')
        return text.replace(reg, highlightStr)
      }
    }
  }
}
</script>

<style scoped lang="less"></style>
