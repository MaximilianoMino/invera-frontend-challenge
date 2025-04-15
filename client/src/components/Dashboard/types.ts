export type User = {
  id: number;
  email?: string;
  name?: string;
  phone?: string;
  location?: string;
  company?: string;
  status?: string;
};

export type GeneralStatics = {
  totalUsers: number;
  newUsers: number;
  topUsers: number;
  otherUsers: number;
};

export type UserTypeKey = 'organic' | 'social' | 'direct';

export interface Distribution {
  type: UserTypeKey;
  percentage: number;
}


export interface ChartStats {
  type: UserTypeKey;
  percentage: number;
  totalUsers: number;
  fill?: string;
}

export interface UserTypes {
  totalUsers: number;
  distribution: Distribution[];
}

export enum Status {
  online = 1,
  offline
}
