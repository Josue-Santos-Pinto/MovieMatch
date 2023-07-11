import UserActionTypes from './actions-type';

type FavType = {
  id: number;
  img: string;
  vote_average: number;
};

type initialStateType = {
  id: string;
  token: string;
};

const initialState: initialStateType = {
  id: '',
  token: '',
};

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case UserActionTypes.SET_ID:
      return { ...state, id: action.payload };
    case UserActionTypes.SET_TOKEN:
      return { ...state, token: action.payload };
  }
  return state;
};

export default userReducer;
