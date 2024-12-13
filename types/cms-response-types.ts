/** STORY TYPES */
export type Story = {
  title: string
  slug: string
  authorName: string
  soul: Soul
  sections: Array<TextBlock | ImageBlock>
}

export type TextBlock = {
  __typename: 'TextBlock'
  text: string
}

export type ImageBlock = {
  __typename: 'ImageBlock'
  image: {
    url: string
  }
}

export type StoryQueryResponse = { story: Story }
/** END STORY TYPES */

/** SOUL TYPES */
export type Soul = {
  name: string
  slug: string
  blurb?: string
  image?: { url: string }
  story: Story[]
}

export type SoulQueryResponse = { soul: Soul }
/** END SOUL TYPES */

/** ASSET UPLOAD TYPES */
export type CreateAssetMutationResponse = {
  createAsset: {
    id: string
    upload: {
      requestPostData: {
        url: string
        date: string
        key: string
        signature: string
        algorithm: string
        policy: string
        credential: string
        securityToken: string
      }
    }
  }
}
/** END ASSET UPLOAD TYPES */
