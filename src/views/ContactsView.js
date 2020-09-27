import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import { contactsOperations, contactsSelectors } from '../redux/contacts/index';

import Contacts from '../components/contacts/Contacts';
import Form from '../components/form/Form';
import Filter from '../components/filter/Filter';

class ContactsView extends React.Component {
  state = {
    isMounted: false,
    cMounted: false,
  };

  componentDidMount() {
    if (this.props.items.length > 1) {
      this.setState({ isMounted: true });
    }

    this.props.getContacts();
    this.setState({ cMounted: true });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.items !== prevProps.items) {
      this.setState({ isMounted: false, cMounted: false });
    }
  }

  render() {
    const { cMounted } = this.state;

    return (
      <div id="content">
        <CSSTransition in={true} appear={true} classNames="title" timeout={750}>
          <h1 id="title">Phonebook</h1>
        </CSSTransition>
        <Form />
        <h2 id="text">Contacts</h2>
        <CSSTransition
          in={this.props.items.length > 1}
          classNames={this.state.isMounted ? 'filter-appear' : 'filter'}
          timeout={500}
          unmountOnExit
        >
          <Filter />
        </CSSTransition>
        <Contacts mounted={cMounted} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    items: contactsSelectors.getItems(state),
  };
};

const mapDispatchToProps = dispatch => ({
  getContacts: () => dispatch(contactsOperations.getContacts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactsView);
