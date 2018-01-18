import React from 'react'

import ContactsListItem from './ContactsListItem'

const ContactsList = props => {
  const { contacts, onItemClick } = props

  return (
    <div className='bg-light-gray'>
      <ul className='list pl0 mt0 measure center'>
        { 
          contacts && contacts.map((contact, i) => 
            <ContactsListItem key={i} contact={contact} onClick={e => onItemClick(contact)}/>
          ) 
        }
      </ul>
    </div>
  )
}

export default ContactsList
