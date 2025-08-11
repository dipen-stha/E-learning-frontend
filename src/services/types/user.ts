export interface LoginDetails {
  username: string;
  password: string;
  remember: boolean | undefined;
}

export interface UserState {
  loginDetails: LoginDetails;
  hasError: boolean;
  accessToken?: string | null;
  refreshToken?: string | null;

  setLoginDetails: (details: LoginDetails) => void;
  hasLoginError: () => void;
  login: () => Promise<void>;
}