import { Ref } from 'vue'
import { PaletteType } from '.'

export type MaybeRef<T> = Ref<T> | T

export interface Matter {
  name: string
  color: PaletteType
}
