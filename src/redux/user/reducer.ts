import UserActionTypes from './actions-type';

type initialStateType = {
  token: string;
};

const initialState: initialStateType = {
  token: '',
};

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case UserActionTypes.LOGIN:
      return { ...state, token: action.payload };
    case UserActionTypes.LOGOUT:
      return { ...state, token: null };
  }
  return state;
};

export default userReducer;
