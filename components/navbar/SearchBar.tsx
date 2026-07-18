
import React, { Dispatch, SetStateAction } from 'react'
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../ui/command'

interface Props { open: boolean, setOpen: Dispatch<SetStateAction<boolean>> }

export default function SearchBar({ open, setOpen }: Props) {
    return (
        <CommandDialog
            className='top-20'
            open={open} onOpenChange={setOpen}>
            <Command>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                    <CommandEmpty>No result found</CommandEmpty>
                    <CommandGroup heading="Suggestions">
                        <CommandItem>Calendar</CommandItem>
                    </CommandGroup>
                </CommandList>
            </Command>
        </CommandDialog>
    )
}
