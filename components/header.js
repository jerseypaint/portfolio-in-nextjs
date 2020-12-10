import Link from 'next/link'

export default function Header({page}) {
    return (
        <header>
            <div className={'flex justify-between py-3 px-4 font-bold'}>
                <Link href={'/'}>Aaron Dielmann</Link>
                {page === `Portfolio` ? 
                    <Link href={'/'}>About</Link> :
                    <Link href={'/portfolio'}>Portfolio</Link>
                }
            </div>
        </header>
    )
  }
   