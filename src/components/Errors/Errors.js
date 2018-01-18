import React from 'react'

export const ErrorMessage = props => {
  const { error } = props
  return (
    <div className='pa2 f7'>
      <span className='dark-red'>{ error.message }</span>
    </div>
  )
}

