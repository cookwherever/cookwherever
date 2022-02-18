import cn from 'classnames';
import { Disclosure, Transition } from '@headlessui/react';
import { useTranslation } from 'next-i18next';
import { FaChevronDown } from 'react-icons/fa';

type CollapseProps = {
  title?: any;
  content?: any;
};

export const NavCollapse: React.FC<CollapseProps> = ({ title, content }) => {
  const { t } = useTranslation();
  return (
    <div className="w-full px-3">
      <div className="w-full mx-auto mb-4   ">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex justify-between w-full shadow-category bg-white rounded py-3 md:py-4 px-4">
                <h2
                  className={cn(
                    'flex items-center cursor-pointer text-sm lg:text-base text-skin-base font-medium  '
                  )}
                >
                  <span className="text-skin-base opacity-50">
                    {title.icon}
                  </span>
                  <span className="ps-3">{t(title.name)}</span>
                </h2>
                <FaChevronDown
                  className={`${
                    open ? 'transform rotate-180' : ''
                  } w-4 h-4 2xl:w-5 2xl:h-5 text-skin-base opacity-70`}
                />
              </Disclosure.Button>

              <Transition
                show={open}
                enter="transition duration-500 ease-out"
                enterFrom="transform scale-5 opacity-0"
                enterTo="transform scale-10 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-5 opacity-0"
              >
                {open && (
                  <div>
                    <Disclosure.Panel
                      static
                      className="shadow-category bg-white rounded mt-4"
                    >
                      <div className="px-5 pb-4 2xl:pb-7  2xl:px-6  pt-3 leading-7 font-14px text-skin-base opacity-70">
                        {content}
                      </div>
                    </Disclosure.Panel>
                  </div>
                )}
              </Transition>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
};
