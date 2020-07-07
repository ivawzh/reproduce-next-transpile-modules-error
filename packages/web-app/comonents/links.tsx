import Link from 'next/link'

export function Links() {
  return <div>
    <ol>
      <li><Link href='/'><a>Home</a></Link></li>
      <li><Link href='/a'><a>A</a></Link></li>
      <li><Link href='/b'><a>B</a></Link></li>
      <li><Link href='/commonjs'><a>Commonjs</a></Link></li>
      <li><Link href='/orm'><a>ORM</a></Link></li>
    </ol>
  </div>
}
