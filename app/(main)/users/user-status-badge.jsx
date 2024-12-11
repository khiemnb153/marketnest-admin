import { Badge } from '@components/ui/badge'

const UserStatusBadge = ({ status }) => {
  switch (status.toUpperCase()) {
    case 'ACTIVE':
      return (
        <Badge
          variant='outline'
          className='border-green-600 text-green-600 dark:border-green-500 dark:text-green-500'
        >
          Hoạt động
        </Badge>
      )
    case 'DISABLED':
      return (
        <Badge
          variant='outline'
          className='border-red-600 text-red-600 dark:border-red-500 dark:text-red-500'
        >
          Đã bị khóa
        </Badge>
      )
    case 'PENDING':
      return (
        <Badge
          variant='outline'
          className='border-yellow-600 text-yellow-600 dark:border-yellow-500 dark:text-yellow-500'
        >
          Chưa xác thực
        </Badge>
      )
    default:
      return (
        <Badge
          variant='outline'
          className='border-gray-600 text-gray-600 dark:border-gray-500 dark:text-gray-500'
        >
          Unknown
        </Badge>
      )
  }
}

export default UserStatusBadge
