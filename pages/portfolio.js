import Layout from '../components/layout'
import styles from '../styles/Home.module.css'
import PortfolioGrid from "../components/portfolioGrid"
import { getPortfolioForHome } from './api/contentful'

export default function Home({preview, allPosts}) {
  return (
    <Layout>
      <main>
        <div className={'p-4 bg-brand-purple'}>
          <PortfolioGrid portfolio={allPosts} />
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </Layout>
  )
}


export async function getStaticProps({ preview = false }) {
  const allPosts = (await getPortfolioForHome(preview)) ?? []
  return {
    props: { preview, allPosts },
  }
}