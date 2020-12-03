import Image from 'next/image'
import Link from 'next/link'

export default function PortfolioItem({imageUrl, title, description, link}) {
    return (
        <div className={'relative mb-8 lg:pb-2/3 lg:mb-0'}>
            <Link href={'/portfolio/'+link} passHref>
                <a href={'/portfolio/'+link} className={'block'}>
                <div className={'relative pt-2/3 lg:absolute h-full w-full object-cover'}>
                    <Image
                        src={imageUrl}
                        alt="placeholder"
                        layout="fill"
                        objectFit={'cover'}
                        className={'rounded-md'}
                    />
                </div>
                <div className={'relative mt-4 lg:absolute lg:bottom-4 lg:right-4 lg:w-2/3 border-2 border-brand-gray rounded-md p-4 bg-white'}>
                        <h2>{title}</h2>
                        <p>{description}</p>
                    </div>
                </a>
            </Link>
        </div>
    )
  }
   