import React from 'react'

export interface MarkProps {
  // eslint-disable-next-line react/no-unused-prop-types
  key: string
  content: string
  start: number
  end: number
  // eslint-disable-next-line react/require-default-props
  tag?: string
  // eslint-disable-next-line react/require-default-props
  color?: string
  onClick: (arg0: { start: number, end: number }) => void
}

const showTags = false;

export const Mark: React.SFC<MarkProps> = props => (
  <mark
    style={{ backgroundColor: props.color || '#84d2ff', padding: '0 4px' }}
    data-start={props.start}
    data-end={props.end}
    onClick={() => props.onClick({ start: props.start, end: props.end })}
  >
    {props.content}
    {props.tag && showTags && (
      <span style={{ fontSize: '0.7em', fontWeight: 500, marginLeft: 6 }}>{props.tag}</span>
    )}
  </mark>
)
