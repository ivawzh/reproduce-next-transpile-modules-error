import foo from 'foo'
import Bar from 'bar'
import { superConnection } from 'orm/dist'
import { Links } from '../comonents/links'
import { InferGetServerSidePropsType } from 'next'

export default function Home(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <p>Database</p>
      <p>name: {props.dbName}</p>
      <p>type: {props.dbType}</p>
      <pre>{foo}</pre>
      <Bar />
      <Links />
    </div>
  )
}

export async function getServerSideProps() {
  const conn = await superConnection()
  return { props: { dbName: conn.name, dbType: conn.options.type} }
}
