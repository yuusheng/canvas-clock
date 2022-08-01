export interface IColor {
  bigger: string
  smaller: string
  pointer: string
  shadow: string
}

const blue: IColor = {
  bigger: '#3B6DBF',
  smaller: '#2C528F',
  pointer: '#22406F',
  shadow: 'rgba(70, 100, 171, 0.8)',
}

const green: IColor = {
  bigger: '#45A864',
  smaller: '#307445',
  pointer: '#204E2E',
  shadow: 'rgba(7, 100, 30, 0.8)',
}

const cyan: IColor = {
  bigger: '#66CFD3',
  smaller: '#37B9BD',
  pointer: '#1E6567',
  shadow: 'rgba(58, 140, 148, 0.8)',
}

const red: IColor = {
  bigger: '#edd0ce',
  smaller: '#C95955',
  pointer: '#EC3B35',
  shadow: 'rgba(120, 52, 42, 0.8)',
}

const purple: IColor = {
  bigger: '#daccef',
  smaller: '#9768da',
  pointer: '#7c34e9',
  shadow: 'rgba(132, 70, 172, 0.8)',
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
