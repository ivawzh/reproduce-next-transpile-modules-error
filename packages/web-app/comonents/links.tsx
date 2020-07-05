import Link from 'next/link'

export function Links() {
  return <div>
    <ol>
      <li><Link href='/'>Home</Link></li>
      <li><Link href='/a'>A</Link></li>
      <li><Link href='/b'>B</Link></li>
      <li><Link href='/commonjs'>Commonjs</Link></li>
      <li><Link href='/orm'>ORM</Link></li>
    </ol>
  </div>
}
