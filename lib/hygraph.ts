/* eslint-disable @typescript-eslint/no-explicit-any */
import { GraphQLClient } from 'graphql-request'

const CMS_API_URL = process.env.NEXT_PUBLIC_HYGRAPH_API_URL as string
const CMS_ASSET_URL = process.env.NEXT_PUBLIC_HYGRAPH_ASSET_UPLOAD_URL as string

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

export async function uploadImageToHygraph(file: File) {
  const formData = new FormData()
  formData.append('fileUpload', file)

  try {
    const response = await fetch(`${CMS_API_URL}/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_HYGRAPH_API_TOKEN}`,
      },
      body: formData,
    })

    const data = await response.json()
    if (data.errors) {
      throw new Error(data.errors[0].message)
    }

    console.log('response data: ', data)

    return data?.data?.createAsset
  } catch (error) {
    console.error('Error uploading image:', error)
    throw error
  }
}
