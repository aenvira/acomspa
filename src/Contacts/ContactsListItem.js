import React from 'react'
import ListItem from '../components/ListItem/ListItem'

const ContactsListItem = props => {
  const { contact, onClick } = props
  const item = {
    name: contact.username,
    picture: contact.picture,
    additionaltext: '',
    contact: contact
  }

  const config = {
    withStatus: false,
    onClick: onClick
  }
  
  return <ListItem item={item} config={config}/>
}

export default ContactsListItem
