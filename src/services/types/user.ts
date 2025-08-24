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
  logout: () => void;
}


export interface UserMinimal {
  id: string
  name: string
}

export interface Profile {
  name: string;
  dob: Date;
  gender: string;
  avatar: string;
  role: string;
}

export interface UserDetail {
  id: number;
  profile: Profile;
  email: string;
  username: string;
  is_active: boolean
  total_courses: number | null;
  courses_completed: number | null;
  joined_date: string | null;
  last_login: string | null;
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

export interface UserStats {
    total_count: number
    active_count: number
    suspended_count: number
    monthly_creation: number
    percent_total_count: number
    percent_active_count: number
    percent_monthly_creation: number
    percent_suspended_count: number
}

export interface UserPayload {
  user: UserDataPayload;
  avatar: File | null
}

export interface UserState {
  userDetailList: UserDetail[] | [];
  userMinimalList: UserMinimal[] | [];
  userDetail: UserDetail | null;
  userPayload: UserPayload | null;
  userStats: UserStats;
  isAuthChecked: boolean;
  isAdminAuthChecked: boolean;
  isAuthenticated: boolean;
  isAdminAuthenticated: boolean;
  hasError: boolean;
  isLoading: boolean;
  hasFetchingError: () => void;
  setUserUnauthenticated: () => void;
  
  setUserDetails: (userDetail: UserDetail) => void;
  setUserPayload: (data: UserPayload) => void;
  setUserDetailList: (userList: UserDetail[]) => void;
  fetchStudents: () => Promise<void>;
  fetchStudentStats: () => Promise<void>;
  fetchTutors: () => Promise<void>;
  completeLoader: () => void;
  fetchSelf: () => void;
  fetchAdminSelf: () => void;
  createUser: () => Promise<void>;
  reset: () => void;
}