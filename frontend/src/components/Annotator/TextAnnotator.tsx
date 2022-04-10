import React from 'react'

import { Mark, MarkProps } from './Mark'
import { selectionIsEmpty, selectionIsBackwards, splitWithOffsets } from './utils'
import { Span } from './span'

export interface SplitProps extends MarkProps {
  // eslint-disable-next-line react/require-default-props
  mark?: boolean
}

// eslint-disable-next-line react/require-default-props
const Split = (props: SplitProps) => {
  if (props.mark && props.color) return <Mark {...props} />

  return (
    <span
      data-start={props.start}
      data-end={props.end}
      onClick={() => props.onClick({ start: props.start, end: props.end })}
    >
      {props.content}
    </span>
  )
}

export interface TextSpan extends Span {
  text: string
}

type TextBaseProps<T> = {
  content: string
  value: T[]
  onAnnotatorChange: (value: T[]) => void
  highlightClicked: (tag: string, value: string) => void
  // eslint-disable-next-line react/require-default-props
  getSpan?: (span: TextSpan) => T
  // TODO: determine whether to overwrite or leave intersecting ranges.
}

type TextAnnotatorProps<T> = React.HTMLAttributes<HTMLDivElement> & TextBaseProps<T>

export const TextAnnotator = <T extends Span>(props: TextAnnotatorProps<T>) => {
  const getSpan = (span: TextSpan): T => {
    // TODO: Better typings here.
    if (props.getSpan) return props.getSpan(span) as T
    return { start: span.start, end: span.end } as T
  }

  const handleMouseUp = () => {
    if (!props.onChange) return

    const selection = window.getSelection()

    if (
      selection === null ||
      selection.anchorNode === null ||
      selection.focusNode === null ||
      selection.anchorNode.parentElement === null ||
      selection.focusNode.parentElement === null
    ) {
      return
    }

    const anchorParent = selection.anchorNode.parentElement;
    const focusParent = selection.focusNode.parentElement;

    if (selectionIsEmpty(selection)) return

    const anchorAttr = anchorParent.getAttribute('data-i');
    const focusAttr = focusParent.getAttribute('data-i');

    let start = parseInt(anchorAttr || '0', 10)
    let end = parseInt(focusAttr || '0', 10)

    if (selectionIsBackwards(selection)) {
      [start, end] = [end, start]
    }

    props.onAnnotatorChange([...props.value, getSpan({ start, end, text: content.slice(start, end), tag: '', color: '' })])

    selection.empty()
  }

  const handleSplitClick = (highlightClicked: (tag: string, value: string) => void) => ({ start, end }: {start: number, end: number}) => {
    // Find and remove the matching split.
    const splitIndex = props.value.findIndex(s => s.start === start && s.end === end)

    const split = props.value[splitIndex];
    const value = props.content.substring(split.start, split.end);
    highlightClicked(split.tag, value);
    // if (splitIndex >= 0) {
    //   props.onAnnotatorChange([...props.value.slice(0, splitIndex), ...props.value.slice(splitIndex + 1)])
    // }
  }

  const { content, value, style, highlightClicked } = props
  const splits = splitWithOffsets(content, value)
  return (
    <div style={style} onMouseUp={handleMouseUp}>
      {splits.map(split => (
        <Split key={`${split.start}-${split.end}`} {...split} onClick={handleSplitClick(highlightClicked)} />
      ))}
    </div>
  )
}
