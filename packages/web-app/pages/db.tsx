import foo from 'foo'
import Bar from 'bar'
import Db from 'db'

export default function Home() {
  return (
    <div>
      This page is failing
      <pre>{foo}</pre>
      <Bar />
      <Db />
    </div>
  )
}
