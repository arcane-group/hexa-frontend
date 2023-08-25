import dayjs from 'dayjs'
// import { i18n } from '@lingui/core'

export function formatTime(t: string | number | Date | dayjs.Dayjs | undefined, isShowTime = true) {
  if (!t) {
    return ''
  }
  const t1 = dayjs(t)
  switch (judgeDate(t1)) {
    case STATES.TODAY:
      return t1.format('h:mm A')
    case STATES.MONTH:
      return isShowTime ? t1.format('MMMM D, h:mm A') : t1.format('MM/DD')
  }
  return isShowTime ? t1.format('MMMM D, YYYY, h:mm A') : t1.format('DD/MM/YYYY')
}

enum STATES {
  OTHER = 'OTHER',
  TODAY = 'TODAY',
  // YESTERDAY = 'YESTERDAY',
  MONTH = 'MONTH',
}

function judgeDate(t: dayjs.Dayjs) {
  const curTime = Date.now()

  const today = dayjs(curTime).set('h', 0).set('m', 0).set('s', 0).set('ms', 0)
  // const yesterday = today.clone().add(-1, 'day')
  const month = today.clone().add(dayjs(today).daysInMonth() * -1, 'day')

  if (!t.isBefore(today)) {
    return STATES.TODAY
  }
  // else if (!t.isBefore(yesterday)) {
  //   return STATES.YESTERDAY
  // }
  else if (!t.isBefore(month)) {
    return STATES.MONTH
  }
  return STATES.OTHER
}
