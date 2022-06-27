<template>
  <div class="login-container">
    <van-nav-bar class="page-nav-bar" title="登录">
      <van-icon
        slot="left"
        name="arrow-left"
        color="#fff"
        @click="$router.back()"
      />
    </van-nav-bar>
    <van-form ref="loginForm" @submit="onSubmit">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="userFormRules.mobile"
        type="number"
        maxlength="11"
      >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        :rules="userFormRules.code"
        type="number"
        maxlength="6"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <van-count-down
            v-if="isCountDownShow"
            :time="5000"
            format="ss 秒"
            @finish="isCountDownShow = false"
          />
          <van-button
            v-else
            @click="onSendSms"
            native-type="button"
            class="send-sms-btn"
            round
            size="small"
            type="default"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 33px">
        <van-button round block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { loginAPI, sendSmsAPI } from '@/api'
export default {
  name: 'LoginIndex',
  data () {
    return {
      isCountDownShow: false,
      user: {
        mobile: '13911111111',
        code: '246810'
      },
      userFormRules: {
        mobile: [
          {
            required: true,
            message: '请填写手机号'
          },
          {
            pattern: /0?(13|14|15|17|18|19)[0-9]{9}/,
            message: '请输入正确内容'
          }
        ],

        code: [
          {
            required: true,
            message: '请填写验证码'
          },
          {
            pattern: /^\d{6}$/,
            message: '请输入正确内容'
          }
        ]
      }
    }
  },
  methods: {
    async onSubmit () {
      const user = this.user
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const res = await loginAPI(user) // 登录请求
        this.$store.commit('setUser', res.data.data)
        this.$toast.success('登录成功')
        this.$router.push('./')
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('手机号或验证码错误')
        } else {
          this.$toast.fail('登陆失败，请稍后重试')
        }
      }
    },
    async onSendSms () {
      try {
        await this.$refs.loginForm.validate('mobile') // 验证手机号码格式
      } catch (err) {
        return console.log(err)
      }
      this.isCountDownShow = true // 手机号格式验证通过显示倒计时
      try {
        await sendSmsAPI(this.user.mobile)
        console.log('验证码获取成功')
      } catch (err) {
        this.isCountDownShow = false
        if (err.response.status === 429) {
          this.$toast('请稍后再试')
        } else {
          this.$toast('发送失败,请稍后再试')
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
.login-container {
  .toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    background-color: #ededed;
    // width: 152px;
    height: 50px;
    font-size: 22px;
    color: #666;
  }
}
</style>
>
