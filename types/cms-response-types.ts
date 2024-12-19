/** STORY TYPES */
export type Story = {
  title: string
  slug: string
  authorFirstName: string
  authorLastName: string
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
    height: number
    width: number
    url: string
  }
}

export type StoryQueryResponse = { story: Story }
/** END STORY TYPES */

/** SOUL TYPES */
export type Soul = {
  firstName: string
  lastName: string
  slug: string
  emailContactListId?: number
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
