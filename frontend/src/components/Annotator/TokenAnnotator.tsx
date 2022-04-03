import React from 'react'

import {Mark, MarkProps} from './Mark'
import {selectionIsEmpty, selectionIsBackwards, splitTokensWithOffsets} from './utils'
import {Span} from './span'

interface TokenProps {
  i: number
  content: string
}

interface TokenSpan {
  start: number
  end: number
  tokens: string[]
}

const Token: React.SFC<TokenProps> = props => {
  return <span data-i={props.i}>{props.content} </span>
}

export interface TokenAnnotatorProps<T>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  tokens: string[]
  value: T[]
  onChange: (value: T[]) => void
  // eslint-disable-next-line react/require-default-props
  getSpan?: (span: TokenSpan) => T
  // eslint-disable-next-line react/require-default-props
  renderMark?: (props: MarkProps) => JSX.Element
  // TODO: determine whether to overwrite or leave intersecting ranges.
}

export const TokenAnnotator = <T extends Span>(props: TokenAnnotatorProps<T>) => {
  const renderMark = props.renderMark || (p => <Mark {...p} />)

  const getSpan = (span: TokenSpan): T => {
    if (props.getSpan) return props.getSpan(span)
    return {start: span.start, end: span.end} as T
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

    if (
      !anchorParent.hasAttribute('data-i') ||
      !focusParent.hasAttribute('data-i')
    ) {
      selection.empty()
      return
    }

    const anchorAttr = anchorParent.getAttribute('data-i');
    const focusAttr = focusParent.getAttribute('data-i');

    let start = parseInt(anchorAttr || '0', 10)
    let end = parseInt(focusAttr || '0', 10)

    if (selectionIsBackwards(selection)) {
      [start, end] = [end, start]
    }

    end += 1

    props.onChange([...props.value, getSpan({ start, end, tokens: props.tokens.slice(start, end) })])

    // @ts-ignore
    selection.empty()
  }

  const handleSplitClick = ({start, end}: {start: number, end: number}) => {
    // Find and remove the matching split.
    const splitIndex = props.value.findIndex(s => s.start === start && s.end === end)
    if (splitIndex >= 0) {
      props.onChange([...props.value.slice(0, splitIndex), ...props.value.slice(splitIndex + 1)])
    }
  }

  const {tokens, value, onChange, ...divProps} = props
  const splits = splitTokensWithOffsets(tokens, value)
  return (
    <div {...divProps} onMouseUp={handleMouseUp}>
      {splits.map((split, i) =>
        split.mark ? (
          renderMark({
            key: `${split.start}-${split.end}`,
            ...split,
            onClick: handleSplitClick,
            start: 0,
            end: 0,
            tag: ''
          })
        ) : (
          <Token key={split.i} {...split} />
        )
      )}
    </div>
  )
}