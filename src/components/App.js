import React, { Component, Suspense, lazy } from 'react';
import { connect } from 'react-redux';
import { authOperations } from '../redux/auth';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Header from './header/Header';
import routes from '../routes';

import '../styles.css';

const ContactsView = lazy(() =>
  import('../views/ContactsView' /* webpackChunkName: "contacts-view" */),
);
const LoginView = lazy(() =>
  import('../views/LoginView' /* webpackChunkName: "login-view" */),
);
const RegisterView = lazy(() =>
  import('../views/RegisterView' /* webpackChunkName: "register-view" */),
);

class App extends Component {
  componentDidMount() {
    this.props.onGetCurretnUser();
  }

  render() {
    return (
      <>
        <Header />
        <Suspense fallback={<h1>Loading</h1>}>
          <Switch>
            <PublicRoute
              exact
              path={routes.login}
              restricted
              redirectTo="/contacts"
              component={LoginView}
            />
            <PublicRoute
              exact
              path={routes.register}
              restricted
              redirectTo="/contacts"
              component={RegisterView}
            />
            <PrivateRoute
              exact
              path={routes.contacts}
              redirectTo="/login"
              component={ContactsView}
            />
            <Route path="/" component={LoginView} />
          </Switch>
        </Suspense>
      </>
    );
  }
}

const mapDispatchToProps = {
  onGetCurretnUser: authOperations.getCurrentUser,
};

export default connect(null, mapDispatchToProps)(App);
