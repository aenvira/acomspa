import React from 'react'
import ListItem from '../components/ListItem/ListItem'

const getOtherParticipant = current => participants => 
  participants.filter(x => x._id !== current._id)[0]

const ChannelsListItem = props => {
  const { channel, currentUser, hasUnreadMessages, latestMessage, onClick } = props
  
  const item = {
    name: channel.isPrivate ? getOtherParticipant(currentUser)(channel.participants).username : channel.name,
    picture: channel.isPrivate ? getOtherParticipant(currentUser)(channel.participants).picture : channel.picture,
    additionalText: `${latestMessage.slice(0, 50)}...`, 
    hasUnreadMessages: hasUnreadMessages,
    channel: channel,
    status: channel.isPrivate ? true : false
  }

  const config = {
    withStatus: channel.isPrivate ? true : false,
    onClick: onClick
  }
  return <ListItem item={item} config={config}/>
}

export default ChannelsListItem
