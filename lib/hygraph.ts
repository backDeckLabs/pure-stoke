/* eslint-disable @typescript-eslint/no-explicit-any */
import { GraphQLClient } from 'graphql-request'
import pThrottle from 'p-throttle'

const CMS_API_URL = process.env.NEXT_PUBLIC_HYGRAPH_API_URL as string

/**
 * Function for performing a Graph QL query to the CMS
 */
export function cmsRequest<T>({
  query,
  variables = {},
  includeDrafts = false,
}: {
  query: string
  variables?: Record<string, any>
  includeDrafts?: boolean
}): Promise<T> {
  const headers: { authorization: string; 'gcms-stage'?: string } = {
    authorization: `Bearer ${process.env.NEXT_PUBLIC_HYGRAPH_API_TOKEN}`,
  }
  if (includeDrafts) {
    headers['gcms-stage'] = 'DRAFT'
  }

  const hygraphClient = new GraphQLClient(CMS_API_URL, {
    headers,
  })

  return hygraphClient.request(query, variables)
}

/**
 * Function for throttled requests to the CMS.
 * NOTE: This should be used for all getStaticProps requests to the CMS
 */
export const throttledCmsRequest = <T>(
  query: string,
  variables: Record<string, any>,
  includeDrafts = false
): Promise<T> =>
  throttle(async () => {
    const data = await cmsRequest<T>({ query, variables, includeDrafts })
    return data
  })()

/** Max 5 requests per seconds, per Hygraph API rate limiting */
const throttle = pThrottle({ limit: 3, interval: 1000 })
