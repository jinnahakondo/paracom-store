"use client"
import React from 'react'
import { Button } from '../ui/button'
import { FcGoogle } from 'react-icons/fc'
import { signIn } from 'next-auth/react'

export default function SocialLogin() {
    return (
        <div>
            <Button
                variant={"outline"}
                size={"lg"}
                className='w-full'
                onClick={() => signIn("google")}
            >
                <FcGoogle />
                <span className='text-foreground'>
                    Continue with Google
                </span>
            </Button>
        </div>
    )
}
