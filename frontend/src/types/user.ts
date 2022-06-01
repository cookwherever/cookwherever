export interface User {
  id: string;
  createdAt: Date;
  displayName: string;
  avatarUrl: string;
  locale: string;
  email: string;
  isAnonymous: boolean;
  defaultRole: string;
  metadata: Metadata;
  emailVerified: boolean;
  phoneNumber: null;
  phoneNumberVerified: boolean;
  activeMfaType: null;
  roles: string[];
}

export interface Metadata {
}
