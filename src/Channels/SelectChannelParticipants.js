import React from 'react'
import { Link, Route } from 'react-router-dom'
import AddItemPill from '../components/Pills/AddItemPill'
import ContactsList from '../Contacts/ContactsList'
import { RoundIconButton } from '../components/Buttons/Buttons'
class SelectChannelParticipants extends React.Component {

  render() {
    const { participants, contacts, addParticipant, removeParticipant, next } = this.props
    return (
      <div>
        <div className='bg-light-gray'>
          <div className='flex'>
            <Link to='/chat' className='link dark-blue pa3'>
              <i className='fa fa-arrow-left'></i>
            </Link>
            <h4 className='f4 pa3 dark-blue'>Add Participants</h4>
          </div>
          <div className='flex'>
            { participants.map((x, i) => <AddItemPill key={i} label={x.username} handleRemove={() => removeParticipant(x)}/>)  }
          </div>
        </div>
        <ContactsList contacts={contacts} onItemClick={addParticipant}/>
        <div className='pv2 flex justify-center'>
        { 
          participants.length !== 0 
          ? <RoundIconButton onClick={next} icon='arrow-right' className='bg-green'/>
          : '' 
        }
        </div>
      </div>
    )
  }
}

export default SelectChannelParticipants
