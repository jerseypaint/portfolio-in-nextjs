import Layout from '../components/layout'
import PortfolioGrid from "../components/portfolioGrid"
import { getPortfolioForHome } from './api/contentful'

export default function Home({preview, allPosts}) {
  return (
    <Layout page={`Portfolio`}>
      <main>
        <div className={'p-4 bg-brand-purple'}>
          <PortfolioGrid portfolio={allPosts} />
        </div>
      </main>
    </Layout>
  )
}


export async function getStaticProps({ preview = false }) {
  const allPosts = (await getPortfolioForHome(preview)) ?? []
  return {
    props: { preview, allPosts },
  }
}