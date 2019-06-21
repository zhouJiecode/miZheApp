export const xx = 1

export const timeReduceOneSecond = (hour, minute, second) => {
  let mngSed = (parseInt(second, 10) || 0) - 1
  let mngMnt = (parseInt(minute, 10) || 0) - 1
  let mngHor = (parseInt(hour, 10) || 0) - 1

  if (mngSed >= 0) {
    second = mngSed >= 10 ? '' + mngSed : '0' + mngSed
  } else {
    second = '59'
    if (mngMnt >= 0) {
      minute = mngMnt >= 10 ? '' + mngMnt : '0' + mngMnt
    } else {
      minute = '59'
      if (mngHor >= 0) {
        hour = mngHor >= 10 ? '' + mngHor : '0' + mngHor
      } else {
        hour = '00'
        minute = '00'
        second = '00'
      }
    }
  }

  return {
    hour,
    minute,
    second
  }
}
