import { createDB } from '../db'
import type { PaletteType } from '~/utils'

export type MatterDBStorenames = keyof MatterDBStores

export interface MatterDBStores {
  matters: {
    name: string
    color: PaletteType
    time: Date
    duration?: number
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
