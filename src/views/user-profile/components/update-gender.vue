<template>
  <div>
    <van-picker
      title="标题"
      show-toolbar
      :columns="columns"
      @confirm="onConfirm"
      @cancel="$emit('close')"
      @change="onChange"
      :default-index="value"
    />
  </div>
</template>

<script>
import { updateUserProfileAPI } from '@/api'
export default {
  name: 'UpDateGender',
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      columns: ['男', '女'],
      localGender: this.value
    }
  },
  methods: {
    onChange (picker, value, index) {
      this.localGender = index
    },
    async onConfirm () {
      this.$toast.loading({
        message: '',
        forbidClick: true,
        duration: 0
      })
      try {
        const localGender = this.localGender
        const { data } = await updateUserProfileAPI({
          grnder: localGender
        })
        console.log(data)
        this.$emit('input', localGender)
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
