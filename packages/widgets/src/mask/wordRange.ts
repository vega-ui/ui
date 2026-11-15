const segmenter = new Intl.Segmenter(undefined, { granularity: 'word' })

const wordsOf = (value: string) => [...segmenter.segment(value)].filter((part) => part.isWordLike)

export const wordStartBefore = (value: string, position: number) => {
  const word = wordsOf(value.slice(0, position)).at(-1)

  return word ? word.index : 0
}

export const wordEndAfter = (value: string, position: number) => {
  const word = wordsOf(value.slice(position))[0]

  return word ? position + word.index + word.segment.length : value.length
}
