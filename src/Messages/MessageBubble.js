import React from 'react'
import { emojify } from 'react-emojione'

const MessageBubble = props => {
  const { message, currentUser } = props
  const poz = message.author.userId === currentUser._id ? 'justify-end' : 'justify-start'
  const stylez = message.author.userId === currentUser._id ? 'bg-lightest-blue tri-right right-top' : 'bg-white tri-right left-top'

  return message.text
    ? (
      <div className={`pa1 bg-transparent mh4 flex ${poz}`}>
        <div className={`talk-bubble ${stylez} ml2 shadow-x br2 b--white`}>
          <div className='talktext pa2 f6'>
            <p>{ emojify(message.text, { output: 'unicode' }) }</p>
          </div>
        </div>
      </div>
    )
    : ''
}

export default MessageBubble
