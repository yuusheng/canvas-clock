import { Ref } from 'vue'
import { PaletteType } from '.'

export type MaybeRef<T> = Ref<T> | T

export interface Matter {
  name: string
  color: PaletteType
}

export type Day = '周一' | '周二' | '周三' | '周四' | '周五' | '周六' | '周日'

export interface MatterDBItems {
  name: string
  color: string
  time: Date
}

export type MatterDBStorenames = 'matters'
