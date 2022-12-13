import React from 'react';
import {NavigateOptions, useSearchParams} from "react-router-dom";

export function useQueryParam<T>(
  key: string
): [T | undefined, (newQuery: T, options?: NavigateOptions) => void] {
  const [searchParams, setSearchParams] = useSearchParams();
  const paramValue = searchParams.get(key);

  const value = React.useMemo(() => JSON.parse(decodeURIComponent(paramValue || '{}')), [paramValue]);

  const setValue = React.useCallback(
    (newValue: T, options?: NavigateOptions) => {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set(key, encodeURIComponent(JSON.stringify(newValue)));
      setSearchParams(newSearchParams, options);
    },
    [key, searchParams, setSearchParams]
  );

  return [value, setValue];
}
