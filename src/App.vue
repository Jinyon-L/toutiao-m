<template>
  <div id="app">
    <router-view />
    <p>黑马头条</p>
    <div class="box">
      <i class="toutiao toutiao-shipin"></i>
    </div>
    <van-cell-group>
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" label="描述信息" />
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    function () { }
  }
}
</script>
<style lang="less">
.box {
  background-color: pink;
  width: 350px;
  height: 75px;
}
</style>
