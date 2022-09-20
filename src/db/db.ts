interface ObjStore<T> {
  objectStoreName: T
  objectStoreOptions?: IDBObjectStoreParameters
  objectStoreIndex?: {
    name: string
    keyPath: string | Iterable<string>
    options?: IDBIndexParameters
  }[]
}

interface Option<T> {
  objStores: ObjStore<T>[]
  errorHandler?: (event: Event) => void
}

class DB<T extends string> {
  private useupgrad = false
  private db: IDBDatabase
  private curVersion = 1
  private name: string

  constructor(dbName: string, option: Option<T>) {
    this.name = dbName
    this.initDB(option)
  }

  public initDB(option: Option<T>) {
    const promise = this.openIndexedDB(option)
    this.resolveAndUpgrade(promise)
    return this
  }

  public createStore(store: ObjStore<T>[] | ObjStore<T>) {
    console.log('[indexedDB] create store')
    const promise = Array.isArray(store)
      ? this.openIndexedDB(store)
      : this.openIndexedDB([store])

    this.resolveAndUpgrade(promise)
    return this
  }

  public add(storeName: T, data: Record<string, any>) {
    this.openIndexedDB().then((db) => {
      const store = db
        .transaction(storeName, 'readwrite')
        .objectStore(storeName)
      store.add(data)
    })
    return this
  }

  public get(storeName: T, index: string, value: string) {
    return new Promise((resolve, reject) => {
      this.openIndexedDB().then((db) => {
        const indexs = db
          .transaction(storeName, 'readwrite')
          .objectStore(storeName)
          .index(index)
        console.log('[indexedDB] get indexs', indexs)
        const res = indexs.get(value)

        res.onerror = (e) => {
          reject(e)
        }
        res.onsuccess = (e) => {
          resolve((e.target as any).result)
        }
      })
    })
    // let request =  store.index(key || 'id').get(value)
  }

  public update(storeName: T) {}

  private openIndexedDB(): Promise<IDBDatabase>
  private openIndexedDB(option: Option<T> | ObjStore<T>[]): Promise<Event>

  private openIndexedDB(option?: Option<T> | ObjStore<T>[]) {
    if (!option) return this.open()

    let isOption = (props: any): props is Option<T> =>
      typeof (props as Option<T>)['objStores'] !== 'undefined'

    return new Promise<Event>((resolve, reject) => {
      let request = indexedDB.open(this.name, this.curVersion)

      request.onerror = (event) => {
        reject((event.target as any).message)
      }

      if (isOption(option))
        request.onsuccess = (event) => {
          if (!this.useupgrad) {
            this.db = (event.target as any).result
            resolve(event)
          }
          option?.errorHandler && option.errorHandler(event)
          console.log('[indexedDB] open indexDB successfully', this.db)
        }

      request.onupgradeneeded = (event) => {
        this.db = (event.target as any).result
        this.useupgrad = true

        const generalOption = {
          keyPath: 'id',
          autoIncrement: true,
        }
        let stores = isOption(option) ? option.objStores : option
        stores.forEach((store) => {
          if (this.db.objectStoreNames.contains(store.objectStoreName)) return

          const objectStore = this.db.createObjectStore(
            store.objectStoreName,
            store?.objectStoreOptions || generalOption
          )

          if (store.objectStoreIndex)
            store.objectStoreIndex.forEach((index) => {
              objectStore.createIndex(
                index.name as string,
                index.keyPath,
                index.options || { unique: false }
              )
            })
        })
        console.log('[DB] object store name', this.db.objectStoreNames)
        resolve(event)
      }
    })
  }

  private open() {
    return new Promise<IDBDatabase>((resolve, reject) => {
      let request = indexedDB.open(this.name, this.curVersion)

      request.onsuccess = (event) => {
        resolve((event.target as any).result)
      }

      request.onerror = (event) => {
        reject((event.target as any).message)
      }
    })
  }

  private upgrade() {
    this.curVersion++
  }

  private resolveAndUpgrade(promise: Promise<Event>) {
    promise
      .then(() => {
        this.upgrade()
      })
      .catch((reason: any) => {
        console.error(reason)
      })
  }
}

export function createDB<T extends string>(name: string, option: Option<T>) {
  if (!indexedDB) {
    alert('当前浏览器不支持indexedDB，请更换浏览器重试')
    return null
  }
  return new DB(name, option)
}
