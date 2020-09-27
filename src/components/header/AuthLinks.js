import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import { connect } from 'react-redux';
import routes from '../../routes';

import styles from './Header.module.css';

class AuthLinks extends Component {
  render() {
    return (
      <ul className={styles.userBar}>
        <li>
          <NavLink
            to={routes.login}
            className={styles.contactsLink}
            activeClassName={styles.contactsLinkActive}
          >
            Login
          </NavLink>
        </li>
        <li>
          <NavLink
            to={routes.register}
            className={styles.contactsLink}
            activeClassName={styles.contactsLinkActive}
          >
            Register
          </NavLink>
        </li>
      </ul>
    );
  }
}

export default connect()(AuthLinks);
