<template>
  <div class="user-profile">
    <van-nav-bar
      title="个人信息"
      class="page-nav-bar"
      left-arrow
      @click-left="$router.back()"
    />
    <input type="file" hidden ref="file" @change="onFileChange" />
    <van-cell title="头像" is-link>
      <van-image
        class="avatar"
        fit="cover"
        round
        :src="user.photo"
        @click="$refs.file.click()"
      />
    </van-cell>
    <van-cell
      title="昵称"
      :value="user.name"
      is-link
      @click="isNameShow = true"
    />
    <van-cell
      title="性别"
      :value="user.gender === 0 ? '男' : '女'"
      is-link
      @click="isGenderShow = true"
    />
    <van-cell
      title="生日"
      :value="user.birthday"
      is-link
      @click="isBirthdayShow = true"
    />

    <!-- 编辑昵称 -->
    <van-popup v-model="isNameShow" style="height: 100%" position="bottom">
      <UpDateName
        v-if="isNameShow"
        @close="isNameShow = false"
        v-model="user.name"
      />
    </van-popup>
    <!-- 编辑昵称 -->
    <!-- 编辑性别 -->
    <van-popup v-model="isGenderShow" position="bottom">
      <UpDateGender
        v-if="isGenderShow"
        v-model="user.gender"
        @close="isGenderShow = false"
      />
    </van-popup>
    <!-- 编辑性别 -->
    <!-- 编辑生日 -->
    <van-popup v-model="isBirthdayShow" position="bottom">
      <UpDateBrithday
        v-if="isBirthdayShow"
        v-model="user.birthday"
        @close="isBirthdayShow = false"
      />
    </van-popup>
    <!-- 编辑生日 -->
    <!-- 编辑头像 -->
    <van-popup v-model="isPhotoShow" style="height: 100%" position="bottom"
      ><UpdatePhoto
        v-if="isPhotoShow"
        :img="img"
        @close="isPhotoShow = false"
        @update-photo="user.photo = $event"
      />
    </van-popup>
    <!-- 编辑头像 -->
  </div>
</template>

<script>
import { getUserProfileAPI } from '@/api'
import UpDateName from './components/update-name.vue'
import UpDateGender from './components/update-gender.vue'
import UpDateBrithday from './components/update-brithday.vue'
import UpdatePhoto from './components/update-photo.vue'
export default {
  name: 'UserProfile',
  components: {
    UpDateName,
    UpDateGender,
    UpDateBrithday,
    UpdatePhoto
  },
  data () {
    return {
      user: {},
      isNameShow: false,
      isGenderShow: false,
      isBirthdayShow: false,
      isPhotoShow: false,
      img: null
    }
  },
  created () {
    this.loadUserProfile()
  },
  methods: {
    async loadUserProfile () {
      try {
        const { data } = await getUserProfileAPI()
        // console.log(data)
        this.user = data.data
      } catch (err) {
        this.$toast('获取失败')
      }
    },
    onFileChange () {
      const file = this.$refs.file.files[0]
      this.img = window.URL.createObjectURL(file)
      console.log(this.img)
      this.isPhotoShow = true
      this.$refs.file.value = ''
    }
  }
}
</script>

<style lang="less" scoped>
.user-profile {
  .page-nav-bar {
    /deep/ .van-icon {
      color: #fff;
    }
  }
  .avatar {
    width: 60px;
    height: 60px;
  }
}
</style>
