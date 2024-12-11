import { mutate, useSWRConfig } from 'swr'
import { toast } from 'sonner'

import { Check, X, Ban, RotateCcw } from 'lucide-react'

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@components/ui/card'
import { Badge } from '@components/ui/badge'
import { Separator } from '@components/ui/separator'
import { Skeleton } from '@components/ui/skeleton'
import Image from 'next/image'
import ConfirmationButton from '@components/confirmation-button'

import ShopStatusBadge from '../shop-status-badge'

export default function ShopCard({ shop }) {
  const { accessToken } = useSWRConfig()

  const handleChangeStatus = async (newState) => {
    const res = await fetch(process.env.NEXT_PUBLIC_API_BASE + `/shops/${shop.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ status: newState }),
    })

    if (!res.ok) {
      toast.error(`Cập nhật trạng thái cửa hàng thất bại. Code: ${res.status}`)
      console.log(await res.json())

      return
    }

    toast.success(`Cập nhật trạng thái cửa hàng thành công.`)
    mutate(`/shops/${shop.id}`)
  }

  return (
    <Card className='mx-auto w-full max-w-3xl'>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <CardTitle className='text-2xl'>{shop.name}</CardTitle>
          <ShopStatusBadge
            status={shop.status}
            variant={'default'}
          />
        </div>
      </CardHeader>
      <CardContent className='space-y-4'>
        {}
        <Image
          src={shop.image || 'https://placehold.co/600x400/png'}
          alt={shop.name}
          height={256}
          width={768}
          className='h-64 w-full rounded-md object-cover'
        />
        <p className='text-muted-foreground'>{shop.description}</p>
        <Separator />
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <h3 className='font-semibold'>Địa chỉ</h3>
            <p>{shop.address}</p>
            <p>
              {shop.city}, {shop.state}
            </p>
            <p>{shop.country}</p>
          </div>
          <div>
            <h3 className='font-semibold'>Đánh giá</h3>
            <p>{shop.rate}/5</p>
            <h3 className='mt-2 font-semibold'>Danh mục</h3>
            <div className='flex flex-wrap gap-2'>
              {shop.categories.map((category, index) => (
                <Badge
                  key={category.id}
                  variant='outline'
                >
                  {category.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className='flex justify-end space-x-2'>
        {shop.status === 'Pending' && (
          <>
            <ConfirmationButton
              variant='default'
              title='Xác nhận'
              prompt='Bạn có chắc chắn muốn CHẤP THUẬN yêu cầu mở cửa hàng này không?'
              onConfirm={() => {
                handleChangeStatus('Active')
              }}
            >
              <Check /> Chấp thuận
            </ConfirmationButton>
            <ConfirmationButton
              variant='destructive'
              title='Xác nhận'
              prompt='Bạn có chắc chắn muốn TỪ CHỐI yêu cầu mở cửa hàng này không?'
              onConfirm={() => {
                handleChangeStatus('Rejected')
              }}
            >
              <X /> Từ chối
            </ConfirmationButton>
          </>
        )}
        {shop.status === 'Active' && (
          <ConfirmationButton
            variant='destructive'
            title='Xác nhận'
            prompt='Bạn có chắc chắn muốn ĐÌNH CHỈ cửa hàng này không?'
            onConfirm={() => {
              handleChangeStatus('Deactivated')
            }}
          >
            <Ban /> Đình chỉ
          </ConfirmationButton>
        )}
        {shop.status === 'Deactivated' && (
          <ConfirmationButton
            variant='secondary'
            title='Xác nhận'
            prompt='Bạn có chắc chắn muốn MỞ LẠI cửa hàng này không?'
            onConfirm={() => {
              handleChangeStatus('Active')
            }}
          >
            <RotateCcw /> Mở lại
          </ConfirmationButton>
        )}
      </CardFooter>
    </Card>
  )
}

export function ShopCardSkeleton() {
  return (
    <Card className='mx-auto w-full max-w-3xl'>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <Skeleton className='h-8 w-64' />
          <Skeleton className='h-6 w-24' />
        </div>
      </CardHeader>
      <CardContent className='space-y-4'>
        <Skeleton className='h-64 w-full rounded-md' />
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-3/4' />
        <Separator />
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <Skeleton className='mb-2 h-6 w-24' />
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-3/4' />
            <Skeleton className='h-4 w-1/2' />
          </div>
          <div>
            <Skeleton className='mb-2 h-6 w-24' />
            <Skeleton className='h-4 w-1/2' />
            <Skeleton className='mb-2 mt-2 h-6 w-24' />
            <div className='flex flex-wrap gap-2'>
              <Skeleton className='h-6 w-16' />
              <Skeleton className='h-6 w-20' />
              <Skeleton className='h-6 w-24' />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className='flex justify-end space-x-2'>
        <Skeleton className='h-10 w-24' />
      </CardFooter>
    </Card>
  )
}
