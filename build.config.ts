class SplitVendorChunkCache {
  cache: Map<any, any>
  constructor() {
    this.cache = new Map()
  }

  reset() {
    this.cache = new Map()
  }
}

const cache = new SplitVendorChunkCache().cache

export function manualChunks(id: any, { getModuleInfo }) {
  const cssLangs = '\\.(css|less|sass|scss|styl|stylus|pcss|postcss)($|\\?)'
  const cssLangRE = new RegExp(cssLangs)
  const isCSSRequest = (request: string): boolean =>
    cssLangRE.test(request)
    // 分vendor包
  if (
    id.includes('node_modules')
    && !isCSSRequest(id)
    && staticImportedByEntry(id, getModuleInfo)
  )
    return 'vendor'

  // 分manifest包，解决chunk碎片问题
  else if (
    ((getModuleInfo(id).importers.length + getModuleInfo(id).dynamicImporters.length) > 1)
    && id.includes('src')
  )
    return 'manifest'
}

function staticImportedByEntry(
  id: string,
  getModuleInfo: any,
  importStack = [],
) {
  if (cache.has(id))
    return !!cache.get(id)

  if (importStack.includes(id)) {
    cache.set(id, false)
    return false
  }
  const mod = getModuleInfo(id)
  if (!mod) {
    cache.set(id, false)
    return false
  }
  if (mod.isEntry) {
    cache.set(id, true)
    return true
  }
  const someImporterIs = mod.importers.some(importer =>
    staticImportedByEntry(
      importer,
      getModuleInfo,
      importStack.concat(id),
    ),
  )
  cache.set(id, someImporterIs)
  return someImporterIs
}
