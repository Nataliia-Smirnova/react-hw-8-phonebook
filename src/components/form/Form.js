import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import {
  contactsOperations,
  contactsSelectors,
} from '../../redux/contacts/index';

import styles from './Form.module.css';

class Form extends React.Component {
  state = {
    name: '',
    number: '',
    showAlert: false,
    showInfo: false,
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = e => {
    e.preventDefault();

    const { name, number } = this.state;
    const sameContact = this.props.items.find(contact => contact.name === name);

    if (!name || !number) {
      this.setState({ showInfo: true });
      setTimeout(() => this.setState({ showInfo: false }), 1500);
    } else if (sameContact) {
      this.setState({ showAlert: true });
      setTimeout(() => this.setState({ showAlert: false }), 1500);
    } else if (name && number) {
      const data = { name: this.state.name, number: this.state.number };
      this.props.onSubmit(data);
    }

    this.resetForm();
  };

  resetForm = () => {
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    return (
      <form className={styles.phonebook__form} onSubmit={this.handleFormSubmit}>
        <label className={styles.phonebook__label}>
          Name
          <input
            className={styles.phonebook__input}
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleInputChange}
          />
        </label>
        <label className={styles.phonebook__label}>
          Number
          <input
            className={styles.phonebook__input}
            type="text"
            name="number"
            value={this.state.number}
            onChange={this.handleInputChange}
          />
        </label>
        <button type="submit" className={styles.btn}>
          Add contact
        </button>
        <CSSTransition
          in={this.state.showAlert}
          classNames="alert"
          timeout={500}
          unmountOnExit
        >
          <p className={styles.alert}>Contact already exists!</p>
        </CSSTransition>
        <CSSTransition
          in={this.state.showInfo}
          classNames="info"
          timeout={500}
          unmountOnExit
        >
          <p className={styles.info}>Fill both fields please</p>
        </CSSTransition>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  items: contactsSelectors.getItems(state),
});

const mapDispatchToProps = dispatch => ({
  onSubmit: contact => dispatch(contactsOperations.addContact(contact)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
