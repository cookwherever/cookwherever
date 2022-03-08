export type ViewMode = 'view' | 'edit';

export interface UserObject {
  token: string | null;
  viewMode: ViewMode;
}

export const initUser = (): UserObject => ({
  token: localStorage.getItem('user'),
  viewMode: 'view',
})
