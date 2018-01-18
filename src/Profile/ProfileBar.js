import React from 'react'
import { connect } from 'react-redux'
import { Avatar } from '../components/Avatars/Avatars'
import ProfileMenu from './ProfileMenu'

const ProfileBar = props => {
  const { currentUser = {} } = props

  return (
    <div className='flex justify-between pa2 bg-moon-gray h4'>
      <div className='flex items-center'>
        <div className='pr2'>
          <Avatar user={currentUser} withStatus={false}/>
        </div>
        <div>{ currentUser.username }</div>
      </div>
      <div>
        <ProfileMenu/>
      </div>
    </div>
  )
}

export default connect(
  s => ({ currentUser: s.currentUser })
)(ProfileBar)
