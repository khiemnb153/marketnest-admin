import { getAbbreviationName } from '@lib/utils'
import moment from 'moment/moment'
import { mutate, useSWRConfig } from 'swr'
import { toast } from 'sonner'

import { AlertCircle } from 'lucide-react'

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@components/ui/avatar'
import { Badge } from '@components/ui/badge'
import { Button } from '@components/ui/button'
import { Skeleton } from '@components/ui/skeleton'
import Link from 'next/link'

const ReportGird = ({ reports }) => {
  const { accessToken } = useSWRConfig()

  const handleMarkAsRead = async (reportId) => {
    // const res = await fetch(process.env.NEXT_PUBLIC_API_BASE + `/products/${product.id}/admin`, {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${accessToken}`,
    //   },
    //   body: JSON.stringify({ status: 'Admin_Disabled' }),
    // })
    // if (!res.ok) {
    //   toast.error(`Gỡ sản phẩm thất bại. Code: ${res.status}`)
    //   console.log(await res.json())
    //   return
    // }
    // toast.success(`Gỡ sản phẩm thành công.`)
    // mutate(`/products/${product.id}`)
  }

  return (
    <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
      {reports.map((report) => (
        <Card
          key={report.id}
          className={report.isRead ? 'opacity-75' : ''}
        >
          <CardHeader className='flex flex-row items-center gap-4'>
            <Avatar>
              <AvatarImage
                src={report.sender.avatar}
                alt={report.sender.username}
              />
              <AvatarFallback>{getAbbreviationName(report.sender.username || 'user')}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className=''>{report.sender.username}</CardTitle>
              <p className='text-sm text-muted-foreground'>
                Nhận xét về{' '}
                <Link
                  href={`/reports?shopId=${report.shop.id}`}
                  className='text-primary underline-offset-2 hover:underline'
                >
                  {report.shop.name}
                </Link>
              </p>
            </div>
            <Badge
              variant={report.isRead ? 'secondary' : 'destructive'}
              className='ml-auto'
            >
              {report.isRead ? <CheckCircle className='h-4 w-4' /> : <AlertCircle className='h-4 w-4' />}
            </Badge>
          </CardHeader>
          <CardContent>
            <h3 className='mb-2 font-semibold'>{report.title}</h3>
            <p className='mb-4 text-sm'>{report.body}</p>
            {report.image && (
              <Image
                src={report.image}
                alt='Report image'
                width={300}
                height={200}
                className='h-48 w-full rounded-md object-cover'
              />
            )}
            <p className='mt-2 text-xs text-muted-foreground'>Vào lúc {moment(report.createdAt).format('HH:mm DD/MM/YYYY')}</p>
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => handleMarkAsRead(report.id)}
              disabled={report.isRead}
              className='w-full'
            >
              {report.isRead ? 'Đã đọc' : 'Đánh dấu là đã đọc'}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

export function ReportGridSkeleton({ pageSize }) {
  return (
    <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
      {Array.from({ length: pageSize }).map((_, index) => (
        <Card key={index}>
          <CardHeader className='flex flex-row items-center gap-4'>
            <Skeleton className='h-12 w-12 rounded-full' />
            <div className='space-y-2'>
              <Skeleton className='h-4 w-24' />
              <Skeleton className='h-3 w-32' />
            </div>
            <Skeleton className='ml-auto h-6 w-6 rounded-full' />
          </CardHeader>
          <CardContent className='space-y-4'>
            <Skeleton className='h-4 w-3/4' />
            <Skeleton className='h-20 w-full' />
            <Skeleton className='h-32 w-full' />
            <Skeleton className='h-3 w-1/4' />
          </CardContent>
          <CardFooter>
            <Skeleton className='h-10 w-full' />
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

export default ReportGird
