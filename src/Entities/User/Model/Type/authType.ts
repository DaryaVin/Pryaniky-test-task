export type AuthItem = {
  id: string;
  username?: string;
  password?: string;
};

export type AuthResponse = {
  data: {
    token: string;
  };
};

export type AuthError = {
  message: string;
  errorCode?: string;
};
