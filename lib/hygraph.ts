/* eslint-disable @typescript-eslint/no-explicit-any */
import { GraphQLClient } from 'graphql-request'
import pThrottle from 'p-throttle'

const CMS_API_URL = process.env.NEXT_PUBLIC_HYGRAPH_API_URL as string

const hygraphClient = new GraphQLClient(CMS_API_URL, {
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_HYGRAPH_API_TOKEN}`,
  },
})

/**
 * Function for performing a Graph QL query to the CMS
 */
export function cmsRequest<T>({
  query,
  variables = {},
}: {
  query: string
  variables?: Record<string, any>
}): Promise<T> {
  return hygraphClient.request(query, variables)
}

/**
 * Function for throttled requests to the CMS.
 * NOTE: This should be used for all getStaticProps requests to the CMS
 */
export const throttledCmsRequest = <T>(
  query: string,
  variables: Record<string, any>
): Promise<T> =>
  throttle(async () => {
    const data = await cmsRequest<T>({ query, variables })
    return data
  })()

/** Max 5 requests per seconds, per Hygraph API rate limiting */
const throttle = pThrottle({ limit: 5, interval: 1000 })
