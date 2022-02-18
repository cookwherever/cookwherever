import React, { JSXElementConstructor, CSSProperties } from 'react';
import cn from 'classnames';

interface Props {
  variant?: Variant;
  className?: string;
  style?: CSSProperties;
  children?: React.ReactNode | any;
  html?: string;
}

type Variant =
  | 'mediumHeading'
  | 'heading'
  | 'base'
  | 'title'
  | 'titleMedium'
  | 'titleLarge'
  | 'pageHeading'
  | 'subHeading'
  | 'checkoutHeading';

const Heading: React.FC<Props> = ({
  style,
  className,
  variant = 'base',
  children,
  html,
}) => {
  const componentsMap: {
    [P in Variant]: React.ComponentType<any> | string;
  } = {
    base: 'h3',
    heading: 'h2',
    mediumHeading: 'h3',
    title: 'h2', // Collection card
    titleMedium: 'h3',
    titleLarge: 'h2',
    pageHeading: 'h1',
    subHeading: 'h2',
    checkoutHeading: 'h3',
  };

  const Component:
    | JSXElementConstructor<any>
    | React.ReactElement<any>
    | React.ComponentType<any>
    | string = componentsMap![variant!];

  const htmlContentProps = html
    ? {
        dangerouslySetInnerHTML: { __html: html },
      }
    : {};

  return (
    <Component
      className={cn(
        'text-skin-base',
        {
          'text-15px sm:text-base font-semibold': variant === 'base',
          'text-base xl:text-lg xl:leading-7 font-semibold font-manrope':
            variant === 'title',
          'font-semibold text-skin-base text-xl': variant === 'titleMedium',
          'text-base lg:text-lg xl:text-[20px] font-semibold xl:leading-8':
            variant === 'titleLarge',
          'text-base lg:text-[17px] lg:leading-7 font-medium':
            variant === 'mediumHeading',
          'text-lg lg:text-xl xl:text-[22px] xl:leading-8 font-bold font-manrope':
            variant === 'heading',
          'text-lg lg:text-xl xl:text-[26px] xl:leading-8 font-semibold text-skin-base':
            variant === 'checkoutHeading',
        },
        className
      )}
      style={style}
      {...htmlContentProps}
    >
      {children}
    </Component>
  );
};

export default Heading;
