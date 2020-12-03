import Link from 'next/link'

export default function Header() {
    return (
        <header>
            <div className={'flex justify-between py-3 px-4 font-bold'}>
                <Link href={'/'}>Aaron Dielmann</Link>
                <Link href={'/about'}>About</Link>
            </div>
        </header>
    )
  }
   