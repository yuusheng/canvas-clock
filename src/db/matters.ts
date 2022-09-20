import { PaletteType } from '~/utils'
import { createDB } from './db'

export interface MatterDBItems {
  name: string
  color: PaletteType
  time: Date
}

export type MatterDBStorenames = 'matters' | 'dier'

export const mattersDB = createDB<MatterDBStorenames>('mattersDB', {
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
