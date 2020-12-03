import Head from 'next/head'
import Header from "./header"

export default function Layout({ children }) {
    return (
        <>
        <Head>
            <title>This works</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <div>{children}</div>
        </>
    )
  }
   