import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'New contract',
}

export default function NewContractLayout({
                                            children,
                                        }: {
    children: React.ReactNode
}) {
    return <section>{children}</section>
}