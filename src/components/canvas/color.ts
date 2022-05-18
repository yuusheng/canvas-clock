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
  shadow: '#',
}

const green: IColor = {
  bigger: '#45A864',
  smaller: '#307445',
  pointer: '#204E2E',
  shadow: '',
}

const cyan: IColor = {
  bigger: '#66CFD3',
  smaller: '#37B9BD',
  pointer: '#1E6567',
  shadow: '',
}

const red: IColor = {
  bigger: '#FF8C61',
  smaller: '#CE6A85',
  pointer: '#985277',
  shadow: '',
}
const purple: IColor = {
  bigger: '#daccef',
  smaller: '#9768da',
  pointer: '#7c34e9',
  shadow: 'rgba(132, 70, 172, 0.8)',
}

export default {
  blue,
  green,
  red,
  purple,
  cyan,
}
