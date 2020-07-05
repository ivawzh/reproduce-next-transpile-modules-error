import 'reflect-metadata'
import { getConnection, createConnection, ConnectionOptionsReader, Connection, ConnectionOptions } from 'typeorm'
import * as ormConfig from '../ormconfig'
import * as path from 'path'
import { User } from './entity/User'

declare type ormConfig = ConnectionOptions

export { ormConfig }
export * from 'typeorm'
export * from './entity/User'

export async function superConnection() {
  try {
    const conn = await getConnection()
    if (conn) return conn
  } catch (error) {
    const newConn = await superCreateConnection()
    return newConn
  }
}

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

export async function superCreateConnection(): Promise<Connection> {
  if (connection) return connection
  connOpts = await getOptions()
  connection = await createConnection(connOpts)
  return connection
}
