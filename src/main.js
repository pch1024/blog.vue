// 公共资源
import Vue from 'vue'
// 路由
import router from '@/router/router'
// 状态管理
import store from '@/store/store'
// 布局
import App from '@/App.vue'
import '@/assets/scss/common.scss'
// 彩色图案
import '@/assets/js/icon.js'
// 移动端适配
import '@/assets/js/rem.js'
// markdown + 代码高亮
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js/lib/highlight'
import javascript from 'highlight.js/lib/languages/javascript'
import css from 'highlight.js/lib/languages/css'
import xml from 'highlight.js/lib/languages/xml'
import markdown from 'highlight.js/lib/languages/markdown'
import shell from 'highlight.js/lib/languages/shell'
import '@/assets/scss/github-markdown.scss'
import 'highlight.js/styles/default.css'

// 引入部分组件
import { Pagination, MessageBox } from 'element-ui'
Vue.use(Pagination, MessageBox)

// 代码高亮按需引入
hljs.registerLanguage('shell', shell)
hljs.registerLanguage('markdown', markdown)
hljs.registerLanguage('xml', xml)
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('css', css)
// 初始化MarkdownIt
Vue.md = new MarkdownIt({
  highlight: (str, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value
      } catch (__) {}
    }
    return '' // use external default escaping
  },
  html: true,
  linkify: true,
  typographer: true
})
// 自定义指令
Vue.directive('mdtohtml', (el, binding) => {
  el.innerHTML = Vue.md.render(binding.value)
})

Vue.directive('focus', {
  inserted: el => el.focus()
})

Vue.directive('required', {
  update: el => {
    if (el.value) el.removeAttribute('style')
  }
})

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
