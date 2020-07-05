import foo from 'foo'
import Bar from 'bar'
import { superConnection, User } from 'orm/dist/src'
import { Links } from '../comonents/links'
import { InferGetServerSidePropsType } from 'next'

export default function Home(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  return (
    <div>
      <p>User amount: {props.userAmount}</p>
      <p>Database</p>
      <p>name: {props.dbName}</p>
      <p>type: {props.dbType}</p>
      <pre>{foo}</pre>
      <Bar />
      <Links />
      <ol>
        Users:
        {props.users.map(u =>
          <li key={u.id}>
            <div>ID {u.id}</div>
            <div>First name {u.firstName}</div>
            <div>Last name {u.lastName}</div>
            <div>Age {u.age}</div>
          </li>
        )}
      </ol>
    </div>
  )
}

export async function getServerSideProps() {
  const conn = await superConnection()
  const user = new User()
  user.firstName = 'Ivan'
  user.lastName = 'Wang'
  user.age = 1
  await user.save()
  const users = await User.find()
  return {
    props: {
      dbName: conn.options.database,
      dbType: conn.options.type,
      userAmount: await User.count(),
      users: users.map(u => ({
        age: u.age,
        firstName: u.firstName,
        lastName: u.lastName,
        id: u.id,
      })),
    },
  }
}
