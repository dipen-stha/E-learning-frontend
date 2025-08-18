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
  adminLogin: () => Promise<boolean>;
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

export interface UserDataPayload{
  name: string
  username: string
  email: string
  password: string
  confirm_password: string
  gender: string
  dob: Date
  is_active: boolean
}

export interface UserPayload {
  user: UserDataPayload;
  avatar: File | null
}

export interface UserState {
  userDetail: UserDetail | null;
  userPayload: UserPayload | null
  isAuthenticated: boolean;
  isAdminAuthenticated: boolean;
  hasError: boolean;
  isLoading: boolean;
  hasFetchingError: () => void;
  setUserUnauthenticated: () => void;
  
  setUserDetails: (userDetail: UserDetail) => void;
  setUserPayload: (data: UserPayload) => void;
  completeLoader: () => void;
  fetchSelf: () => void;
  fetchAdminSelf: () => void;
  createUser: (userData: UserDataPayload, file: File | null) => Promise<void>;
}