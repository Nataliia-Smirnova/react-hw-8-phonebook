export const getIsAuth = state => Boolean(state.auth.token);

export const getUsername = state => state.auth.user.name;

export default {
  getIsAuth,
  getUsername,
};
