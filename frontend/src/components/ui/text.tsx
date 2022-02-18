import React, { CSSProperties } from 'react';
import cn from 'classnames';

interface Props {
  variant?: Variant;
  className?: string;
  style?: CSSProperties;
  children?: React.ReactNode | any;
  html?: string;
}

type Variant = 'body' | 'medium' | 'small';

const Text: React.FC<Props> = ({
  style,
  className,
  variant = 'body',
  children,
  html,
}) => {
  const htmlContentProps = html
    ? {
        dangerouslySetInnerHTML: { __html: html },
      }
    : {};

  return (
    <p
      className={cn(
        'text-skin-muted text-sm leading-7',
        {
          'lg:leading-[27px] lg:text-15px': variant === 'body', // default body text
          'lg:text-15px xl:text-base': variant === 'medium',
          'lg:leading-[1.85em]': variant === 'small',
        },
        className
      )}
      style={style}
      {...htmlContentProps}
    >
      {children}
    </p>
  );
};

export default Text;
