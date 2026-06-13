import React from 'react'

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <div className='h-screen grid place-items-center'>
            {children}
        </div>
    )
}
