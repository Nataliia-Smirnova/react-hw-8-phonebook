import axios from 'axios';
import {
  addContactRequest,
  addContactSuccess,
  addContactError,
  deleteContactRequest,
  deleteContactSuccess,
  deleteContactError,
  getContactRequest,
  getContactSuccess,
  getContactError,
  changeFilter,
} from './contacts-actions';

const getContacts = () => async dispatch => {
  dispatch(getContactRequest());

  try {
    const response = await axios.get(
      'https://goit-phonebook-api.herokuapp.com/contacts',
    );
    dispatch(getContactSuccess(response.data));
  } catch (error) {
    dispatch(getContactError(error.message));
  }
  // axios
  //   .get('https://goit-phonebook-api.herokuapp.com/contacts')
  //   .then(res => dispatch(getContactSuccess(res.data)))
  //   .catch(err => dispatch(getContactError(err)));
};

const addContact = contact => async dispatch => {
  dispatch(addContactRequest());

  try {
    const response = await axios.post(
      'https://goit-phonebook-api.herokuapp.com/contacts',
      { ...contact },
    );
    dispatch(addContactSuccess(response.data));
  } catch (error) {
    dispatch(addContactError(error.message));
  }

  // axios
  //   .post('https://goit-phonebook-api.herokuapp.com/contacts', { ...contact })
  //   .then(res => dispatch(addContactSuccess(res.data)))
  //   .catch(err => dispatch(addContactError(err)));
};

const deleteContact = id => async dispatch => {
  dispatch(deleteContactRequest());

  try {
    const response = await axios.delete(
      `https://goit-phonebook-api.herokuapp.com/contacts/${id}`,
    );
    dispatch(deleteContactSuccess(id));
  } catch (error) {
    dispatch(deleteContactError(error.message));
  }

  // axios
  //   .delete(`https://goit-phonebook-api.herokuapp.com/contacts/${id}`)
  //   .then(() => dispatch(deleteContactSuccess(id)))
  //   .catch(err => dispatch(deleteContactError(err)));
};

export default {
  getContacts,
  addContact,
  deleteContact,
};
