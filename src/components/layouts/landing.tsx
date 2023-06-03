import React from 'react'
import Head from 'next/head'
import { Layout } from 'antd'

type LayoutProps = {
  children: React.ReactNode
}

export default function Landing({ children }: LayoutProps) {
  return (
    <>
      <Head>
        <title>Cửa hàng sửa chữa xe máy N&N</title>
        <meta name="title" content="Cửa hàng sửa chữa xe máy N&N" />
        <meta name="description" content="Cửa hàng sửa chữa xe máy N&N" />
      </Head>
      <main>
        <Layout className="landing-layout">
          {children}
        </Layout>
      </main>
    </>
  )
}
