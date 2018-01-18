import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createChannel } from './ChannelsActions'
import { requestContacts } from '../Contacts/ContactsActions'
import AddChannelForm from './AddChannelForm'
import SelectChannelParticipants from './SelectChannelParticipants'

const addParticipant = participant => state => ({
  participants: state.participants
    .filter(x => x._id !== participant._id)
    .concat(participant)
})

const removeParticipant = participant => state => ({
  participants: state.participants
    .filter(x => x._id !== participant._id)
})

class AddChannel extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      participants: [],
      step: 0
    }
  }

  componentDidMount() {
    const { requestContacts } = this.props.actions
    const { currentUser } = this.props
    requestContacts(currentUser)
  }

  handleAddParticipant = participant => 
    this.setState(addParticipant(participant))

  handleRemoveParticipant = participant =>
    this.setState(removeParticipant(participant))

  handleSubmit = data => {
    const { createChannel } = this.props.actions
    const { channelsSocket } = this.props
    createChannel({ 
      socket: channelsSocket,
      channelName: data.channelName,
      channelParticipants: this.state.participants
    })
  }

  handleNextStep = () => this.setState(prev => ({ step: prev.step + 1 }))
  handleBackStep = () => this.setState(prev => ({ step: prev.step - 1 }))

  render() {
    const { participants, step } = this.state
    const { contacts } = this.props
    return step === 0
      ? <SelectChannelParticipants 
          participants={participants} 
          contacts={contacts}
          addParticipant={this.handleAddParticipant}
          removeParticipant={this.handleRemoveParticipant}
          next={this.handleNextStep}
        />
      : <AddChannelForm onSubmit={this.handleSubmit} back={this.handleBackStep}/>
  }
}

export default connect(
  s => ({ 
    channelsSocket: s.channelsSocket, 
    contacts: s.contacts,
    currentUser: s.currentUser 
  }),
  dispatch => ({ actions: bindActionCreators({ createChannel, requestContacts }, dispatch) })
)(AddChannel)
