export interface IColor {
  bigger: string
  smaller: string
  pointer: string
  shadow: string
  bg: string
  button: string
}

const blue: IColor = {
  bigger: '#ccd1ed',
  smaller: '#6d80d7',
  pointer: '#22406F',
  shadow: 'rgba(70, 100, 171, 0.8)',
  bg: 'rgba(208, 221, 241, 0.25)',
  button: '#354fc7',
}

const green: IColor = {
  bigger: '#45A864',
  smaller: '#307445',
  pointer: '#204E2E',
  shadow: 'rgba(7, 100, 30, 0.8)',
  bg: 'rgba(212, 237, 220, 0.25)',
  button: '#57b35f',
}

const cyan: IColor = {
  bigger: '#66CFD3',
  smaller: '#37B9BD',
  pointer: '#1E6567',
  shadow: 'rgba(58, 140, 148, 0.8)',
  bg: 'rgba(208, 240, 241, 0.25)',
  button: '#4e9da6',
}

const red: IColor = {
  bigger: '#edd0ce',
  smaller: '#C95955',
  pointer: '#EC3B35',
  shadow: 'rgba(120, 52, 42, 0.8)',
  bg: 'rgba(255, 232, 232, 0.25)',
  button: '#c84e49',
}

const purple: IColor = {
  bigger: '#daccef',
  smaller: '#9768da',
  pointer: '#7c34e9',
  shadow: 'rgba(132, 70, 172, 0.8)',
  bg: 'rgba(233, 222, 247, 0.25)',
  button: '#7237ce',
}

export const palette: {
  [K in PaletteType]: IColor
} = {
  blue,
  green,
  red,
  purple,
  cyan,
}

export type PaletteType = 'blue' | 'green' | 'red' | 'purple' | 'cyan'

export function hexToRgba(hex: string, opacity: string) {
  let rgba = []
  const range = hex.startsWith('#') ? [1, 7] : [0, 6]
  for (let i = range[0]; i < range[1]; i += 2) {
    rgba.push(parseInt('0x' + hex.slice(i, i + 2)))
  }
  return `rgba(${rgba.join(', ')}, ${opacity})`
}
