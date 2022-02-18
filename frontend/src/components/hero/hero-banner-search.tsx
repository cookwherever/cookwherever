import { useTranslation } from 'next-i18next';
import SearchIcon from '@components/icons/search-icon';
import React, { useState } from 'react';
import { useRouter } from 'next/router';

const HeroSearchBox = () => {
  const { t } = useTranslation('forms');
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  function onSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    router.push(`/search?q=${searchTerm}`);
  }
  return (
    <form
      className="flex w-full relative rounded-md mt-6"
      noValidate
      role="search"
      onSubmit={onSubmit}
    >
      <label htmlFor="hero-search" className="flex flex-1 items-center py-0.5">
        <input
          id="hero-search"
          className="text-heading outline-none w-full h-14 md:h-16 ps-5 md:ps-6 pe-14 md:pe-16 bg-skin-fill text-sm lg:text-base rounded-md shadow-heroSearch transition-all duration-200 focus:ring-2 focus:ring-skin-form"
          placeholder={t('placeholder-search')}
          aria-label="Search"
          autoComplete="off"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </label>

      <button
        type="submit"
        title="Search"
        className="outline-none absolute top-0 end-0 w-14 md:w-16 h-full flex items-center justify-center transition duration-200 ease-in-out hover:text-heading focus:outline-none"
      >
        <SearchIcon className="w-5 h-5 text-skin-base text-opacity-40" />
      </button>
    </form>
  );
};

export default HeroSearchBox;
