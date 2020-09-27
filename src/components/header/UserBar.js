import React from 'react';
import { connect } from 'react-redux';
import { authSelectors } from '../../redux/auth';
import { authOperations } from '../../redux/auth';

import styles from './Header.module.css';

const UserBar = ({ name, onLogout }) => (
  <div className={styles.userBar}>
    <p className={styles.text}>Welcome, {name}!</p>
    <div></div>
    <button type="button" className={styles.btn} onClick={onLogout}>
      LogOut
    </button>
  </div>
);

const mapStateToProps = state => ({
  name: authSelectors.getUsername(state),
});

const mapDispatchToProps = {
  onLogout: authOperations.logOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserBar);
