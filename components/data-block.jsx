'use client'
import { useSWRConfig } from 'swr'
import useFetch from '@hooks/use-fetch'
import { buildUrl } from '@lib/utils'
import useSWR from 'swr'
import fetcher from '@lib/fetcher'

const DataBlock = ({ api, searchParams, renderTemplate, loadingSkeletion, errorUI }) => {
  const { accessToken } = useSWRConfig()

  const { data, error, isLoading } = useSWR(buildUrl(api, searchParams), (endpoint) => fetcher(endpoint, accessToken))

  console.log({ data, error, isLoading })

  if (isLoading) {
    return loadingSkeletion
  }

  if (error) {
    return errorUI
  }

  return renderTemplate({ data, searchParams })
}

export default DataBlock
