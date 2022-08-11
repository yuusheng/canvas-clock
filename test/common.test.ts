import { it, expect } from 'vitest'
import { hexToRgba, palette } from '../src/utils'

it('should be 3', () => {
  expect(1 + 1).toBe(2)
})

it('should', () => {
  expect(hexToRgba(palette.purple.pointer, '0.8')).toMatchInlineSnapshot(
    '"rgba(124, 52, 233, 0.8)"'
  )
})

function handleAlpha(rgba: string) {
  const regExp = /0.\d\d/g
  return rgba.replace(regExp, '0.8')
}

it('should be 0.9', () => {
  expect(handleAlpha('rgba(208, 221, 241, 0.25)')).toMatchInlineSnapshot(
    '"rgba(208, 221, 241, 0.8)"'
  )
})

let map = new Map()
map.set('a', { name: 'yuusheng' })
map.set('b', { name: 'yiihan' })

it('', () => {
  expect(map.forEach((v) => console.log(v))).toMatchInlineSnapshot('undefined')
})
