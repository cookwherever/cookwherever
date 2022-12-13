import { atom, AtomEffect } from 'recoil'

import { recoilPersist } from 'recoil-persist'

export type ViewMode = 'view' | 'edit' | 'developer';

export const initViewMode = (): ViewMode => (
  localStorage.getItem('developer') as ViewMode || 'view'
)

const { persistAtom } = recoilPersist()

export const viewModeState = atom<ViewMode>({
  key: 'ViewMode',
  default: initViewMode(),
  effects_UNSTABLE: [ persistAtom ],
})