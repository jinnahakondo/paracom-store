"use client"
import React from 'react'
import { Button } from '../ui/button'
import { FcGoogle } from 'react-icons/fc'
import { signIn } from 'next-auth/react'
import { useCartStore } from '@/store/useCartStore'

export default function SocialLogin() {

    const mergeCartWithDb = useCartStore(state => state.mergeCartWithDb);
    const fetchAddresses = useCartStore(state => state.fetchAddresses)

    return (
        <div>
            <Button
                variant={"outline"}
                size={"lg"}
                className='w-full'
                onClick={async () => {
                    const res = await signIn("google");
                    if (res?.ok) {
                        mergeCartWithDb();
                    }
                }}
            >
                <FcGoogle />
                <span className='text-foreground'>
                    Continue with Google
                </span>
            </Button>
        </div>
    )
}
