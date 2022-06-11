import { Type } from './constants';
export const usersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case Type.request:
      return { loading: true, users: [] };
    case Type.sucess:
      return { loading: false, users: action.payload };
    case Type.fail:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
