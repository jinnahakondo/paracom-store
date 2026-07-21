import Footer from '@/components/footer/Footer'
import Navbar from '@/components/navbar/Navbar'
import React, { ReactNode } from 'react'

export default function MainLayout({ children }: { children: ReactNode }) {
    return (
        <div>
            <div className="sticky top-0 z-40">
                <Navbar />
            </div>
            <main className="px-3 min-h-full flex flex-col max-w-7xl mx-auto">
                {children}
            </main>
            <Footer />
        </div>
    )
}
