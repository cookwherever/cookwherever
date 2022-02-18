import { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import Heading from '@components/ui/heading';
import Text from '@components/ui/text';
import Input from '@components/ui/form/input';
import { useForm } from 'react-hook-form';
import cn from 'classnames';
import CopyToClipboard from 'react-copy-to-clipboard';

import {
  FacebookShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  FacebookIcon,
  LinkedinIcon,
  WhatsappIcon,
  TwitterIcon,
} from 'react-share';

interface Props {
  className?: string;
  shareUrl?: string;
}
interface NewsLetterFormValues {
  shareLink: string;
}
const defaultValues = {
  shareLink: '',
};

const SocialShareBox: React.FC<Props> = ({ className = '', shareUrl = '' }) => {
  const { t } = useTranslation('common');
  const [copyText, setCopyText] = useState({
    value: shareUrl,
    copied: false,
  });
  const { register } = useForm<NewsLetterFormValues>({
    defaultValues,
  });
  useEffect(() => {
    if (copyText.copied) {
      setTimeout(() => {
        setCopyText({
          ...copyText,
          copied: false,
        });
      }, 5000);
    }
  }, [copyText]);
  return (
    <div
      className={cn(
        'shadow-card bg-skin-fill rounded-md p-4 md:p-6 lg:p-7',
        className
      )}
    >
      <Heading className="mb-2">{t('text-share-social-network')}</Heading>
      <Text variant="small">{t('text-share-social-network-description')}</Text>
      <div className="flex items-center flex-wrap space-s-2 mb-4">
        <FacebookShareButton url={shareUrl}>
          <FacebookIcon
            size={40}
            round
            className="transition-all hover:opacity-90"
          />
        </FacebookShareButton>
        <TwitterShareButton url={shareUrl}>
          <TwitterIcon
            size={40}
            round
            className="transition-all hover:opacity-90"
          />
        </TwitterShareButton>
        <WhatsappShareButton url={shareUrl} separator=":: ">
          <WhatsappIcon
            size={40}
            round
            className="transition-all hover:opacity-90"
          />
        </WhatsappShareButton>
        <LinkedinShareButton url={shareUrl}>
          <LinkedinIcon
            size={40}
            round
            className="transition-all hover:opacity-90"
          />
        </LinkedinShareButton>
      </div>
      <Text variant="small">{t('text-or-copy-link')}</Text>
      <div className="relative mt-2.5 mb-1.5">
        <Input
          type="link"
          variant="solid"
          className="w-full"
          value={shareUrl}
          inputClassName="px-4 border-skin-base rounded-md focus:outline focus:border-skin-primary"
          {...register('shareLink', {
            pattern: {
              value:
                /^((https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}))$/,
              message: ' ',
            },
          })}
        />
        {!copyText.copied ? (
          <CopyToClipboard
            text={copyText.value}
            onCopy={() =>
              setCopyText({
                ...copyText,
                copied: true,
              })
            }
          >
            <span
              className="absolute end-0.5 top-[6%] h-[90%] px-2 text-skin-primary text-sm uppercase font-bold flex items-center bg-skin-fill cursor-pointer"
              role="button"
            >
              {t('text-copy')}
            </span>
          </CopyToClipboard>
        ) : (
          <span className="absolute end-0.5 top-[6%] h-[90%] pe-1.5 ps-8 text-skin-primary text-sm uppercase font-bold flex items-center bg-skin-fill cursor-pointer">
            {t('text-copied')}
          </span>
        )}
      </div>
    </div>
  );
};

export default SocialShareBox;
