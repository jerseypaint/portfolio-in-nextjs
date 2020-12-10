import Head from 'next/head'
import Header from "./header"
import Footer from "./footer"

export default function Layout({ children, page }) {
    return (
        <>
            <Head>
                <title>Aaron Dielmann{page ? ` | ${page}` : ``}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header page={page} />
            <div>{children}</div>
            <Footer />
        </>
    )
  }
   