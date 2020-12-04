import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChatBubble, RightArrow } from "../components/icons"

export default function PortfolioItem({imageUrl, title, description, slug}) {
    const [reveal, setReveal] = useState(false);
    const [stay, setStay] = useState(false);

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

      const revealOnClick = (event) => {
        setStay(!stay)
    }

    const revealOnMouseEnter = (event) => {
        setReveal(true)
    }

    const hideOnMouseLeave = (event) => {
        setReveal(false)
    }
    
    return (
        <div className={`relative mb-8 lg:pb-2/3 lg:mb-0`} reveal={reveal} stay={stay}>

        {(reveal || stay) ? 
            <Link href={`/portfolio/${slug}`} passHref>
                <a href={`/portfolio/${slug}`} className={`block button-desc bg-brand-purple`} onClick={revealOnClick} onMouseEnter={revealOnMouseEnter} onMouseLeave={hideOnMouseLeave}>
                    <span>
                    {(reveal || stay) ? <RightArrow color={`#fff`} />: <ChatBubble color={`#fff`} />}
                    </span>
                </a>
            </Link>
            :
            <button className={`button-desc bg-brand-gray`} onClick={revealOnClick} onMouseEnter={revealOnMouseEnter} onMouseLeave={hideOnMouseLeave}>
                <span>
                    {(reveal || stay) ? <RightArrow color={`#fff`} />: <ChatBubble color={`#fff`} />}
                </span>
            </button>
         }
            <Link href={`/portfolio/${slug}`} passHref>
                <a href={`/portfolio/${slug}`} className={`block`}>
                <div className={`relative pt-2/3 lg:absolute h-full w-full object-cover`}>
                    <Image
                        src={imageUrl}
                        alt="placeholder"
                        layout="fill"
                        objectFit={`cover`}
                        className={`rounded-md`}
                    />
                </div>
                <div className={`desc ${slug} absolute top-0 left-0 w-full rounded-md bg-white h-0 overflow-hidden`}>
                        <h2>{title}</h2>
                        <p>{description}</p>
                    </div>
                </a>
            </Link>
        </div>
    )
  }
   