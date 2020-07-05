import { createConnection, getConnection } from 'typeorm'

export async function superConnection() {
  try {
    const conn = await getConnection()
    if (conn) return conn
  } catch (error) {
    const newConn = await createConnection({
      type: 'sqlite',
      database: 'demo-commonjs',
    })
    return newConn
  }
}
