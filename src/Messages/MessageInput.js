import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { IconOnlyButton } from '../components/Buttons/Buttons'

const MessageInput = props => {
  const { handleSubmit } = props

  return (
    <form onSubmit={handleSubmit} className='flex w-100 bg-silver-gray pa1'>
      <div className='flex-auto pr1'>
        <Field
          name='message'
          type='text'
          component="input"
          className='w-100 pa2'
          autoComplete='off'
        />
      </div>
      <IconOnlyButton type='submit' icon='send'/>
    </form>
  )
}

export default reduxForm({ form: 'messageInput' })(MessageInput)
