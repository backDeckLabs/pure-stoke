/* eslint-disable @typescript-eslint/no-explicit-any */
import { GraphQLClient } from 'graphql-request'

const API_URL = process.env.HYGRAPH_API_URL as string

const hygraphClient = new GraphQLClient(API_URL, {
  headers: {
    Authorization: `Bearer ${process.env.HYGRAPH_API_TOKEN}`,
  },
})

export function cmsRequest<T>({
  query,
  variables = {},
}: {
  query: string
  variables?: Record<string, any>
}): Promise<T> {
  return hygraphClient.request(query, variables)
}
