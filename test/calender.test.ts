import { describe, expect, it } from 'vitest'
import { getCurrentMonthDays, useCalender } from '../src/utils'

describe('calender', () => {
  it('should be day list', () => {
    expect(getCurrentMonthDays('2022-01-01').slice(0, 5)).toEqual(
      [
        '2022-01-01',
        '2022-01-02',
        '2022-01-03',
        '2022-01-04',
        '2022-01-05',
      ],
    )
  })

  it('should work preDay and nextDay', () => {
    const {
      currentDate,
      currentMonthDays,
      nextDay,
      preDay,
      backToToday,
    } = useCalender(new Date('2022-10-15'))
    expect(currentDate.value).toEqual('2022-10-15')

    expect(currentMonthDays.value.slice(0, 5)).toEqual(
      [
        '2022-10-01',
        '2022-10-02',
        '2022-10-03',
        '2022-10-04',
        '2022-10-05',
      ],
    )

    for (let i = 0; i < 20; i++)
      nextDay()
    expect(currentDate.value).toEqual('2022-11-04')
    expect(currentMonthDays.value.slice(0, 5)).toEqual(
      [
        '2022-11-01',
        '2022-11-02',
        '2022-11-03',
        '2022-11-04',
        '2022-11-05',
      ],
    )

    for (let i = 0; i < 20; i++)
      preDay()
    expect(currentDate.value).toEqual('2022-10-15')
    expect(currentMonthDays.value.slice(0, 5)).toEqual(
      [
        '2022-10-01',
        '2022-10-02',
        '2022-10-03',
        '2022-10-04',
        '2022-10-05',
      ],
    )

    backToToday()
    expect(currentDate.value).toEqual('2022-10-15')
  })

  it('should work', () => {
    const day = new Date().getDay()
    expect(day).toMatchInlineSnapshot('6')
  })
})
