import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { FormPrimaryButton } from '../components/Buttons/Buttons'
import { Link } from 'react-router-dom'
import Loading from '../components/Loading/Loading'
import Done from '../components/Done/Done'
import { ErrorMessage } from '../components/Errors/Errors'

const ForgotPasswordForm = props => {
  const { handleSubmit, forgotPassword } = props

  return (
    <form onSubmit={handleSubmit} className='flex flex-column items-center justify-center w-100 h-100'>
      <div className='w5 pv2'>
        <label className='db pb1'>Username</label>
        <Field
          className='ba b--light-gray pa2 f5 w-100'
          name='username'
          type='text'
          component="input"
        />
      </div>
      <div className='w5 pv2 flex'>
        <FormPrimaryButton className='pv2 ph3 bg-lightest-blue'>Reset password</FormPrimaryButton>
        <Link to='/' className=' link pv2 ph3'>Cancel</Link>
      </div>
      <div className='w5'>
        {
          forgotPassword.cata({
            NotAsked: () => ' ',
            Loading: () => <Loading/>,
            Failed: err => <ErrorMessage error={err}/>,
            Succeded: val => <Done/>
          })
        }
      </div>
    </form>
  )
}

export default reduxForm({ form: 'forgotPassword' })(ForgotPasswordForm)
