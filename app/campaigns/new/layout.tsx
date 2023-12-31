import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'New campaign',
}

export default function NewContractLayout({
                                            children,
                                        }: {
    children: React.ReactNode
}) {
    return <section>{children}</section>
}