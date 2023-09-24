import './globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import Head from 'next/head';

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'AWS Product Announcements',
    description: 'AWS Product Announcements',
    icons: [
        {
            rel: 'icon',
            url: '/favicon.png',
        }
    ]
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className="h-full bg-gray-50">
        <Head>
            <link rel="icon" href="/favicon.png"/>
            <title>AWS Product Announcements</title>
            <meta property="og:image" content="/og.png"/>
            <meta
                name="description"
                content="AWS Product Announcements without boring nonsense stuff"
            />
        </Head>
        <body className={inter.className + ' h-full'}>{children}</body>
        </html>
    )
}
