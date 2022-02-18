import React, { TextareaHTMLAttributes } from 'react';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';

export interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  label?: string;
  name: string;
  placeholder?: string;
  error?: string;
  shadow?: boolean;
  variant?: 'normal' | 'solid' | 'outline';
}

const variantClasses = {
  normal:
    'bg-white border border-skin-two focus:shadow focus:outline-none focus:border-heading',
  solid:
    'border border-skin-two focus:bg-white focus:border-2 focus:border-skin-primary',
  outline: 'border border-gray-300 focus:border-primary',
};

const TextArea = React.forwardRef<HTMLTextAreaElement, Props>((props, ref) => {
  const { t } = useTranslation();
  const {
    className,
    label,
    name,
    placeholder,
    error,
    variant = 'normal',
    shadow = false,
    inputClassName,
    labelClassName,
    ...rest
  } = props;
  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={name}
          className={`block ${
            labelClassName || 'text-skin-base opacity-70'
          } font-normal text-13px lg:text-sm leading-none mb-3 cursor-pointer`}
        >
          {t(label)}
        </label>
      )}
      <textarea
        id={name}
        name={name}
        className={cn(
          'px-4 py-3 flex items-center w-full rounded appearance-none transition duration-300 ease-in-out text-skin-base text-13px lg:text-sm focus:outline-none focus:ring-0 placeholder-[#B3B3B3]',
          shadow && 'focus:shadow',
          variantClasses[variant],
          inputClassName
        )}
        autoComplete="off"
        spellCheck="false"
        rows={4}
        ref={ref}
        // @ts-ignore
        placeholder={t(placeholder)}
        {...rest}
      />
      {error && (
        <p className="my-2 text-13px text-skin-red text-opacity-70">
          {t(error)}
        </p>
      )}
    </div>
  );
});

export default TextArea;

TextArea.displayName = 'TextArea';
