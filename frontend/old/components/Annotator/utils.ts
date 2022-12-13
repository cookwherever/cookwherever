import sortBy from 'lodash.sortby'

export const splitWithOffsets = (text: string, offsets: { start: number; end: number, color: string | undefined }[]) => {
  let lastEnd = 0
  const splits = []

  for (const offset of sortBy(offsets, o => o.start)) {
    const { start, end, color } = offset
    if (lastEnd < start) {
      splits.push({
        start: lastEnd,
        end: start,
        content: text.slice(lastEnd, start),
      })
    }
    splits.push({
      ...offset,
      mark: true,
      content: text.slice(start, end),
      color,
    })
    lastEnd = end
  }
  if (lastEnd < text.length) {
    splits.push({
      start: lastEnd,
      end: text.length,
      content: text.slice(lastEnd, text.length),
    })
  }

  return splits
}

export const splitTokensWithOffsets = (text: string[], offsets: { start: number; end: number }[]) => {
  let lastEnd = 0
  const splits = []

  for (const offset of sortBy(offsets, o => o.start)) {
    const { start, end } = offset
    if (lastEnd < start) {
      for (let i = lastEnd; i < start; i++) {
        splits.push({
          ...offset,
          i,
          mark: false,
          content: text[i],
        })
      }
    }
    splits.push({
      ...offset,
      i: 0,
      mark: true,
      content: text.slice(start, end).join(' '),
    })
    lastEnd = end
  }

  for (let i = lastEnd; i < text.length; i++) {
    splits.push({
      start: 0,
      end: 0,
      i,
      mark: false,
      content: text[i],
    })
  }

  return splits
}

export const selectionIsEmpty = (selection: Selection) => {
  if (selection.anchorNode === null || selection.focusNode === null) {
    return true
  }

  const position = selection.anchorNode.compareDocumentPosition(selection.focusNode)

  return position === 0 && selection.focusOffset === selection.anchorOffset
}

export const selectionIsBackwards = (selection: Selection) => {
  if (selection.anchorNode === null || selection.focusNode === null) {
    return true
  }

  if (selectionIsEmpty(selection)) return false

  const position = selection.anchorNode.compareDocumentPosition(selection.focusNode)

  let backward = false
  if (
    (!position && selection.anchorOffset > selection.focusOffset) ||
    position === Node.DOCUMENT_POSITION_PRECEDING
  )
    backward = true

  return backward
}