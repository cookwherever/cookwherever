import { useTranslation } from 'next-i18next';

interface Props {
  soldProduct?: number;
  totalProduct?: number;
  className?: string;
}

const ProgressCard: React.FC<Props> = ({
  soldProduct = 0,
  totalProduct = 0,
  className = '',
}) => {
  const progressBar = (100 / totalProduct) * soldProduct;
  const { t } = useTranslation('common');
  return (
    <div className={`w-full ${className}`}>
      <div className="relative w-full h-2.5 lg:h-3 bg-skin-four rounded-full overflow-hidden">
        <div
          className="absolute h-full bg-skin-yellow-three bg-opacity-90 rounded-full bg-progress-striped"
          style={{ width: `${Math.round(progressBar)}%` }}
        />
      </div>
      <div className="flex justify-between items-center mt-2.5 md:mt-3 xl:mt-2.5 2xl:mt-3.5">
        <div className="text-skin-base text-opacity-60 text-13px sm:text-sm lg:text-15px leading-6 md:leading-7">
          {t('text-sold')} :&nbsp;
          <span className="text-skin-base font-medium">
            {soldProduct} {t('text-items')}
          </span>
        </div>
        <div className="text-skin-base text-opacity-60 text-13px sm:text-sm lg:text-15px leading-6 md:leading-7">
          {t('text-available')} :&nbsp;
          <span className="text-skin-base font-medium">
            {totalProduct - soldProduct} {t('text-items')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProgressCard;
