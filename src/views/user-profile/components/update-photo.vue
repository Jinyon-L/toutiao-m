<template>
  <div class="update-photo">
    <img class="img" :src="img" ref="img" />
    <div class="toolbar">
      <div class="cancel" @click="$emit('close')">取消</div>
      <div class="confirm" @click="onConfirm">完成</div>
    </div>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { updateUserPhotoAPI } from '@/api'
export default {
  name: 'UpdatePhoto',
  props: {
    img: {
      type: [String, Object],
      required: true
    }
  },
  data () {
    return {
      cropper: null
    }
  },
  mounted () {
    const image = this.$refs.img
    this.cropper = new Cropper(image, {
      viewMode: 1, // 视图模式，1：限制裁剪框不超过画布的大小
      dragMode: 'move', // 拖动模式
      aspectRatio: 1, // 裁剪框的固定纵横比
      autoCropArea: 1, // 自动裁剪区域，0~1自动裁剪区域大小（百分比）
      cropBoxMovable: false, // 裁剪框是否能移动
      cropBoxResizable: false, // 裁剪框是否缩放
      background: false, // 默认背景
      movable: true // 移动图片
    })
  },
  methods: {
    onConfirm () {
      this.cropper.getCroppedCanvas().toBlob(async (blob) => {
        this.$toast.loading({
          message: '',
          forbidClick: true,
          duration: 0
        })
        try {
          const formData = new FormData()
          formData.append('photo', blob)
          const { data } = await updateUserPhotoAPI(formData)
          this.$emit('close')
          this.$emit('update-photo', data.data.photo)
          this.$toast.success('修改成功')
        } catch (err) {
          this.$toast.fail('修改失败')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.update-photo {
  .img {
    display: block;
    max-width: 100%;
  }
  background-color: #000;
  height: 100%;
  .toolbar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    .cancel,
    .confirm {
      width: 90px;
      height: 90px;
      font-size: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
    }
  }
}
</style>
