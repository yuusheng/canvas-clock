import { PaletteType } from '~/utils'
import { mattersDB } from '../models'

export async function addNewMatter(
  name: string,
  color: PaletteType,
  duration = 25
) {
  return await mattersDB.add('matters', {
    name,
    color,
    time: new Date(),
    duration,
  })
}
