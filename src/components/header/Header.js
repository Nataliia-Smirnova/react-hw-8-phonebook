import React from 'react';
import { connect } from 'react-redux';
import { authSelectors } from '../../redux/auth';
import UserBar from './UserBar';
import AuthLinks from './AuthLinks';

const Header = ({ isAuth }) => (
  <header>{isAuth ? <UserBar /> : <AuthLinks />}</header>
);

const mapStateToProps = state => ({
  isAuth: authSelectors.getIsAuth(state),
  name: authSelectors.getUsername(state),
});

export default connect(mapStateToProps)(Header);
