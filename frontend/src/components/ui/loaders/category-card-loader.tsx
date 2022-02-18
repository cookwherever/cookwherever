import ContentLoader from 'react-content-loader';

const CategoryCardLoader = (props: any) => (
  <ContentLoader
    speed={2}
    width={180}
    height={214}
    viewBox="0 0 180 214"
    backgroundColor="#F3F6FA"
    foregroundColor="#E7ECF3"
    className="w-full h-auto overflow-hidden"
    {...props}
  >
    <circle cx="90" cy="89" r="89" />
    <rect x="30" y="203" rx="5" ry="5" width="118" height="8" />
  </ContentLoader>
);

export default CategoryCardLoader;
