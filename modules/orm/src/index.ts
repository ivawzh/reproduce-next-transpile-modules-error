import 'reflect-metadata'
import { getConnection, createConnection, ConnectionOptionsReader, Connection, ConnectionOptions, getConnectionManager } from 'typeorm'
import * as ormConfig from '../ormconfig'
import * as path from 'path'
import { User } from './entity/User'

declare type ormConfig = ConnectionOptions

export { ormConfig }
export * from 'typeorm'
export * from './entity/User'

export const a = 2

// export async function superConnection() {
//   try {
//     const conn = await getConnection()
//     if (conn) return conn
//   } catch (error) {
//     const newConn = await superCreateConnection()
//     return newConn
//   }
// }

// export async function superCreateConnection(): Promise<Connection> {
//   if (connection) return connection
//   connOpts = await getOptions()
//   connection = await createConnection(connOpts)
//   return connection
// }

// Doesn't work
// const connectionOptionsReader = new ConnectionOptionsReader({
//   root: path.join(path.dirname(require.resolve('orm')), '..')
// })

let connOpts: ConnectionOptions | undefined
let connection: Connection | undefined

async function getOptions(): Promise<ConnectionOptions> {
  if (connOpts) return connOpts
  connOpts = {
    ...ormConfig as ConnectionOptions,
    entities: [User],
    // TODO: follow
    // - https://docs.nestjs.com/techniques/database#auto-load-entities
    // - https://github.com/nestjs/typeorm/issues/237#issuecomment-653933380
    // - https://github.com/nestjs/typeorm/issues/237#issuecomment-584578347
    // not working
    // entities: ['node_modules/orm/dist' + "src/entity/**/*.(js|ts)"],
    // migrations: ['node_modules/orm/dist' + "src/migration/**/*.(js|ts)"],
    // subscribers: ['node_modules/orm/dist' + "src/subscriber/**/*.(js|ts)"],
  }
  return connOpts
}

export async function ensureConnection(name: string = 'default'): Promise<Connection> {
  const connectionManager = getConnectionManager()
  const connOpts = await getOptions()

  if (connectionManager.has(name)) {
    const connection = connectionManager.get(name)

    if (process.env.NODE_ENV !== 'production') {
      await updateConnectionEntities(connection, connOpts.entities)
    }

    return connection
  }

  return await connectionManager.create({ name, ...connOpts }).connect()
}

function entitiesChanged(prevEntities: any[], newEntities: any[]): boolean {
  if (prevEntities.length !== newEntities.length) return true

  for (let i = 0; i < prevEntities.length; i++) {
    if (prevEntities[i] !== newEntities[i]) return true
  }

  return false
}

async function updateConnectionEntities(connection: Connection, entities: any[]) {
  if (!entitiesChanged(connection.options.entities, entities)) return

  // @ts-ignore
  connection.options.entities = entities

  // @ts-ignore
  connection.buildMetadatas()

  if (connection.options.synchronize) {
    await connection.synchronize()
  }
}
