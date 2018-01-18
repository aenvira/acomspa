import React from 'react'
import defaultAvatar from '../../images/default_avatar.png'

const getScreenName = user => {
  return user.username
  // return (user.firstName && user.lastName)
  //   ? `${user.firstName} ${user.lastName}`
  //   : user.username
}

const StatusPill = ({ status }) =>
  <div
    style={{
      position: 'relative',
      top: '-18px',
      right: '-28px',
      marginBottom: '-18px',
      marginRight: '-28px',
      width: '12px',
      height: '12px',
      borderRadius: '50%'
    }}
    className={status ? 'bg-green b--light-gray ba bw1' : 'bg-dark-gray b--light-gray ba bw1'}
  ></div>

export const Avatar = props => {
  const { user, diameter = '40px', withStatus = true } = props

  return (
    <div className=''>
      <img
        className='br-100'
        style={{

          width: diameter,
          height: diameter
        }}
        alt={ getScreenName(user) }
        title={ getScreenName(user) }
        src={ user.avatar ? `${user.avatar}` : `${defaultAvatar}` }
      />
      {
        withStatus ? <StatusPill status={false}/> : ''
      }
    </div>
  )
}
