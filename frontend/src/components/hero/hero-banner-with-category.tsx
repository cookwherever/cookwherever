import BannerGridTwo from '@components/common/banner-grid-two';
import { bannerGridMediumTwo as bannersMedium } from '@framework/static/banner';
import { bannerDiscount } from '@framework/static/banner';
import BannerAllCarousel from '@components/common/banner-all-carousel';
import { useCategoriesQuery } from '@framework/category/get-all-categories';
import CategoryListCard from '@components/cards/category-list-card';
import { ROUTES } from '@utils/routes';
import { LIMITS } from '@framework/utils/limits';

interface Props {
  className?: string;
}

const HeroBannerWithCategory: React.FC<Props> = ({
  className = 'mb-12 lg:mb-14 xl:mb-16 2xl:mb-20',
}) => {
  const { data } = useCategoriesQuery({
    limit: LIMITS.CATEGORIES_LIMITS,
  });
  return (
    <div className={`xl:flex md:pb-2.5 ${className}`}>
      <div className="hidden xl:block flex-shrink-0 pe-8 xl:pe-16 xl:w-[400px] pt-[1px]">
        <div className="border border-skin-base rounded-md flex flex-col h-full justify-between">
          {data?.categories?.data?.slice(0, 10)?.map((category) => (
            <CategoryListCard
              key={`category--key-${category.id}`}
              category={category}
              href={{
                pathname: ROUTES.SEARCH,
                query: { category: category.slug },
              }}
              className="border-b border-skin-base last:border-b-0 transition"
              variant="small"
            />
          ))}
        </div>
      </div>
      <div className="trendy-main-content w-full xl:-ms-8">
        <BannerGridTwo data={bannersMedium} />
        <BannerAllCarousel
          data={bannerDiscount}
          buttonSize="small"
          className="mb-0"
        />
      </div>
    </div>
  );
};

export default HeroBannerWithCategory;
