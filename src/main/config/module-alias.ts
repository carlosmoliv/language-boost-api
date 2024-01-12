import moduleAlias from 'module-alias'
import { resolve } from 'path'

const sourceFolder = process.env.TS_NODE_DEV ? 'src' : 'dist'

moduleAlias.addAliases({
  '@main': resolve(`${sourceFolder}/main`),
  '@domain': resolve(`${sourceFolder}/domain`),
  '@application': resolve(`${sourceFolder}/application`),
  '@infra': resolve(`${sourceFolder}/infra`),
  '@presentation': resolve(`${sourceFolder}/presentation`),
  '@utils': resolve(`${sourceFolder}/utils`)
})
