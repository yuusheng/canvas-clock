import { MatterDBItems, MatterDBStorenames } from '~/utils/types'

interface Option<T extends {}, U extends string> {
  DBName: string
  version?: number
  objStores: {
    objectStoreName: U
    objectStoreOptions?: IDBObjectStoreParameters
    objectStoreIndex?: {
      name: keyof T
      keyPath: string | Iterable<string>
      options?: IDBIndexParameters
    }[]
  }[]
  errorHandler?: (event: Event) => void
}

class DB<T extends {}, U extends string> {
  private useupgrad = false
  private db: IDBDatabase
  private request: IDBOpenDBRequest

  constructor(option: Option<T, U>) {
    this.initDB(option).catch((err) => {
      console.log(err.message)
    })
  }

  public initDB(option: Option<T, U>) {
    return new Promise<Event>((resolve, reject) => {
      if (!indexedDB) {
        reject(new Error('当前浏览器不支持index DB'))
      }

      let request = indexedDB.open(option.DBName, option.version || 2)
      this.request = request

      request.onerror = (event) => {
        console.log((event.target as any).message)
        reject(event)
      }

      request.onsuccess = (event) => {
        console.log('open indexDB successfully')
        if (!this.useupgrad) {
          this.db = (event.target as any).result
          resolve(event)
        }
        option?.errorHandler && option.errorHandler(event)
      }

      request.onupgradeneeded = (event) => {
        this.db = (event.target as any).result
        this.useupgrad = true

        const generalOption = {
          keyPath: 'id',
          autoIncrement: true,
        }
        option.objStores.forEach((v) => {
          const objectStore = this.db.createObjectStore(
            v.objectStoreName,
            v?.objectStoreOptions || generalOption
          )

          if (v.objectStoreIndex)
            v.objectStoreIndex.forEach((_) => {
              objectStore.createIndex(
                _.name as string,
                _.keyPath,
                _.options || { unique: false }
              )
            })
        })
        console.log('object store name', this.db.objectStoreNames)
        resolve(event)
      }
    })
  }

  private open(storeName: string) {
    this.request.onupgradeneeded = (e) => {
      console.log('onupgrade')
      if (!this.db.objectStoreNames.contains(storeName)) {
        let objectStore = this.db.createObjectStore(storeName, {
          keyPath: 'id',
          autoIncrement: true,
        })
        objectStore.createIndex('name', 'keyPath', { unique: true })
      }
    }
  }

  public add(storeName: U, data: T) {
    let request = this.db
      .transaction([storeName], 'readwrite')
      .objectStore(storeName)
      .add(data)
  }

  public get(storeName: string, value?: any, key?: string) {
    let store = this.db
      .transaction(storeName, 'readwrite')
      .objectStore(storeName)

    let request = key ? store.index(key || 'id').get(value) : store.get(value)
  }

  public update(storeName: string) {}
}

export const mattersDB = new DB<MatterDBItems, MatterDBStorenames>({
  DBName: 'mattersDb',
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
