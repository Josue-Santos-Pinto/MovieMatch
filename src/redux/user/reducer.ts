import UserActionTypes from './actions-type';

type FavType = {
  id: number;
  img: string;
  vote_average: number;
};

type initialStateType = {
  userKeys: {
    id: string;
    token: string;
  };
};

const initialState: initialStateType = {
  userKeys: {
    id: '',
    token: '',
  },
};

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case UserActionTypes.LOGIN:
      return { ...state, userKeys: action.payload };
    case UserActionTypes.LOGOUT:
      return { ...state, token: null };
  }
  return state;
};

export default userReducer;
