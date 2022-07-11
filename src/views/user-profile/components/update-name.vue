<template>
  <div>
    <van-nav-bar
      title="设置昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onUpdate"
    />
    <van-field
      v-model.trim="localName"
      rows="2"
      autosize
      type="textarea"
      maxlength="7"
      placeholder="请输入昵称"
      show-word-limit
    />
  </div>
</template>

<script>
import { updateUserProfileAPI } from '@/api'
export default {
  name: 'UpDateName',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      localName: this.value
    }
  },
  methods: {
    async onUpdate () {
      this.$toast.loading({
        message: '',
        forbidClick: true,
        duration: 0
      })
      try {
        const localName = this.localName
        if (!localName.length) {
          this.$toast('昵称不能为空')
          return
        }
        const { data } = await updateUserProfileAPI({
          name: localName
        })
        console.log(data)
        this.$emit('input', localName)
        this.$emit('close')
        this.$toast.success('修改成功')
      } catch (err) {
        this.$toast.fail('修改失败')
      }
    }
  }
}
</script>

<style>
</style>
