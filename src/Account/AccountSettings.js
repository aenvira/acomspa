import React from 'react'
import { Link, Route } from 'react-router-dom'
import { Avatar } from '../components/Avatars/Avatars'

const AccountSettings = props => {
  const { user } = props
  return (
    <div>
      <div className='flex bg-light-gray'>
        <Route path='/chat/account' render={props => (
              <Link to='/chat' className='link dark-blue pa3'>
                <i className='fa fa-arrow-left'></i>
              </Link>
            )}
        />
        <h4 className='f4 pa3 dark-blue'>Settings</h4>
      </div>
      <Link to='/chat/account/profile' className='flex item-center dim pointer pv4 ph2'>
        <Avatar user={user}/>

        <div className='pa2'>{ user.username }</div>
      </Link>
    </div>
  )
}

export default AccountSettings
