export interface LoginDetails {
  username: string;
  password: string;
  remember: boolean | undefined;
}

export interface AuthState {
  loginDetails: LoginDetails;
  hasError: boolean;
  accessToken?: string | null;
  refreshToken?: string | null;

  setLoginDetails: (details: LoginDetails) => void;
  hasLoginError: () => void;
  login: () => Promise<void>;
  refresh: () => Promise<void>;
}


export interface Profile {
  name: string;
  dob: Date;
  gender: string;
}

export interface UserDetail {
  id: number;
  profile: Profile;
  email: string;
  username: string;
}

export interface UserState {
  userDetail: UserDetail | null;
  isAuthenticated: boolean;
  hasError: boolean;
  hasFetchingError: () => void;
  setUserUnauthenticated: () => void;
  setUserDetails: (userDetail: UserDetail) => void;
  fetchSelf: () => void;
}