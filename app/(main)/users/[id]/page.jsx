'use client'

import { use } from 'react'
import useFetch from '@hooks/use-fetch'

import AppWrapper from '@components/app-wrapper'
import UserCard, { UserCardSkeleton } from './user-card'

const UserPage = ({ params }) => {
  const { id } = use(params)

  const { data, error, isLoading } = useFetch(`/users/${id}`)

  const renderUser = () => {
    if (isLoading) {
      return <UserCardSkeleton />
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

    return <UserCard user={data.user} />
  }

  return (
    <AppWrapper
      title='Chi tiết người dùng'
      routeTree={[{ url: '/users', name: 'Quản lý người dùng' }]}
      className='flex flex-col gap-4'
    >
      {renderUser()}
    </AppWrapper>
  )
}

export default UserPage
