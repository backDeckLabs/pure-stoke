import { CreateAssetMutationResponse } from '@/types/cms-response-types'
import { cmsRequest } from './hygraph'

export const uploadImage = async (file: File) => {
  const { name: fileName } = file

  // Step 1: create initial asset in Hygraph
  const assetResponse = await cmsRequest<CreateAssetMutationResponse>({
    query: createAssetMutation,
    variables: {
      fileName,
    },
  })
  // console.log('create asset response is: ', assetResponse)
  // TODO: add error handling here

  // Step 2: Upload the asset to the signed URL
  const { id, upload } = assetResponse.createAsset
  const { requestPostData } = upload
  const formData = new FormData()
  formData.append('X-Amz-Date', requestPostData.date)
  formData.append('key', requestPostData.key)
  formData.append('X-Amz-Signature', requestPostData.signature)
  formData.append('X-Amz-Algorithm', requestPostData.algorithm)
  formData.append('policy', requestPostData.policy)
  formData.append('X-Amz-Credential', requestPostData.credential)
  formData.append('X-Amz-Security-Token', requestPostData.securityToken)
  formData.append('file', file)

  const uploadResponse = await fetch(requestPostData.url, {
    method: 'POST',
    body: formData,
  })
  console.log('upload response is: ', uploadResponse)
  // TODO: add error handling here

  return id
}

const createAssetMutation = `
  mutation UploadAsset($fileName: String!) {
    createAsset(data: { fileName: $fileName }) {
      id
      url
      upload {
        status
        expiresAt
        error {
          code
          message
        }
        requestPostData {
          url
          date
          key
          signature
          algorithm
          policy
          credential
          securityToken
        }
      }
    }
  }
`
