export enum AuthActionTypes {
  REGISTER_SUCCESS = 'REGISTER_SUCCESS',
  REGISTER_FAIL = 'REGISTER_FAIL',
  USER_LOADED = 'USER_LOADED',
  AUTH_ERROR = 'AUTH_ERROR',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAIL = 'LOGIN_FAIL',
  LOGOUT = 'LOGOUT',
  CLEAR_ERRORS = 'CLEAR_ERRORS',
}

interface REGISTER_SUCCESS {
  type: AuthActionTypes.REGISTER_SUCCESS;
  payload: any;
}

interface REGISTER_FAIL {
  type: AuthActionTypes.REGISTER_FAIL;
  payload: any;
}

interface USER_LOADED {
  type: AuthActionTypes.USER_LOADED;
  payload: any;
}
interface AUTH_ERROR {
  type: AuthActionTypes.AUTH_ERROR;
  payload?: any;
}
interface LOGIN_SUCCESS {
  type: AuthActionTypes.LOGIN_SUCCESS;
  payload: any;
}
interface LOGIN_FAIL {
  type: AuthActionTypes.LOGIN_FAIL;
  payload: any;
}
interface LOGOUT {
  type: AuthActionTypes.LOGOUT;
  payload?: any;
}
interface CLEAR_ERRORS {
  type: AuthActionTypes.CLEAR_ERRORS;
  payload?: any;
}

export type AuthAction =
  | REGISTER_SUCCESS
  | REGISTER_FAIL
  | USER_LOADED
  | AUTH_ERROR
  | LOGIN_SUCCESS
  | LOGIN_FAIL
  | LOGOUT
  | CLEAR_ERRORS;
