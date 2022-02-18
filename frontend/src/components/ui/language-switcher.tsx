import { useState, Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { FaChevronDown } from 'react-icons/fa';
import { siteSettings } from '@settings/site-settings';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

export default function LanguageSwitcher() {
  const { site_header } = siteSettings;
  const { t } = useTranslation('common');
  const options = site_header.languageMenu;
  const router = useRouter();
  const { asPath, locale } = router;
  const currentSelectedItem = locale
    ? options.find((o) => o.value === locale)!
    : options[0];
  const [selectedItem, setSelectedItem] = useState(currentSelectedItem);

  function handleItemClick(values: any) {
    setSelectedItem(values);
    router.push(asPath, undefined, {
      locale: values.value,
    });
  }

  return (
    <Listbox value={selectedItem} onChange={handleItemClick}>
      {({ open }) => (
        <div className="relative z-10 lg:top-[1px]">
          <Listbox.Button className="text-skin-base relative w-full py-2 ps-3 pe-5 text-start  rounded-lg shadow-md focus:outline-none cursor-pointer">
            <span className="flex truncate items-center text-sm lg:text-15px">
              <span className="me-2 w-5 h-5 rounded-full overflow-hidden flex-shrink-0">
                {selectedItem.icon}
              </span>
              <span className="leading-5 pb-0.5">{t(selectedItem.name)}</span>
            </span>
            <span className="absolute inset-y-0 -end-2 flex items-center pointer-events-none">
              <FaChevronDown
                className="w-7 h-3.5 text-skin-base opacity-40"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            show={open}
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              static
              className="absolute end-0 lg:start-0 w-full py-1 mt-1 overflow-auto bg-skin-fill rounded-md shadow-dropDown max-h-60 focus:outline-none text-sm min-w-[150px]"
            >
              {options?.map((option) => (
                <Listbox.Option
                  key={option.id}
                  className={({ active }) =>
                    `${
                      active
                        ? 'text-skin-base bg-skin-dropdown-hover'
                        : 'text-skin-base'
                    }
												cursor-pointer relative py-2 px-3`
                  }
                  value={option}
                >
                  {({ selected, active }) => (
                    <span className="flex items-center">
                      <span className="w-[22px] h-4">{option.icon}</span>
                      <span
                        className={`${
                          selected ? 'font-medium ' : 'font-normal'
                        } block truncate ms-1.5 text-sm pb-0.5`}
                      >
                        {t(option.name)}
                      </span>
                      {selected ? (
                        <span
                          className={`${active && 'text-amber-600'}
                                 absolute inset-y-0 start-0 flex items-center ps-3`}
                        />
                      ) : null}
                    </span>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  );
}
