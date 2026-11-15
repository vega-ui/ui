import fs from 'node:fs'
import path from 'node:path'

const SRC = path.resolve(import.meta.dirname, '../packages/ui/src')
const OPEN_FOLDERS = ['contexts', 'hooks']
const RELATIVE_IMPORT = /from\s*'(\.[^']*)'/g

const folderOf = (file) => {
  const parts = path.relative(SRC, file).split(path.sep)
  if (parts[0].startsWith('..') || path.extname(parts[0]) !== '') return undefined
  if (parts[0] === 'internals') return { owner: `internals/${parts[1]}`, rest: parts.slice(2) }

  return { owner: parts[0], rest: parts.slice(1) }
}

const isInternal = (owner) => owner.startsWith('internals/')

const entryPath = (rest) => (rest.at(-1) === 'index' ? rest.slice(0, -1) : rest)

const sourceFiles = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
  const full = path.join(dir, entry.name)
  if (entry.isDirectory()) return sourceFiles(full)

  return /\.tsx?$/.test(entry.name) ? [full] : []
})

let graph

const componentGraph = () => {
  if (graph) return graph
  graph = new Map()
  for (const file of sourceFiles(SRC)) {
    const from = folderOf(file)
    if (!from || isInternal(from.owner)) continue
    for (const [, spec] of fs.readFileSync(file, 'utf8').matchAll(RELATIVE_IMPORT)) {
      const to = folderOf(path.resolve(path.dirname(file), spec))
      if (!to || to.owner === from.owner || isInternal(to.owner)) continue
      if (!graph.has(from.owner)) graph.set(from.owner, new Set())
      graph.get(from.owner).add(to.owner)
    }
  }

  return graph
}

const reaches = (start, goal) => {
  const seen = new Set()
  const queue = [start]
  while (queue.length > 0) {
    const owner = queue.shift()
    if (owner === goal) return true
    if (seen.has(owner)) continue
    seen.add(owner)
    queue.push(...(componentGraph().get(owner) ?? []))
  }

  return false
}

const onImports = (context, check) => {
  const visit = (node) => {
    const spec = node.source?.value
    if (typeof spec !== 'string' || !spec.startsWith('.')) return
    const from = folderOf(context.filename)
    const to = folderOf(path.resolve(path.dirname(context.filename), spec))
    if (!from || !to || from.owner === to.owner) return
    check(node, from, to)
  }

  return { ImportDeclaration: visit, ExportNamedDeclaration: visit, ExportAllDeclaration: visit }
}

const boundaries = {
  meta: { type: 'problem', schema: [] },
  create: (context) => onImports(context, (node, from, to) => {
    const entry = entryPath(to.rest)
    if (isInternal(from.owner) && !isInternal(to.owner)) {
      context.report({ node: node.source, message: 'Internals never import component folders.' })
      return
    }
    if (isInternal(to.owner) && entry.length === 0) return
    if (!isInternal(to.owner) && (entry.length === 0 || (entry.length === 1 && OPEN_FOLDERS.includes(entry[0])))) return

    context.report({ node: node.source, message: `Import ${to.owner} through its index, contexts or hooks, not ${entry.join('/')}.` })
  }),
}

const cycles = {
  meta: { type: 'problem', schema: [] },
  create: (context) => onImports(context, (node, from, to) => {
    if (isInternal(from.owner) || isInternal(to.owner) || !reaches(to.owner, from.owner)) return

    context.report({ node: node.source, message: `${from.owner} and ${to.owner} import each other.` })
  }),
}

export default { rules: { boundaries, cycles } }
