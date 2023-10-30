import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'AWS Product Announcements',
    description: 'AWS Product Announcements without boring nonsense stuff',
    metadataBase: new URL('https://awsnews.info'),
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className="h-full bg-gray-50">
            <body className={inter.className + ' h-full' + ' bg-gray-50'}>
                {children}
                <Analytics />
            </body>
        </html>
    )
}
