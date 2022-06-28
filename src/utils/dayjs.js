import Vue from 'vue'
import dayjs from 'dayjs' // ES 2015
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.locale('zh-cn') // use locale globally

dayjs.extend(relativeTime)

Vue.filter('relativeTime', value => {
  return dayjs().to(dayjs(value))
})
// dayjs().from(dayjs('1990')) // 2 years ago
// dayjs().from(dayjs(), true) // 2 years

// dayjs().fromNow()

// dayjs().to(dayjs())

// dayjs().toNow()
