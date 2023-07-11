import UserActionTypes from './actions-type';

export const userID = (payload: string) => ({
  type: UserActionTypes.SET_ID,
  payload,
});

export const userToken = (payload: string) => ({
  type: UserActionTypes.SET_TOKEN,
  payload,
});
