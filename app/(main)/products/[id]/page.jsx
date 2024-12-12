'use client'

import { use } from 'react'
import useFetch from '@hooks/use-fetch'

import AppWrapper from '@components/app-wrapper'
import ProductCard, { ProductCardSkeleton } from './product-card'

const ProductPage = ({ params }) => {
  const { id } = use(params)

  const { data, error, isLoading } = useFetch(`/products/${id}`)

  const renderProduct = () => {
    if (isLoading) {
      return <ProductCardSkeleton />
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

    return <ProductCard product={data.product} />
  }

  return (
    <AppWrapper
      title='Chi tiết gian hàng'
      routeTree={[{ url: '/products', name: 'Quản lý gian hàng' }]}
      className='flex flex-col gap-4'
    >
      {renderProduct()}
    </AppWrapper>
  )
}

export default ProductPage
