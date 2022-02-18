import { Fragment, useState, useEffect } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { IoChevronDown, IoCheckmarkSharp } from 'react-icons/io5';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
type Option = {
  name: string;
  value: string;
};

export default function ListBox({ options }: { options: Option[] }) {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { pathname, query } = router;
  const currentSelectedItem = query?.sort_by
    ? options.find((o) => o.value === query.sort_by)!
    : options[0];
  const [selectedItem, setSelectedItem] = useState<Option>(currentSelectedItem);
  useEffect(() => {
    setSelectedItem(currentSelectedItem);
  }, [currentSelectedItem]);
  function handleItemClick(values: Option) {
    setSelectedItem(values);
    const { sort_by, ...restQuery } = query;
    router.push(
      {
        pathname,
        query: {
          ...restQuery,
          ...(values.value !== options[0].value
            ? { sort_by: values.value }
            : {}),
        },
      },
      undefined,
      { scroll: false }
    );
  }

  return (
    <Listbox value={selectedItem} onChange={handleItemClick}>
      {({ open }) => (
        <div className="relative ms-2 lg:ms-0 min-w-[160px]">
          <div className="flex items-center">
            <div className="flex-shrink-0 text-15px me-2 text-skin-base text-opacity-70">
              {t('text-sort-by')}:
            </div>
            <Listbox.Button className="pe-5 text-skin-base text-sm font-semibold relative w-full text-start bg-skin-fill rounded-lg shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm cursor-pointer">
              <span className="block truncate">{t(selectedItem.name)}</span>
              <span className="absolute top-1 end-0 flex items-end ps-1 pointer-events-none">
                <IoChevronDown
                  className="w-3.5 h-3.5 text-skin-muted"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
          </div>
          <Transition
            show={open}
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              static
              className="absolute z-20 text-sm w-full py-1 mt-1 overflow-auto bg-skin-fill rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              {options?.map((option, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `${
                      active
                        ? 'text-skin-base bg-skin-dropdown-hover'
                        : 'text-skin-base'
                    }
                    cursor-pointer transition-all select-none relative py-2.5 ps-10 pe-4`
                  }
                  value={option}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`${
                          selected ? 'font-medium' : 'font-normal'
                        } block truncate`}
                      >
                        {t(option.name)}
                      </span>
                      {selected ? (
                        <span
                          className={`${active ? 'text-amber-600' : ''}
                                check-icon absolute inset-y-0 start-0 flex items-center ps-3`}
                        >
                          <IoCheckmarkSharp
                            className="w-5 h-5"
                            aria-hidden="true"
                          />
                        </span>
                      ) : null}
                    </>
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
