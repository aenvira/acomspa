import React from 'react'
import ListItem from '../components/ListItem/ListItem'
import { emojify } from 'react-emojione'

const getOtherParticipant = current => participants =>
  participants.filter(x => x._id !== current._id)[0]

const ChannelsListItem = props => {
  const { channel, currentUser, hasUnreadMessages, latestMessage, onClick } = props
 
  const additionalText = latestMessage.length > 50
    ? `${emojify(latestMessage.slice(0, 50), { output: 'unicode' })}...`
    : emojify(latestMessage, { output: 'unicode' })

  const item = {
    name: channel.isPrivate ? getOtherParticipant(currentUser)(channel.participants).username : channel.name,
    picture: channel.isPrivate ? getOtherParticipant(currentUser)(channel.participants).picture : channel.picture,
    additionalText: additionalText,
    hasUnreadMessages: hasUnreadMessages,
    channel: channel,
    status: !!channel.isPrivate
  }

  const config = {
    withStatus: !!channel.isPrivate,
    onClick: onClick
  }

  return <ListItem item={item} config={config}/>
}

export default ChannelsListItem
