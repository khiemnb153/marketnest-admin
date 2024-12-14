'use client'

import { useState } from 'react'
import { buildUrl } from '@lib/utils'
import useFetch from '@hooks/use-fetch'
import { useRouter } from 'next/navigation'

import { Search } from 'lucide-react'

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, SelectLabel } from '@components/ui/select'
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
  PaginationLink,
} from '@components/ui/pagination'

import ProductTable, { ProductTableSkeleton } from '@app/(main)/products/product-table'

const ShopProductTable = ({ shopId }) => {
  const router = useRouter()

  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [searchName, setSearchName] = useState('')
  const [search, setSearch] = useState('')

  const { data, error, isLoading } = useFetch(buildUrl(`/shops/${shopId}/products`, { pageIndex, pageSize, searchName }))

  const renderProductTable = () => {
    if (isLoading) {
      return <ProductTableSkeleton pageSize={pageSize} />
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

    return (
      <ProductTable
        products={data.products}
        searchParams={{ pageIndex, pageSize, searchName }}
      />
    )
  }

  const renderPageLink = (pageNumber) => (
    <PaginationItem key={`page${pageNumber}`}>
      <PaginationLink
        href={'#'}
        onClick={(e) => {
          e.preventDefault()
          setPageIndex(pageNumber)
        }}
        isActive={pageNumber == pageIndex}
      >
        {pageNumber}
      </PaginationLink>
    </PaginationItem>
  )

  const renderEllipsis = () => (
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sản phẩm cửa hàng kinh doanh</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col gap-4'>
        <div className='flex-row-gap-4 flex justify-between'>
          <div className='flex flex-row gap-4'>
            <div className='flex flex-row gap-2'>
              <Input
                className='w-56'
                placeholder='Nhập từ khóa để tìm kiếm...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button
                variant='ghost'
                className='px-3'
                onClick={() => {
                  setSearchName(search)
                }}
              >
                <Search />
              </Button>
            </div>
          </div>

          <div className='flex flex-row items-center gap-2'>
            <Select
              value={pageSize}
              onValueChange={(value) => {
                setPageSize(value)
                setPageIndex(1)
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder='Kích thước trang' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Kích thước trang</SelectLabel>
                  <SelectItem value={10}>10</SelectItem>
                  <SelectItem value={25}>25</SelectItem>
                  <SelectItem value={50}>50</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        {renderProductTable()}

        {!!data && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href={'#'}
                  onClick={(e) => {
                    e.preventDefault()
                    if (pageIndex > 1) setPageIndex((prev) => prev - 1)
                  }}
                />
              </PaginationItem>

              {renderPageLink(1)}

              {pageIndex > 3 && renderEllipsis()}

              {pageIndex > 2 && renderPageLink(pageIndex - 1)}
              {pageIndex != 1 && pageIndex != data.totalPages && renderPageLink(pageIndex)}
              {pageIndex < data.totalPages - 1 && renderPageLink(pageIndex + 1)}

              {pageIndex < data.totalPages - 2 && renderEllipsis()}

              {data.totalPages != 1 && renderPageLink(data.totalPages)}

              <PaginationItem>
                <PaginationNext
                  href={'#'}
                  onClick={(e) => {
                    e.preventDefault()
                    if (pageIndex < data.totalPages) setPageIndex((prev) => prev + 1)
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </CardContent>
    </Card>
  )
}

export default ShopProductTable
