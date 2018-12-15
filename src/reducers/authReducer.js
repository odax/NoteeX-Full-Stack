import { LOGIN_SUCCESS, LOGIN_ERROR } from '../actions';

const initState = {
  authError: null
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case LOGIN_ERROR:
      console.log("login error");
      return {
        ...state,
        authError: "Login Failed"
      };
    case LOGIN_SUCCESS:
      console.log("login success");
      return {
        ...state,
        authError: null
      };
    default:
      return state;
  }
  return state;
};

export default authReducer;
