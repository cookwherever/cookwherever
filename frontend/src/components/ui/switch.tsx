import { Switch } from '@headlessui/react';
import { useRouter } from 'next/router';
import { getDirection } from '@utils/get-direction';

interface SwitchProps {
  srText?: string;
  checked?: boolean;
  onChange?: (value: boolean) => void;
}

const SwitchComponent: React.FC<SwitchProps> = (
  { srText = 'toggle', checked, onChange },
  ref
) => {
  const { locale } = useRouter();
  const dir = getDirection(locale);
  return (
    <Switch
      checked={checked!}
      onChange={onChange!}
      type="button"
      ref={ref}
      className={`${checked ? 'bg-skin-primary' : 'bg-skin-button-hover '}
          relative inline-flex flex-shrink-0 h-6 lg:h-7 w-10 lg:w-12 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75 focus:border-skin-primary`}
    >
      <span className="sr-only">{srText}</span>
      <span
        aria-hidden="true"
        className={`${
          checked
            ? dir === 'rtl'
              ? '-translate-x-4 lg:-translate-x-5'
              : 'translate-x-4 lg:translate-x-5'
            : 'translate-x-0'
        }
            pointer-events-none inline-block h-5 lg:h-6 w-5 lg:w-6 rounded-full bg-skin-fill shadow-switch transform ring-0 transition ease-in-out duration-200`}
      />
    </Switch>
  );
};

export default SwitchComponent;
