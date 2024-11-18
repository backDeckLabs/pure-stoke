/** STORY TYPES */
export type Story = {
  title: string
  slug: string
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
  story: Story[]
}

export type SoulQueryResponse = { soul: Soul }
/** END SOUL TYPES */
