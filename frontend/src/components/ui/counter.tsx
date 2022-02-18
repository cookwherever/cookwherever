import cn from 'classnames';
import MinusIcon from '@components/icons/minus-icon';
import PlusIcon from '@components/icons/plus-icon';
import { useTranslation } from 'next-i18next';

type ButtonEvent = (
  e: React.MouseEvent<HTMLButtonElement | MouseEvent>
) => void;

type CounterProps = {
  value: number;
  variant?: 'default' | 'cart' | 'single';
  onDecrement: ButtonEvent;
  onIncrement: ButtonEvent;
  className?: string;
  disabled?: boolean;
};

const Counter: React.FC<CounterProps> = ({
  value,
  variant = 'default',
  onDecrement,
  onIncrement,
  className,
  disabled,
}) => {
  const size = variant === 'single' ? '22' : '14';
  const { t } = useTranslation('common');
  return (
    <div
      className={cn(
        'flex items-center justify-between rounded overflow-hidden flex-shrink-0',
        {
          'h-8 md:h-10 bg-skin-fill shadow-counter rounded-3xl':
            variant === 'default',
          'h-11 md:h-14 bg-skin-button-secondary': variant === 'single',
          'inline-flex': variant === 'cart',
        },
        className
      )}
    >
      <button
        onClick={onDecrement}
        className={cn(
          'flex items-center justify-center flex-shrink-0 h-full transition-all ease-in-out duration-300 focus:outline-none focus-visible:outline-none',
          {
            'w-8 md:w-12 h-8 rounded-2xl text-heading hover:bg-skin-button-hover ms-1':
              variant === 'default',
            'w-10 h-10 rounded-full transform scale-80 lg:scale-100 text-skin-base hover:bg-skin-button-hover ms-auto':
              variant === 'single',
            'w-6 h-6 border border-skin-three hover:bg-skin-primary hover:border-skin-primary rounded-full hover:text-skin-inverted':
              variant === 'cart',
          }
        )}
      >
        <span className="sr-only">{t('button-minus')}</span>
        <MinusIcon width={size} height={size} opacity="1" />
      </button>
      <span
        className={cn(
          'font-semibold text-skin-base flex items-center justify-center h-full transition-colors duration-250 ease-in-out cursor-default flex-shrink-0',
          {
            'text-sm md:text-base w-6 md:w-8': variant === 'default',
            'text-base md:text-[17px] w-12 md:w-20 xl:w-28':
              variant === 'single',
            'text-15px w-9': variant === 'cart',
          }
        )}
      >
        {value}
      </span>
      <button
        onClick={onIncrement}
        disabled={disabled}
        className={cn(
          'group flex items-center justify-center h-full flex-shrink-0 transition-all ease-in-out duration-300 focus:outline-none focus-visible:outline-none',
          {
            'w-8 md:w-12 h-8 rounded-2xl text-heading hover:bg-skin-button-hover me-1':
              variant === 'default',
            'w-10 h-10 rounded-full scale-80 lg:scale-100 text-heading hover:bg-skin-button-hover me-auto':
              variant === 'single',
            'w-6 h-6 border border-skin-three hover:bg-skin-primary hover:border-skin-primary rounded-full hover:text-skin-inverted':
              variant === 'cart',
          }
        )}
        title={disabled ? 'Out Of Stock' : ''}
      >
        <span className="sr-only">{t('button-plus')}</span>
        <PlusIcon width={size} height={size} opacity="1" />
      </button>
    </div>
  );
};

export default Counter;
