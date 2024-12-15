'use client'

import { useState, use } from 'react'
import { buildUrl } from '@lib/utils'
import { useRouter } from 'next/navigation'
import useFetch from '@hooks/use-fetch'

import AppWrapper from '@components/app-wrapper'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, SelectLabel } from '@components/ui/select'
import { Button } from '@components/ui/button'
import Link from 'next/link'
import CommonPagination from '@components/common-pagination'
import ReportGird, { ReportGridSkeleton } from './report-grid'

const UsersPage = ({ searchParams }) => {
  const router = useRouter()
  const query = use(searchParams)

  const { shopId } = query
  const pageIndex = parseInt(query.pageIndex) || 1
  const [pageSize, setPageSize] = useState(parseInt(query.pageSize) || 10)

  const dataKey = buildUrl('/reports/shops', { pageIndex, pageSize, ...(shopId && { shopId }) })
  const { data, error, isLoading } = useFetch(dataKey)

  const renderUserTable = () => {
    if (isLoading) {
      return (
        <ReportGridSkeleton
          pageSize={pageSize}
          dataKey={dataKey}
        />
      )
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

    return <ReportGird reports={data.shopReports} />
  }

  return (
    <AppWrapper
      title='Báo cáo cửa hàng'
      className='flex flex-col gap-4'
    >
      <div className='flex-row-gap-4 flex justify-between'>
        <div className='flex flex-row gap-4'>
          {!!shopId && (
            <Button asChild>
              <Link href={buildUrl('/reports', { pageIndex, pageSize })}>Xem tất cả</Link>
            </Button>
          )}
        </div>

        <div className='flex flex-row items-center gap-2'>
          <Select
            value={pageSize}
            onValueChange={(value) => {
              setPageSize(value)
              router.push(buildUrl('/reports', { pageIndex, pageSize: value, shopId }))
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

      {renderUserTable()}

      {!!data && (
        <CommonPagination
          route={'/reports'}
          searchParams={{ pageIndex, pageSize, shopId }}
          totalPages={data.totalPages}
        />
      )}
    </AppWrapper>
  )
}

export default UsersPage
