import { PaletteType } from '~/utils'
import { createDB } from './db'

export type MatterDBStorenames = keyof MatterDBStores

export interface MatterDBStores {
  matters: {
    name: string
    color: PaletteType
    time: Date
  }
  test: {
    name: string
    bb: string
  }
}

export const mattersDB = createDB<MatterDBStores>('mattersDB', {
  objStores: [
    {
      objectStoreName: 'matters',
      objectStoreIndex: [
        { name: 'name', keyPath: 'name' },
        { name: 'time', keyPath: 'time' },
        { name: 'color', keyPath: 'color' },
      ],
    },
  ],
})
