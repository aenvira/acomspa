import React from 'react'
import SearchBar from './SearchBar'
import ChannelsListItem from './ChannelsListItem'

const ChannelsList = props => {
  const { channels, latestMessages, onItemClick, currentUser } = props

  return (
    <div className='overflow-hidden' style={{ height: `${window.innerHeight - 60}px` }}>
      <SearchBar/>
      <div className='bg-light-gray overflow-scroll h-100'>
        <h4 className='f4 pa3 dark-blue'>Chats</h4>
        <ul className='list pl0 mt0 measure center'>
          {
            channels.map(c => {
              return latestMessages[`${c._id}`]
                ? <ChannelsListItem
                  currentUser={currentUser}
                  key={c._id}
                  channel={c}
                  onClick={onItemClick}
                  hasUnreadMessages={!latestMessages[`${c._id}`].read}
                  latestMessage={latestMessages[`${c._id}`].message.text}
                />
                : <ChannelsListItem
                  currentUser={currentUser}
                  key={c._id}
                  channel={c}
                  onClick={onItemClick}
                  hasUnreadMessages={false}
                  latestMessage='&#8203;'
                />
            })
          }
        </ul>
      </div>
    </div>
  )
}

export default ChannelsList
