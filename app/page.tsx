import Login from '@/components/auth/Login'
import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from './api/auth/[...nextauth]/route'

export default async function Home() {
  const session = await getServerSession(authOptions)
  console.log(session);
  return (
    <div>
      <div className='ring-2 my-10'>
        {JSON.stringify(session)}
      </div>
      <Login />
    </div>
  )
}
