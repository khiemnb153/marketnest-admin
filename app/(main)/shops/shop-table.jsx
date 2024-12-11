import { getAbbreviationName } from '@lib/utils'
import { useRouter } from 'next/navigation'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@components/ui/table'
import { Avatar, AvatarImage, AvatarFallback } from '@components/ui/avatar'
import { Badge } from '@components/ui/badge'
import { Skeleton } from '@components/ui/skeleton'

import ShopStatusBadge from './shop-status-badge'

const ShopTable = ({ shops, searchParams }) => {
  const router = useRouter()
  const { pageIndex, pageSize, searchName } = searchParams

  console.log(shops)

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='text-center'>#</TableHead>
          <TableHead>Gian hàng</TableHead>
          <TableHead>Chủ sở hữu</TableHead>
          <TableHead>Danh mục</TableHead>
          <TableHead className='text-center'>Trạng thái</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {shops.map((shop, index) => (
          <TableRow
            key={shop.id}
            className='cursor-pointer'
            onClick={() => {
              router.push(`/shops/${shop.id}`)
            }}
          >
            <TableCell className='text-center'>{(pageIndex - 1) * pageSize + index + 1}</TableCell>
            <TableCell className='font-medium'>
              <div className='flex flex-row items-center gap-2'>
                <Avatar className='h-8 w-8 rounded-lg'>
                  <AvatarImage
                    src={shop.image}
                    alt={shop.name}
                    className='object-cover'
                  />
                  <AvatarFallback className='rounded-lg'>{getAbbreviationName(shop.name)}</AvatarFallback>
                </Avatar>
                {shop.name}
              </div>
            </TableCell>
            <TableCell>
              <div className='flex flex-row items-center gap-2'>
                <Avatar className='h-8 w-8 rounded-lg'>
                  <AvatarImage
                    src={shop.owner.avatar}
                    alt={shop.owner.displayName}
                    className='object-cover'
                  />
                  <AvatarFallback className='rounded-lg'>
                    {getAbbreviationName(shop.owner.displayName || 'User')}
                  </AvatarFallback>
                </Avatar>
                {shop.owner.displayName}
              </div>
            </TableCell>
            <TableCell>
              <div className='flex w-96 flex-row flex-wrap gap-1'>
                {shop.categories.map((cat) => (
                  <Badge
                    variant='outline'
                    key={cat.id}
                    className='text-nowrap'
                  >
                    {cat.name}
                  </Badge>
                ))}
              </div>
            </TableCell>
            <TableCell className='text-center'>
              <ShopStatusBadge status={shop.status} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default ShopTable

export const ShopTableSkeleton = ({ pageSize }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='text-center'>#</TableHead>
          <TableHead>Gian hàng</TableHead>
          <TableHead>Chủ sở hữu</TableHead>
          <TableHead>Danh mục</TableHead>
          <TableHead className='text-center'>Trạng thái</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: pageSize }).map((_, index) => (
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
              <div className='flex flex-row items-center gap-2'>
                <Skeleton className='h-8 w-8 rounded-lg' />
                <Skeleton className='h-4 w-32' />
              </div>
            </TableCell>
            <TableCell>
              <div className='flex w-96 flex-row flex-wrap gap-1'>
                <Skeleton className='h-4 w-16' />
                <Skeleton className='h-4 w-16' />
                <Skeleton className='h-4 w-16' />
              </div>
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
