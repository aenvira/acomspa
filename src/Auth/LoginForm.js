import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { FormPrimaryButton } from '../components/Buttons/Buttons'
import { Link } from 'react-router-dom'
import Loading from '../components/Loading/Loading'
import Done from '../components/Done/Done'
import { ErrorMessage } from '../components/Errors/Errors'

const LoginForm = props => {
  const { handleSubmit, token } = props

  return (
    <form onSubmit={handleSubmit} className='flex flex-column items-center justify-center w-100 h-100'>
      <div className='w5 pv2'>
        <label className='db pb1'>Email</label>
        <Field
          className='ba b--light-gray pa2 f5 w-100'
          name='username'
          type='text'
          component="input"
        />
      </div>
      <div className='w5 pv2'>
        <label className='db pb1'>Password</label>
        <Field
          className='ba b--light-gray pa2 f5 w-100'
          name='password'
          type='password'
          component="input"
        />
      </div>
      <div className='w5 pv2 flex'>
        <FormPrimaryButton className='pv2 ph3 bg-lightest-blue'>Login</FormPrimaryButton>
        <Link to='/register' className=' link pv2 ph3'>Register</Link>
      </div>
      <div className='w5'>
        {
          token.cata({
            NotAsked: () => ' ',
            Loading: () => <Loading/>,
            Failed: err => <ErrorMessage error={err}/>,
            Succeded: val => <Done/>
          })
        }
      </div>
      <div className='w5'>
        <Link to='/forgotPassword' className='link pv2 f7'>I forgot my password</Link>
      </div>
    </form>
  )
}

export default reduxForm({ form: 'login' })(LoginForm)
