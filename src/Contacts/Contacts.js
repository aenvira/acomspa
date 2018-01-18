import React from 'react'
import { Link, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { requestContacts, requestUsers } from './ContactsActions'
import ContactsList from './ContactsList'
import { createPrivateChannel } from '../Channels/ChannelsActions'

const NoContacts = props => (
  <div className='bg-light-gray pa2 w-100 h-100 flex justify-center items-center'>
    <div className='ba b--dark-gray f6 w5 pa2 bg-gray white'>
      <p className='mb2 cb'>You have no contacts to chat with. Maybe add some here</p>
      <Link to='/chat/contacts/add' className='link black bg-white border-box ph2'>Add contact</Link>
    </div>
  </div>
)

class Contacts extends React.Component {
  
  componentDidMount() {
    const { requestContacts, requestUsers } = this.props.actions
    const { currentUser } = this.props
    requestContacts(currentUser)
    requestUsers()
  }
  
  handleContactClick = (contact) => {
    const { createPrivateChannel } = this.props.actions
    const { channelsSocket, currentUser } = this.props

    createPrivateChannel({
      socket: channelsSocket,
      inviter: currentUser._id,
      invitee: contact._id
    })
  }

  render() {
    const { contacts } = this.props
    return (
      <div>
        <div className='flex bg-light-gray'>
          <Route path='/chat/contacts' render={props => (
              <Link to='/chat' className='link dark-blue pa3'>
                <i className='fa fa-arrow-left'></i>
              </Link>
            )}
          />
          <h4 className='f4 pa3 dark-blue'>Contacts</h4>
        </div>
      {
        (!contacts || contacts.length === 0)
          ? <NoContacts />
          : <ContactsList contacts={contacts} onItemClick={this.handleContactClick}/>
      }
      </div>
    )
  }
}

export default connect(
  s => ({ 
    contacts: s.contacts, 
    currentUser: s.currentUser, 
    channelsSocket: s.channelsSocket 
  }),
  dispatch => ({ 
    actions: bindActionCreators({ 
      requestContacts, 
      requestUsers, 
      createPrivateChannel 
    }, dispatch) })
)(Contacts)
