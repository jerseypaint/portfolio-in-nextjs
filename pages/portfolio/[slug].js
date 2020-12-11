import Layout from "../../components/layout"
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { getPortfolioItem, getAllItemsWithSlug } from '../api/contentful'
import Image from 'next/image'
import { BLOCKS, MARKS } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

export default function Post({ post, preview }) {
    const router = useRouter()
  
    if (router.isFallback) {
      // your loading indicator
      return <div>loading...</div>
    }

    if (!router.isFallback && !post) {
      return <ErrorPage statusCode={404} />
    }

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
      <Layout page={post.title}>
        <div className={''}>
          <div className={'container mx-auto mb-24 px-4'}>
              <div className={'grid grid-cols-1 md:grid-cols-2 gap-4'}>
                  <div className={'relative flex flex-col justify-center max-w-md'}>
                      <p className={'subtitle md:absolute top-8'}>{post.subtitle}</p>
                      <h1 className={'order-first md:order-none my-8'}>{post.title}</h1>
                      <div>
                          <ul className={'flex flex-wrap'}>
                          {post.technologiesCollection.items.map((item, key) => (
                              <li className={'mr-1'} key={item.name + '' + key}>{item.name}{key < post.technologiesCollection.items.length - 1 && <span className={'mx-2'}>/</span> }</li>
                          ))}
                          </ul>
                      </div>
                  </div>
                  <div className={'relative h-66vh my-4'}>
                      <div className={''}>
                          <Image
                              src={post.heroImage.url}
                              alt="placeholder"
                              layout={'fill'}
                              objectFit={'cover'}
                              className={'rounded-md bg-brand-gray'}
                          />
                      </div>
                  </div>
              </div>
          </div>
        </div>
        <div className={'mx-auto max-w-lg mb-24 px-4'}>
            {documentToReactComponents(post.introduction.json, options)}
        </div>
        <div className={'bg-brand-purple py-24'}>
          <div className={'mx-auto max-w-5xl px-4 text-center'}>
              {post.imageGalleryCollection.items.map((item, key) =>{ 
                const widthNew =  ((1024 / item.width) * item.width)
                const heightNew = ((1024 / item.width) * item.height)
                return (
                <div key={item.name + '' + key}>
                  <div className={'relative mb-8 rounded-md'}>        
                    <Image 
                      src={item.url}
                      width={widthNew}
                      height={heightNew}
                      layout={'intrinsic'}
                      alt={item.description}
                      className={'rounded-md bg-brand-gray'}
                      />
                  </div>
                </div>
              )})}
          </div>
        </div>

        {post.conclusion && 
            <div className={'mx-auto max-w-lg mb-24 px-4'}>
                {documentToReactComponents(post.conclusion.json, options)}
            </div>
        }
      </Layout>
    )
  }
  
  export async function getStaticProps({ params, preview = false }) {
    const data = await getPortfolioItem(params.slug, preview)
  
    return {
      props: {
        preview,
        post: data?.post ?? null,
      },
    }
  }
  
  export async function getStaticPaths() {
    const allPosts = await getAllItemsWithSlug()
    return {
      paths: allPosts?.map(({ slug }) => `/portfolio/${slug}`) ?? [],
      fallback: true,
    }
  }