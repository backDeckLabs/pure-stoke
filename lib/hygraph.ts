/* eslint-disable @typescript-eslint/no-explicit-any */
import { GraphQLClient } from 'graphql-request'

const CMS_API_URL = process.env.NEXT_PUBLIC_HYGRAPH_API_URL as string

const hygraphClient = new GraphQLClient(CMS_API_URL, {
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_HYGRAPH_API_TOKEN}`,
  },
})

/**
 * Function for performing Graph QL queries to the CMS
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
