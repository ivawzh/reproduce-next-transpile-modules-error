import foo from 'foo'
import Bar from 'bar'
import Orm from 'orm'
import { Links } from '../comonents/links'

export default function Home() {
  return (
    <div>
      <pre>{foo}</pre>
      <Bar />
      <Orm />
      <Links />
    </div>
  )
}
