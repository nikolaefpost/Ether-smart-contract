import React from 'react';
import {Metadata} from 'next';
import "./global.css"

export const metadata: Metadata = {
    title: 'Next.js',
}

export default function RootLayout({children}: { children: React.ReactNode }) {

    return (
        <html lang="en">
        <body>
        <div className="container mx-auto h-screen bg-slate-50">
            <header
                className="fixed top-[10px]  h-[50px] flex justify-between items-center mx-auto container
                 bg-cyan-600 text-white rounded-sm"
            >
                <div className="px-3 h-full flex items-center border-r border-white">CrowdCoin</div>
                <div className="h-full flex">
                    <div className="h-full flex items-center px-3 border-l border-white">Campaigns</div>
                    <button className="ml-4 px-6 border-l border-white">+</button>
                </div>

            </header>
            <div className="mt-[60px] ">
                {children}
            </div>

        </div>
        </body>
        </html>

    )
}