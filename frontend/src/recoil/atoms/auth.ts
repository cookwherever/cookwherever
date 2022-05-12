import {atom, AtomEffect} from 'recoil'
import {initUser, initViewMode, ViewMode} from 'src/model/user'

import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

export const userState = atom({
  key: 'UserState',
  default: initUser(),
})

export const viewModeState = atom<ViewMode>({
  key: 'ViewMode',
  default: initViewMode(),
  effects_UNSTABLE: [ persistAtom ],
})