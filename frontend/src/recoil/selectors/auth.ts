import { selector } from 'recoil'
import { userState } from '../atoms/auth';

export const getUserViewMode = selector({
  key: 'getUserViewMode',
  get: async ({ get }) => {
    const state = get(userState);
    return state.viewMode;
  },
})
