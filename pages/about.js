import Layout from '../components/layout'
import Link from 'next/link'
import Image from 'next/image'
import { getAboutPage } from './api/contentful'
import { BLOCKS, MARKS } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

export default function About({post, preview}) {

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

  return (
    <Layout>
        <div className={'container mx-auto mb-24 px-4'}>
            <div className={'grid grid-cols-1 md:grid-cols-2 gap-4'}>
                <div className={'relative flex flex-col justify-center max-w-md'}>
                    <p className={'subtitle md:absolute top-8'}>{post.subtitle}</p>
                    <div className={'order-first md:order-none flex flex-col-reverse md:flex-row items-center my-8'}>
                        <h1 className={'mr-4'}>{post.title}</h1>
                        <Image className={'rounded-full'} src={post.me.url} alt="a headshot photo of me" height={'120'} width={'120'} />
                    </div>
                    <div className={'my-8'}>
                    <button className={'button block mb-4'}>{post.email}</button>
                    <a href={'https://www.linkedin.com/in/aarondielmann/'} className={'block ml-2'}><img src={post.socials.icon.url} className={'h-6'} /></a>
                </div>
                </div>
                <div className={'relative h-66vh'}>
                    <div className={'h-full'}>
                        <Image
                            src={post.featuredImage.url}
                            alt="placeholder"
                            layout="fill"
                            objectFit={'cover'}
                        />
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
                        {post.skillsCollection.items.map(item => (
                                <li className={'my-2'}>{item.name}</li>
                            ))}
                    </ul>
                </div>
                <div>
                    <h2>Technologies</h2>
                    <ul className={'grid grid-cols-3 mb-24'}>
                        {post.technologiesCollection.items.map(item => (
                            <li className={'my-2'}>{item.name}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
        <div className={'text-center mb-24'}>
            <Link href={'/'} passHref>
                <a href="/" className={'button'}>See my work</a>
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