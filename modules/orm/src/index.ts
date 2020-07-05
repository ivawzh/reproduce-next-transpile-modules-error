import 'reflect-metadata'
import { getConnection, createConnection } from 'typeorm'
export * from 'typeorm'
export * from './entity/User'

export async function superConnection() {
    try {
      const conn = await getConnection()
      if (conn) return conn
    } catch (error) {
      const newConn = await createConnection({
        type: 'sqlite',
        database: 'demo',
      })
      return newConn
    }
  }
