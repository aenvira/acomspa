import React from 'react'
import { Avatar } from '../components/Avatars/Avatars'
import { RoundIconButton, IconOnlyButton } from '../components/Buttons/Buttons'

const getOtherParticipant = (channel, user) =>
  channel.participants.filter(p => p._id !== user._id)[0]

const ProfileBar = props => {
  const { channel, currentUser, switchToChannels, channelsInView } = props
  const backArrow = channelsInView ? 'dn' : 'db dn-l'

  return (
    <div className='flex justify-between pa2 bg-light-gray'>
      <div className='flex items-center'>
        <div className={`${backArrow}`}>
          <IconOnlyButton icon='arrow-left' onClick={switchToChannels} />
        </div>
        <Avatar user={ channel.isPrivate ? getOtherParticipant(channel, currentUser) : channel } withStatus={true}/>
        <div className='flex flex-column'>
          <div className='pl3 flex-auto f5'>{ channel.isPrivate ? getOtherParticipant(channel, currentUser).username : channel.name }</div>
          <div className='flex ph3 pt2 f7 dark-gray'>
            {
              channel.isPrivate
                ? ''
                : channel.participants
              && channel.participants
                .map(p => <div key={p._id} className='pr1'>{ p.username }</div>)
            }
          </div>
        </div>
      </div>
      {/* <div>
        <RoundIconButton icon='ellipsis-v'/>
      </div> */}
    </div>
  )
}

export default ProfileBar
