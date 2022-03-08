import { atom } from 'recoil'
import { initUser } from 'src/model/user'

export const userState = atom({
  key: 'UserState',
  default: initUser(),
})
