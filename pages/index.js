import { useState } from "react"
import Layout from '../components/layout'
import Link from 'next/link'
import Image from 'next/image'
import { getAboutPage } from './api/contentful'
import { BLOCKS, MARKS } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import SwiperCore, {Pagination, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import PortfolioItem from "../components/portfolioItem"


export default function About({post, preview, portfolio}) {
    SwiperCore.use([ Pagination, A11y])
    const [copied, setCopied] = useState(false)

    const Bold = ({ children }) => <span className="font-bold">{children}</span>

    const Text = ({ children }) => <p className="mb-4">{children}</p>

    const options = {
        renderMark: {
            [MARKS.BOLD]: text => <Bold>{text}</Bold>
        },
        renderNode: {
            [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>
        }
    }

    const copyEmail = () => {
        navigator.clipboard.writeText(post.email)
        setCopied(true)
    }

  return (
    <Layout>
        <div className={'container mx-auto mb-8 px-4'}>
            <div className={'grid grid-cols-1 md:grid-cols-2 gap-4 py-8'}>
                <div className={'relative flex flex-col justify-between max-w-md'}>
                    <p className={'subtitle'}>{post.subtitle}</p>
                    <div className={'order-first md:order-none flex flex-col-reverse md:flex-row items-center my-8'}>
                        <h1 className={'mr-4'}>{post.title}</h1>
                        <Image className={'rounded-full'} src={post.me.url} alt="a headshot photo of me" height={'120'} width={'120'} />
                    </div>
                    <div className={'my-8'}>
                    <button className={'button block mb-4'} onClick={copyEmail} name={`copy email button`} type={`button`} value={copied ? `Copied!` : post.email}>{copied ? `Copied!` : post.email}</button>
                        <a href={'https://www.linkedin.com/in/aarondielmann/'} className={'block ml-2'} target={`_blank`}><img src={post.socials.icon.url} className={'social-icon h-6'} /></a>
                </div>
                </div>
                <div className={'relative'}>
                    <div className={''}>
                        <Swiper
                            spaceBetween={0}
                            slidesPerView={1.1}
                            spaceBetween={16}
                            pagination={{ clickable: true }}
                            onSlideChange={() => console.log('slide change')}
                            onSwiper={(swiper) => console.log(swiper)}
                            >
                                {post.portfolioCollection.items.map((item, key) => (
                                    <SwiperSlide className={``} key={`${item.title}-${key}`}>
                                        <PortfolioItem imageUrl={item.coverImage.url} title={item.title} description={item.description} slug={item.slug} key={`${item.title}-${key}-${key}`} />
                                    </SwiperSlide>
                                ))}
                                <SwiperSlide>
                                    <div className={`relative pt-full lg:pt-2/3 lg:absolute h-full w-full rounded-md overflow-hidden`}>
                                        <div className={`bg-gray-100 flex justify-center items-center absolute top-0 left-0 right-0 bottom-0 h-full w-full p-4 md:p-12`}>
                                            <Link href={`/portfolio`} passHref>
                                                <a href={`/portfolio`} className={`button`}>See more work</a>
                                            </Link>
                                        </div>
                                    </div>
                                </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
            </div>
        </div>
        <div className={'relative container mx-auto px-4'}>
            <div className={'mx-auto max-w-lg p-1'}>
                <div className={'mb-24'}>
                {documentToReactComponents(post.bio.json, options)}
                </div>
                <div>
                    <h2>Skills</h2>
                    <ul className={'grid grid-cols-2 mb-24'}>
                        {post.skillsCollection.items.map((item, key)=> (
                                <li className={'my-2'} key={item.name + '' + key}>{item.name}</li>
                            ))}
                    </ul>
                </div>
                <div>
                    <h2>Technologies</h2>
                    <ul className={'grid grid-cols-3 mb-24'}>
                        {post.technologiesCollection.items.map((item, key) => (
                            <li className={'my-2'} key={item.name + '' + key}>{item.name}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
        <div className={'text-center mb-24'}>
            <Link href={'/portfolio'} passHref>
                <a href="/portfolio" className={'button'}>See my work</a>
            </Link>
        </div>
    </Layout>
  )
}

export async function getStaticProps({ preview = false }) {
    const data = await getAboutPage(preview)
    return {
        props: {
          preview,
          post: data?.post ?? null,
        },
      }
  }