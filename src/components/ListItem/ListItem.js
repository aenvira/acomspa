import React from 'react'
import { Avatar } from '../Avatars/Avatars'

const ListItem = props => {
  const { item, config } = props

  return (
    <li
      className={
        item.hasUnreadMessages
          ? 'br bw2 b--green'
          : ''
      }
      onClick={_ => config.onClick(item)}
    >
      <div className='flex items-center lh-copy ph0-l dim pointer'>
        <div className='pa3'>
          <Avatar withStatus={config.withStatus} status={item.status} user={item}/>
        </div>
        <div className="flex-auto bb b--black-10 h-100 pv3 pr3">
          <div className="f5 db black-90">{ item.name }</div>
          <div className="f6 db black-70 overflow-hidden">{ item.additionalText }</div>
        </div>
      </div>
    </li>
  )
}

export default ListItem
