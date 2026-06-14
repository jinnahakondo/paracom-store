import { Search } from 'lucide-react'
import React from 'react'
import { Input } from '../ui/input'

export default function SearchBar() {
    return (
        <div className='relative w-full max-w-64'>
            <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
            <Input
                type='text'
                placeholder='Search AI hardware...'
                className='pl-9 rounded-full bg-muted/50 border-input focus-visible:ring-1 focus-visible:ring-ring'
            />
        </div>
    )
}
