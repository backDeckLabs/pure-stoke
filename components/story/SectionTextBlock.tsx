import React, { ChangeEvent, FC, useEffect, useState } from 'react'

export interface SectionTextBlockProps {
  onChange: (value: string) => void
}

const SectionTextBlock: FC<SectionTextBlockProps> = ({ onChange }) => {
  const [value, setValue] = useState('')

  useEffect(() => {
    onChange(value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    setValue(newValue)
  }

  return (
    <div>
      <textarea
        value={value}
        onChange={handleTextChange}
        placeholder="Type your story here"
        style={{ width: '100%', height: '200px' }}
        className="text-black"
      />
    </div>
  )
}

export default SectionTextBlock
