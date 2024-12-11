'use client'

import { use } from 'react'
import useFetch from '@hooks/use-fetch'

import AppWrapper from '@components/app-wrapper'
import ShopCard, { ShopCardSkeleton } from './shop-card'

const ShopPage = ({ params }) => {
  const { id } = use(params)

  const { data, error, isLoading } = useFetch(`/shops/${id}`)

  const renderShop = () => {
    if (isLoading) {
      return <ShopCardSkeleton />
    }

    if (error) {
      return (
        <span>
          Something went wrong!!!
          <br />
          Code: {error.status}
        </span>
      )
    }

    return <ShopCard shop={data.shop} />
  }

  return (
    <AppWrapper
      title='Chi tiết gian hàng'
      routeTree={[{ url: '/shops', name: 'Quản lý gian hàng' }]}
      className='flex flex-col gap-4'
    >
      {renderShop()}
    </AppWrapper>
  )
}

export default ShopPage
