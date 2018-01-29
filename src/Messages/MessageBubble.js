import React from 'react'
import {emojify} from 'react-emojione'

const MessageBubble = props => {
  const { message, currentUser } = props

  return message.text
    ? (message.author.userId === currentUser._id)
    ? (
      <div className='pa1 bg-transparent mh4 flex justify-end'>
        <div className='talk-bubble bg-lightest-blue tri-right right-top ml2 shadow-x br2 b--white'>
          <div className='talktext pa2 f6'>
            <p>{ emojify(message.text, { output: 'unicode' }) }</p>
          </div>
        </div>
      </div>
    )
    : (
      <div className='pa1 bg-transparent mh4 flex justify-start'>
        <div className='talk-bubble bg-white tri-right left-top ml2 shadow-x br2 b--white'>
          <div className='talktext pa2 f6'>
            <p>{ emojify(message.text, { output: 'unicode' }) }</p>
          </div>
        </div>
      </div>
    )
  : ''
}

export default MessageBubble
