import { useRouter } from 'next/router';
import cn from 'classnames';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { useUI } from '@contexts/ui.context';
import { useEffect, useState } from 'react';
import Image from '@components/ui/image';
import { useTranslation } from 'next-i18next';

function SidebarMenuItem({ className, item, depth = 0 }: any) {
  const { t } = useTranslation('common');
  const router = useRouter();
  const active = router?.query?.category;
  const isActive =
    active === item.slug ||
    item?.children?.some((_item: any) => _item.slug === active);
  const [isOpen, setOpen] = useState<boolean>(isActive);
  useEffect(() => {
    setOpen(isActive);
  }, [isActive]);
  const { slug, name, children: items, icon } = item;
  const { displaySidebar, closeSidebar } = useUI();

  function toggleCollapse() {
    setOpen((prevValue) => !prevValue);
  }

  function onClick() {
    if (Array.isArray(items) && !!items.length) {
      toggleCollapse();
    } else {
      const { pathname, query } = router;
      const { type, ...rest } = query;
      router.push(
        {
          pathname,
          query: { ...rest, category: slug },
        },
        undefined,
        {
          scroll: false,
        }
      );
      displaySidebar && closeSidebar();
    }
  }

  let expandIcon;
  if (Array.isArray(items) && items.length) {
    expandIcon = !isOpen ? (
      <IoIosArrowDown className="text-base text-skin-base text-opacity-40" />
    ) : (
      <IoIosArrowUp className="text-base text-skin-base text-opacity-40" />
    );
  }

  return (
    <>
      <li
        onClick={onClick}
        className={`flex justify-between items-center transition ${
          className
            ? className
            : 'text-sm md:text-15px hover:bg-skin-two border-t border-skin-base first:border-t-0 px-3.5 2xl:px-4 py-3 xl:py-3.5 2xl:py-2.5 3xl:py-3'
        } ${isOpen ? 'bg-skin-two' : 'text-skin-base text-opacity-70'}`}
      >
        <button
          className={cn(
            'flex items-center w-full text-start outline-none focus:outline-none focus:ring-0 focus:text-skin-base'
          )}
        >
          {icon && (
            <div className="inline-flex flex-shrink-0 2xl:w-12 2xl:h-12 3xl:w-auto 3xl:h-auto">
              <Image
                src={icon ?? '/assets/placeholder/category-small.svg'}
                alt={name || t('text-category-thumbnail')}
                width={40}
                height={40}
              />
            </div>
          )}
          <span className="text-skin-base capitalize ps-2.5 md:ps-4 2xl:ps-3 3xl:ps-4">
            {name}
          </span>
          <span className="ms-auto">{expandIcon}</span>
        </button>
      </li>
      {Array.isArray(items) && isOpen ? (
        <li>
          <ul key="content" className="text-xs border-t border-skin-base py-3">
            {items?.map((currentItem) => {
              const childDepth = depth + 1;
              return (
                <SidebarMenuItem
                  key={`${currentItem.name}${currentItem.slug}`}
                  item={currentItem}
                  depth={childDepth}
                  className={cn('text-sm ps-14 py-2.5 pe-4')}
                />
              );
            })}
          </ul>
        </li>
      ) : null}
    </>
  );
}

function SidebarMenu({ items, className }: any) {
  return (
    <ul className={cn(className)}>
      {items?.map((item: any) => (
        <SidebarMenuItem key={`${item.slug}-key-${item.id}`} item={item} />
      ))}
    </ul>
  );
}

export default SidebarMenu;
