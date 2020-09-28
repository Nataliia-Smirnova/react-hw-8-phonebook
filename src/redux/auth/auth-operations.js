import axios from 'axios';
import {
  registerRequest,
  registerSuccess,
  registerError,
  loginRequest,
  loginSuccess,
  loginError,
  logoutRequest,
  logoutSuccess,
  logoutError,
  getCurrentUserRequest,
  getCurrentUserSuccess,
  getCurrentUserError,
} from './auth-actions';

axios.defaults.baseURL = 'https://goit-phonebook-api.herokuapp.com/';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

const register = registerData => async dispatch => {
  dispatch(registerRequest());

  try {
    const response = await axios.post('/users/signup', registerData);
    dispatch(registerSuccess(response.data));
  } catch (error) {
    dispatch(registerError(error.message));
  }

  // axios
  //   .post('/users/signup', registerData)
  //   .then(res => {
  //     token.set(res.data.token);

  //     dispatch(registerSuccess(res.data));
  //   })
  //   .catch(err => dispatch(registerError(err.message)));
};

const logIn = loginData => dispatch => {
  dispatch(loginRequest());

  // try {
  //   const response = await axios.post('/users/login', loginData);
  //   dispatch(loginSuccess(response.data));
  // } catch (error) {
  //   dispatch(loginError(error.message));
  // }

  axios
    .post('/users/login', loginData)
    .then(res => {
      token.set(res.data.token);
      dispatch(loginSuccess(res.data));
    })
    .catch(err => dispatch(loginError(err.message)));
};

const logOut = () => async dispatch => {
  dispatch(logoutRequest());

  try {
    const response = await axios.post('/users/logout');
    dispatch(logoutSuccess());
  } catch (error) {
    dispatch(logoutError(error.message));
  }

  // axios
  //   .post('/users/logout')
  //   .then(response => {
  //     token.unset();
  //     dispatch(logoutSuccess());
  //   })
  //   .catch(error => dispatch(logoutError(error)));
};

const getCurrentUser = () => async (dispatch, getState) => {
  const {
    auth: { token: lokalToken },
  } = getState();
  if (lokalToken === '') {
    return;
  }
  token.set(lokalToken);

  dispatch(getCurrentUserRequest());

  try {
    const response = await axios.get('/users/current');
    dispatch(getCurrentUserSuccess(response.data));
  } catch (error) {
    dispatch(getCurrentUserError(error.message));
  }

  // axios
  //   .get('/users/current')
  //   .then(response => {
  //     dispatch(getCurrentUserSuccess(response.data));
  //   })
  //   .catch(error => dispatch(getCurrentUserError(error)));
};

export default { register, logIn, logOut, getCurrentUser };
