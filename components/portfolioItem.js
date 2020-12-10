import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Close } from "../components/icons"

export default function PortfolioItem({imageUrl, title, description, slug}) {
    const [reveal, setReveal] = useState(false)
    const [stay, setStay] = useState(false)

    useEffect(() => {
        const desc = document.querySelector(`.desc.${slug}`)

        if (reveal) {
            desc.classList.add("reveal")
        } else {
            desc.classList.remove("reveal")
        }

        if (stay) {
            desc.classList.add("stay")
        } else {
            desc.classList.remove("stay")
        }
      }, [reveal, stay])

      const stayOnClick = (event) => {
        setStay(!stay)
    }

    const closeOnClick = (event) => {
        setStay(false)
    }

    const revealOnMouseEnter = (event) => {
        setReveal(true)
    }

    const hideOnMouseLeave = (event) => {
        setReveal(false)
    }
    
    return (
        <div className={`relative mb-8 lg:pb-2/3 lg:mb-0 overflow-hidden`} onMouseEnter={revealOnMouseEnter} onMouseLeave={hideOnMouseLeave} onClick={stayOnClick}>
                <div className={`relative pt-full lg:pt-2/3 lg:absolute h-full w-full object-cover`}>
                    <Image
                        src={imageUrl}
                        alt="placeholder"
                        layout="fill"
                        objectFit={`cover`}
                        className={`rounded-md`}
                    />
                </div>
                <div>
                    <div className={`desc ${slug} absolute top-0 left-full right-0 bottom-0 h-full w-full p-4 md:p-12 flex flex-col justify-between rounded-md bg-brand-gray text-white overflow-hidden transition-height duration-500 translate-x-64`}>
                            <div>
                                <h2 className={`mb-2`}>{title}</h2>
                                <p>{description}</p>
                            </div>
                            <div className={`text-center w-full mt-2`}>
                                <Link href={`/portfolio/${slug}`} passHref>
                                    <a href={`/portfolio/${slug}`} className={`button border-2 border-white bg-transparent hover:bg-white hover:text-brand-gray`}>Read More</a>
                                </Link>
                            </div>
                            <div className={`absolute top-2 right-2 h-6 w-6 lg:h-8 lg:w-8`}>
                                <button onClick={closeOnClick}><Close color={`#fff`} /></button>
                            </div>
                        </div>
                </div>

        </div>
    )
  }
   