import { useEffect } from 'react';

export default function useFreezeBodyScroll(freezeState: boolean) {
  useEffect(() => {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = freezeState ? 'hidden' : 'auto';
    document.body.style.paddingRight = freezeState
      ? `${scrollbarWidth}px`
      : '0';
  }, [freezeState]);
}
