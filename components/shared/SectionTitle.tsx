import React from 'react'

export default function Title({ children }: { children: React.ReactNode }) {

    return (
        <h2 className='text-[32px] font-bold text-foreground mb-10'>{children}</h2>
    )
}
