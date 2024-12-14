'use client'

import currency from '@lib/currency'
import { mutate, useSWRConfig } from 'swr'
import { toast } from 'sonner'

import { Star, Pencil, Trash2, ArrowDown } from 'lucide-react'

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@components/ui/carousel'
import { Badge } from '@components/ui/badge'
import { Card, CardContent, CardTitle, CardHeader } from '@components/ui/card'
import { Skeleton } from '@components/ui/skeleton'
import ConfirmationButton from '@components/confirmation-button'
import Image from 'next/image'

import ProductStatusBadge from '../product-status-badge'
import ProductRatingList from './product-rating-list'

const ProductCard = ({ product }) => {
  const { accessToken } = useSWRConfig()

  const handleTakeDown = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_API_BASE + `/products/${product.id}/admin`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ status: 'Admin_Disabled' }),
    })

    if (!res.ok) {
      toast.error(`Gỡ sản phẩm thất bại. Code: ${res.status}`)
      console.log(await res.json())

      return
    }

    toast.success(`Gỡ sản phẩm thành công.`)
    mutate(`/products/${product.id}`)
  }

  return (
    <>
      <Card>
        <CardContent className='pt-6'>
          <div className='flex flex-row gap-4'>
            {/* Product Images Carousel */}
            <div className='w-full max-w-md'>
              <Carousel>
                <CarouselContent>
                  {product.images.map((image, index) => (
                    <CarouselItem key={image.id}>
                      <Image
                        src={image.imageUrl}
                        alt={`Product image ${index + 1}`}
                        className='aspect-square w-full rounded-lg object-cover'
                        width={280}
                        height={280}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className='left-4' />
                <CarouselNext className='right-4' />
              </Carousel>
            </div>

            {/* Product Details */}
            <div className='space-y-4'>
              <h2 className='text-3xl font-bold'>{product.name}</h2>
              <div className='flex flex-wrap gap-2'>
                {product.categories.map((category) => (
                  <Badge
                    key={category.id}
                    variant='secondary'
                  >
                    {category.name}
                  </Badge>
                ))}
              </div>
              <p className='text-2xl font-semibold'>{currency.format(product.price)}</p>
              <div className='flex items-center'>
                <div className='flex'>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < Math.floor(product.rate) ? 'fill-current text-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className='ml-2 text-sm text-muted-foreground'>({product.rate.toFixed(1)})</span>
              </div>
              <p className='text-sm text-muted-foreground'>Có sẵn: {product.stock}</p>
              <ProductStatusBadge status={product.status} />
              {product.status != 'Admin_Disabled' && (
                <div className='mt-6 flex space-x-4'>
                  <ConfirmationButton
                    title='Xác nhận'
                    prompt='Sản phẩm sẽ bị gỡ khỏi nền tảng. Bạn có chắc chắn muốn gỡ sản phẩm này không?'
                    variant='destructive'
                    onConfirm={handleTakeDown}
                  >
                    <ArrowDown /> Gỡ xuống
                  </ConfirmationButton>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Mô tả sản phẩm</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{product.description}</p>
        </CardContent>
      </Card>

      <ProductRatingList productId={product.id} />
    </>
  )
}

export default ProductCard

export const ProductCardSkeleton = () => {
  return (
    <>
      <Card>
        <CardContent className='pt-6'>
          <div className='flex flex-row gap-4'>
            {/* Product Images Carousel Skeleton */}
            <div className='w-full max-w-md'>
              <Carousel>
                <CarouselContent>
                  <CarouselItem>
                    <Skeleton className='aspect-square w-full rounded-lg' />
                  </CarouselItem>
                </CarouselContent>
              </Carousel>
            </div>

            {/* Product Details Skeleton */}
            <div className='w-full space-y-4'>
              <Skeleton className='h-9 w-3/4' /> {/* Product name */}
              <div className='flex flex-wrap gap-2'>
                {[...Array(3)].map((_, index) => (
                  <Skeleton
                    key={index}
                    className='h-6 w-20'
                  />
                ))}
              </div>
              <Skeleton className='h-8 w-24' /> {/* Price */}
              <div className='flex items-center'>
                <div className='flex'>
                  {[...Array(5)].map((_, i) => (
                    <Skeleton
                      key={i}
                      className='mr-1 h-5 w-5'
                    />
                  ))}
                </div>
                <Skeleton className='ml-2 h-4 w-12' /> {/* Rating number */}
              </div>
              <Skeleton className='h-4 w-32' /> {/* Stock */}
              <Skeleton className='h-4 w-24' /> {/* Status */}
              <div className='mt-6 flex space-x-4'>
                <Skeleton className='h-10 w-32' /> {/* Action button */}
                <Skeleton className='h-10 w-32' /> {/* Action button */}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <Skeleton className='h-6 w-40' /> {/* Card title */}
        </CardHeader>
        <CardContent>
          <Skeleton className='h-4 w-full' />
          <Skeleton className='mt-2 h-4 w-full' />
          <Skeleton className='mt-2 h-4 w-3/4' />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <Skeleton className='h-6 w-40' /> {/* Card title */}
        </CardHeader>
        <CardContent>
          <Skeleton className='h-4 w-full' />
          <Skeleton className='mt-2 h-4 w-full' />
          <Skeleton className='mt-2 h-4 w-3/4' />
        </CardContent>
      </Card>
    </>
  )
}
