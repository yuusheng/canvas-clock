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
