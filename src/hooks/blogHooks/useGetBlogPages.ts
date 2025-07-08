import useSWRInfinite from 'swr/infinite'
import { getBlogs } from './useGetBlogs'
import { AppApis } from 'config/apis-config'

export const useGetBlogsPages = ({filter}) => {
  const result = useSWRInfinite(
    (index, previousPageData) => {
      if (index === 0 ) {
        return `${AppApis.blogs.default}?date=${filter.date.asc ? 'asc' : 'desc'}`
      }

      if (!previousPageData.length) {
        return null
      }

      return `${AppApis.blogs.default}?offset=${index * 6}&date=${filter.date.asc ? 'asc' : 'desc'}`
    },
    getBlogs,
  )

  let hitEnd = false;
  const { data } = result;

  if (data) {
    hitEnd = data[data.length - 1].length === 0
  }

  return {...result, hitEnd}
}

