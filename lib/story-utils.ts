export type Story = {
  title: string
  slug: string
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
