import { selector } from 'recoil';
import { viewModeState } from '../atoms/auth';

export const inDeveloperMode = selector({
  key: 'inDeveloperMode',
  get: ({ get }) => {
    return get(viewModeState) === 'developer';
  },
});
