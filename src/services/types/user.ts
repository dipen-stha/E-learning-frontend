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
  login: () => Promise<boolean>;
  refresh: () => Promise<void>;
  logout: () => Promise<void>;
}


export interface Profile {
  name: string;
  dob: Date;
  gender: string;
  avatar: string;
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
  isLoading: boolean;
  hasFetchingError: () => void;
  setUserUnauthenticated: () => void;
  setUserDetails: (userDetail: UserDetail) => void;
  completeLoader: () => void;
  fetchSelf: () => void;
}