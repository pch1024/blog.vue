import { throttle } from '@/assets/js/tools'
;((win, doc) => {
  let [defalutFontSize, remW, clientW, clientH, size] = [100, 750]
  let remFontSize = () => {
    clientW = doc.documentElement.clientWidth
    clientH = doc.documentElement.clientHeight
    // console.log(onChange, cw);
    size = Math.round((clientW / remW) * 100)
    size = size > 100 ? defalutFontSize : size
    console.count(size)
    doc.documentElement.style.fontSize = size + 'px'
    doc.body.style.height = clientH + 'px'
  }
  win.addEventListener('resize', throttle(remFontSize, 100, false), false)
  doc.addEventListener('DOMContentLoaded', remFontSize, false)
})(window, document)
