import React from 'react';
import {Metadata} from 'next';
import "./global.css"
import { Header } from "../components";

export const metadata: Metadata = {
    title: 'Kick-start',
}

export default function RootLayout({children}: { children: React.ReactNode }) {

    return (
        <html lang="en">
        <body>
        <div className="container mx-auto h-screen bg-slate-50">
            <Header/>
            <div className="mt-[60px] ">{children}</div>
        </div>
        </body>
        </html>

    )
}