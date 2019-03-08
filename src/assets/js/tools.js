// 节流函数，用于rem window.onresize
export const throttle = (fn, delay, immediately) => {
  // console.log('函数节流：' + fn.name)
  let [context, timer] = [this]
  return () => {
    if (!timer && immediately) fn()
    if (!timer && !immediately) {
      timer = setTimeout(() => {
        fn.call(context)
        timer = null
      }, delay)
    }
    if (timer) return false
  }
}
