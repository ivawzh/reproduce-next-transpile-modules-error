import 'reflect-metadata'
import foo from 'foo'
import Bar from 'bar'
import { createConnection, User } from 'db/src'
import { InferGetServerSidePropsType } from 'next'

export default function Home(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      This page is failing
      <pre>{foo}</pre>
      <Bar />
      <ol>
        {
          props.users.map(u =>
            <li key={u.id}>
              {u.firstName}
            </li>
          )
        }
      </ol>
    </div>
  )
}

export const getServerSideProps = async () => {
  try {
    const conn = await createConnection()
    console.log("Inserting a new user into the database...")
    const user = new User()
    user.firstName = "Timber"
    user.lastName = "Saw"
    user.age = 25
    await conn.manager.save(user)
    console.log("Saved a new user with id: " + user.id)

    console.log("Loading users from the database...")
    const users = await conn.manager.find(User)
    console.log("Loaded users: ", users)

    console.log("Here you can setup and run express/koa/any other framework.")
    return { props: { users } }
  } catch (error) {
    console.error(error)
    return { props: { users: [] }}
  }
}
