import Link from 'next/link'

export default function Footer({page}) {
    return (
        <footer>
            <div className={'lg:flex justify-between py-3 px-4 border-t'}>
                <div className={`font-bold`}>
                    <Link href={'/'}>Aaron Dielmann</Link>
                </div>
                <div className={``}>
                    <Link href={'/'} className={`mr-8`} passhref>
                        <a className={`mr-8`} href={`/`}>About</a>
                    </Link>
                    <Link href={'/portfolio'}>Portfolio</Link>
                </div>
                <div>
                    <p className={`text-sm`}>Built with Next.js, Tailwind CSS, and powered by Vercel</p>
                </div>
            </div>
        </footer>
    )
  }
   