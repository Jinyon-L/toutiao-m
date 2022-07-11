<template>
  <div>
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm="onConfirm"
      @cancel="$emit('close')"
    />
  </div>
</template>

<script>
import { updateUserProfileAPI } from '@/api'
import dayjs from 'dayjs'
export default {
  name: 'UpDateBrithday',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value),
      localGender: this.value
    }
  },
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '',
        forbidClick: true,
        duration: 0
      })
      try {
        const currentDate = dayjs(this.currentDate).format('YYYY-MM-DD')
        const { data } = await updateUserProfileAPI({
          grnder: currentDate
        })
        console.log(data)
        this.$emit('input', currentDate)
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
