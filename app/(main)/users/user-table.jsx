import { useRouter } from 'next/navigation'
import { getAbbreviationName } from '@lib/utils'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@components/ui/table'
import { Avatar, AvatarImage, AvatarFallback } from '@components/ui/avatar'
import { Skeleton } from '@components/ui/skeleton'

import UserStatusBadge from './user-status-badge'

const UserTable = ({ users, searchParams }) => {
  const router = useRouter()

  const { pageIndex, pageSize, searchName } = searchParams

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='text-center'>#</TableHead>
          <TableHead>Người dùng</TableHead>
          <TableHead>Email</TableHead>
          <TableHead className='text-center'>Trạng thái</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user, index) => (
          <TableRow
            key={user.id}
            className='cursor-pointer'
            onClick={() => {
              router.push(`/users/${user.id}`)
            }}
          >
            <TableCell className='text-center'>{(pageIndex - 1) * pageSize + index + 1}</TableCell>
            <TableCell className='font-medium'>
              <div className='flex flex-row items-center gap-2'>
                <Avatar className='h-8 w-8 rounded-lg'>
                  <AvatarImage
                    src={user.avatar}
                    alt={user.displayName}
                    className='object-cover'
                  />
                  <AvatarFallback className='rounded-lg'>{getAbbreviationName(user.displayName || 'User')}</AvatarFallback>
                </Avatar>
                {user.displayName}
              </div>
            </TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell className='text-center'>
              <UserStatusBadge status={user.status} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export const UserTableSkeleton = ({ pageSize }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='text-center'>#</TableHead>
          <TableHead>Người dùng</TableHead>
          <TableHead>Email</TableHead>
          <TableHead className='text-center'>Trạng thái</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: pageSize || 10 }).map((_, index) => (
          <TableRow key={index}>
            <TableCell className='text-center'>
              <Skeleton className='mx-auto h-4 w-4' />
            </TableCell>
            <TableCell>
              <div className='flex flex-row items-center gap-2'>
                <Skeleton className='h-8 w-8 rounded-lg' />
                <Skeleton className='h-4 w-32' />
              </div>
            </TableCell>
            <TableCell>
              <Skeleton className='h-4 w-32' />
            </TableCell>
            <TableCell className='text-center'>
              <Skeleton className='mx-auto h-4 w-8' />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default UserTable
