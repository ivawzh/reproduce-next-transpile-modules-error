import foo from 'foo'
import Bar from 'bar'
import B from 'b'
import { Links } from '../comonents/links'

export default function Home() {
  return (
    <div>
      <pre>{foo}</pre>
      <Bar />
      <B />
      <Links />
    </div>
  )
}
