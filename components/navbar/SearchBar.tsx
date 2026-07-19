"use client"
import React, { Dispatch, SetStateAction, useState, useEffect } from 'react'
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../ui/command'
import { useQuery } from '@tanstack/react-query'
import { getSearchSuggesion } from '@/lib/fetchData'
import { SearchSuggestionItem } from '../search-suggetion/SearchSuggestionItem'
import { SearchSuggestionItemType } from '@/types/types'
import { useRouter } from 'next/navigation'

interface Props { open: boolean, setOpen: Dispatch<SetStateAction<boolean>> }

export default function SearchBar({ open, setOpen }: Props) {
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const router = useRouter();

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search);
        }, 300);

        return () => clearTimeout(handler);
    }, [search]);

    const { data, isLoading, error } = useQuery({
        queryKey: ['search-suggesion', debouncedSearch],
        queryFn: () => getSearchSuggesion(debouncedSearch),
        enabled: debouncedSearch.length >= 2,
        staleTime: 1000 * 60 * 5,
    });

    const suggestions = data?.data ?? [];

    return (
        <CommandDialog
            open={open}
            onOpenChange={setOpen}
            className='top-20'
        >
            <Command>
                <CommandInput
                    placeholder="Type to search products..."
                    value={search}
                    onValueChange={setSearch}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            router.push(`/shop?search=${search}`)
                        }
                    }}

                />
                <CommandList>
                    {/* loading state */}
                    {isLoading && <div className="p-4 text-sm text-muted-foreground text-center">Loading suggestions...</div>}

                    {
                        !isLoading && debouncedSearch.length >= 2 &&
                        <CommandEmpty>No result found</CommandEmpty>
                    }

                    {/* suggetions */}
                    {!isLoading && suggestions.length > 0 && (
                        <CommandGroup

                            heading="Suggestions">
                            {suggestions.map((item: SearchSuggestionItemType) => (
                                <CommandItem
                                    key={item.slug}
                                    value={item.title}
                                    onSelect={(currentValue) => {
                                        setOpen(false);
                                    }}
                                >
                                    <SearchSuggestionItem
                                        {...item}

                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    )}
                </CommandList>
            </Command>
        </CommandDialog>
    )
}