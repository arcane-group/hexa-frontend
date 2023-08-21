/**
 * 暂停
 * @param timer 时间戳
 * @returns
 */
export const sleep = (timer = 1000) => {
  return new Promise((r) => {
    setTimeout(() => {
      r('ok')
    }, timer)
  })
}
