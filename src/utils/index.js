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

export const compareVersion = (v1, v2) => {
  v1 = v1.split('.')
  v2 = v2.split('.')
  const len = Math.max(v1.length, v2.length)

  while (v1.length < len) {
    v1.push('0')
  }
  while (v2.length < len) {
    v2.push('0')
  }

  for (let i = 0; i < len; i++) {
    const num1 = parseInt(v1[i])
    const num2 = parseInt(v2[i])

    if (num1 > num2) {
      return 1
    } else if (num1 < num2) {
      return -1
    }
  }

  return 0
}
