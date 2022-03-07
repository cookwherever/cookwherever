import { atom } from 'recoil'

export const userState = atom({
  key: 'UserState',
  default: localStorage.getItem('user'),
})
