import UserActionTypes from './actions-type';

export const loginUser = (payload: object) => ({
  type: UserActionTypes.LOGIN,
  payload,
});

export const setLanguage = (payload: object) => ({
  type: UserActionTypes.SET_LANGUAGE,
  payload,
});
