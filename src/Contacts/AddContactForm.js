import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { FormPrimaryButton } from '../components/Buttons/Buttons'

const AddContactForm = props => {
  const { handleSubmit, users } = props

  return (
    <form onSubmit={handleSubmit} className='flex flex-column items-center justify-center w-100 h-100'>
      <div className='w5 pv2'>
        <label className='db pb1'>Select User</label>
        <Field
          className='ba b--light-gray pa2 f5 w-100'
          name='contact'
          component='select'
        >
          <option/>
          {
            users.map((u, i) => <option key={i} value={u._id}>{ u.username }</option>)
          }
        </Field>
      </div>

      <div className='w5 pv2 flex'>
        <FormPrimaryButton className='pv2 ph3 bg-lightest-blue'>Add</FormPrimaryButton>
        <Link to='/chat' className='link pv2 ph3'>Cancel</Link>
      </div>

    </form>
  )
}

export default reduxForm({ form: 'addContact' })(AddContactForm)
