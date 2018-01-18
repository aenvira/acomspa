import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addContact } from './ContactsActions'
import AddContactForm from './AddContactForm'

class AddContact extends React.Component {

  handleSubmit = (data) => {
    console.log('add contact form submit', data)
    const { addContact } = this.props.actions

    addContact({ contactId: data.contact })
  }

  render() {
    const { allusers } = this.props
    return (
      <AddContactForm onSubmit={this.handleSubmit} users={allusers}/>
    )
  }
}

export default connect(
  s => ({ currenUser: s.currentUser, allusers: s.allusers }),
  dispatch => ({ actions: bindActionCreators({ addContact }, dispatch) })
)(AddContact)
