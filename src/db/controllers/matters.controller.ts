import type { MatterDBStores } from '../models'
import { mattersDB } from '../models'
import type { PaletteType } from '~/utils'

export async function addNewMatter(
  name: string,
  color: PaletteType,
  duration = 25,
) {
  return await mattersDB.add('matters', {
    name,
    color,
    time: new Date(),
    duration,
  })
}

export async function getAllMatters(name: keyof MatterDBStores) {
  return await mattersDB.getAll(name)
}
