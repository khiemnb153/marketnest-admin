import { getAbbreviationName } from '@lib/utils'
import { toast } from 'sonner'
import { mutate, useSWRConfig } from 'swr'

import { Ban, RotateCcw } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@components/ui/card'
import { Skeleton } from '@components/ui/skeleton'
import ConfirmationButton from '@components/confirmation-button'

import UserStatusBadge from '../user-status-badge'

export default function UserCard({ user }) {
  const { accessToken } = useSWRConfig()

  const handleToogleStatus = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_API_BASE + `/users/${user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ status: user.status == 'DISABLED' ? 'ACTIVE' : 'DISABLED' }),
    })

    if (!res.ok) {
      toast.error(`Khóa người dùng thất bại. Code: ${res.status}`)

      return
    }

    toast.success(`Khóa người dùng thành công.`)
    mutate(`/users/${user.id}`)
  }

  console.log(user)

  return (
    <Card className='mx-auto w-full max-w-md'>
      <CardHeader className='flex flex-row items-center gap-4'>
        <Avatar className='h-20 w-20'>
          <AvatarImage
            src={user.avatar}
            alt={user.displayName}
          />
          <AvatarFallback>{getAbbreviationName(user.displayName || 'User')}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className='text-2xl'>{user.displayName}</CardTitle>
          <p className='text-sm text-muted-foreground'>@{user.username}</p>
        </div>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div>
          <p className='text-sm font-medium text-muted-foreground'>Email</p>
          <p>{user.email}</p>
        </div>
        <div>
          <p className='text-sm font-medium text-muted-foreground'>Status</p>
          <UserStatusBadge status={user.status} />
        </div>
      </CardContent>
      <CardFooter>
        {user.status != 'PENDING' && (
          <ConfirmationButton
            variant={user.status == 'DISABLED' ? 'default' : 'destructive'}
            title='Xác nhận'
            prompt={`Bạn có chắc chắn muốn ${user.status == 'DISABLED' ? 'MỞ KHÓA' : 'KHÓA'} người dùng này không?`}
            onConfirm={handleToogleStatus}
          >
            {user.status == 'DISABLED' ? (
              <>
                <RotateCcw /> Mở khóa
              </>
            ) : (
              <>
                <Ban /> Khóa
              </>
            )}
          </ConfirmationButton>
        )}
      </CardFooter>
    </Card>
  )
}

export function UserCardSkeleton() {
  return (
    <Card className='mx-auto w-full max-w-md'>
      <CardHeader className='flex flex-row items-center gap-4'>
        <Skeleton className='h-20 w-20 rounded-full' />
        <div className='space-y-2'>
          <Skeleton className='h-6 w-32' />
          <Skeleton className='h-4 w-24' />
        </div>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='space-y-2'>
          <Skeleton className='h-4 w-16' />
          <Skeleton className='h-4 w-48' />
        </div>
        <div className='space-y-2'>
          <Skeleton className='h-4 w-16' />
          <Skeleton className='h-6 w-20' />
        </div>
      </CardContent>
      <CardFooter>
        <Skeleton className='h-10 w-24' />
      </CardFooter>
    </Card>
  )
}
