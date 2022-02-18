import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import Link from '@components/ui/link';
import { IoIosArrowForward } from 'react-icons/io';
import Image from '@components/ui/image';
import { ROUTES } from '@utils/routes';

function SidebarMenuItem({ className, item, depth = 0 }: any) {
  const { t } = useTranslation('common');
  const { name, children: items, icon } = item;
  return (
    <>
      <li
        className={`flex justify-between items-center transition ${
          className
            ? className
            : 'text-sm hover:text-skin-primary px-3.5 2xl:px-4 py-2.5 border-b border-skin-base last:border-b-0'
        }`}
      >
        <Link
          href={ROUTES.SEARCH}
          className={cn(
            'flex items-center w-full text-start outline-none focus:outline-none focus:ring-0 focus:text-skin-base'
          )}
        >
          {icon && (
            <div className="inline-flex flex-shrink-0 w-8 3xl:h-auto">
              <Image
                src={icon ?? '/assets/placeholder/category-small.svg'}
                alt={name || t('text-category-thumbnail')}
                width={25}
                height={25}
              />
            </div>
          )}
          <span className="capitalize ps-2.5 md:ps-4 2xl:ps-3 3xl:ps-4">
            {name}
          </span>
          {items && (
            <span className="ms-auto hidden md:inline-flex">
              <IoIosArrowForward className="text-15px text-skin-base text-opacity-40" />
            </span>
          )}
        </Link>
        {Array.isArray(items) ? (
          <div className="hidden md:block absolute z-10 left-full top-0 w-full h-full bg-skin-fill border border-skin-base rounded-md opacity-0 invisible">
            <ul key="content" className="text-xs py-1.5">
              {items?.map((currentItem) => {
                const childDepth = depth + 1;
                return (
                  <SidebarMenuItem
                    key={`${currentItem.name}${currentItem.slug}`}
                    item={currentItem}
                    depth={childDepth}
                    className={cn(
                      'text-sm px-3 py-3 pe-4 text-skin-muted hover:text-skin-primary border-b border-skin-base last:border-b-0 mb-0.5'
                    )}
                  />
                );
              })}
            </ul>
          </div>
        ) : null}
      </li>
    </>
  );
}

function SidebarMenu({ items, className }: any) {
  return (
    <ul
      className={cn(
        'w-64 md:w-72 h-430px bg-skin-fill border border-skin-base rounded-md category-dropdown-menu pt-1.5',
        className
      )}
    >
      {items?.map((item: any) => (
        <SidebarMenuItem key={`${item.slug}-key-${item.id}`} item={item} />
      ))}
    </ul>
  );
}

export default SidebarMenu;
