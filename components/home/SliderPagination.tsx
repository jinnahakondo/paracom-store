import React from 'react'

export default function SliderPagination({ count, current }: {
    count: number,
    current: number
}) {
    return (
        <div className="flex items-center justify-center gap-2">
            {
                [...Array(count)].map((_, i: number) => (<div
                    key={i}
                    className={`h-3 w-3 rounded-full
                            ${current === i + 1 ? "bg-primary" : "bg-slate-400"}
                            `}></div>))
            }
        </div>
    )
}
