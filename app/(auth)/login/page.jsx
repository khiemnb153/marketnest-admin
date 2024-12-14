import { getServerSession } from 'next-auth'
import authOptions from '@lib/auth-options'
import { redirect } from 'next/navigation'
import { cn } from '@lib/utils'

import Image from 'next/image'
import Link from 'next/link'
import { buttonVariants } from '@components/ui/button'
import { LoginForm } from '@components/login-form'

const LoginPage = async ({ searchParams }) => {
  const { callbackUrl } = await searchParams

  const session = await getServerSession(authOptions)

  if (!!session) {
    redirect(callbackUrl || '/')
  }

  // return (
  //   <div className='flex h-screen w-full items-center justify-center px-4'>
  //     <LoginForm />
  //   </div>
  // )

  return (
    <div className='flex h-screen w-full items-center justify-center'>
      <div className='container relative hidden h-full flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
        <div className='relative hidden h-full flex-col p-10 text-white dark:border-r lg:flex'>
          <Image
            src={'/background.jpg'}
            width={1280}
            height={843}
            alt='Authentication'
            className='absolute left-0 top-0 h-full object-cover'
          />
          <div className='relative z-20 flex items-center text-4xl font-bold uppercase'>
            <Image
              src={'/logo.png'}
              width={64}
              height={64}
              alt='MarketNest'
            />
            MarketNest
          </div>
        </div>
        <div className='lg:p-8'>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}

export default LoginPage
