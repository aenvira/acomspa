import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { FormPrimaryButton, RoundIconButton } from '../components/Buttons/Buttons'
import { isRequired, isMin, isAlphaNumeric, check } from '../utils/validations'

const min3 = isMin(3)

const validate = check({
  channelName: [ isRequired, min3 ]
})

const warn = check({
  channelName: [ isAlphaNumeric ]
})

const renderField = ({
  input,
  label,
  type,
  meta
}) => {
  const { touched, error, warning } = meta

  return (
    <div className='w5 pv2'>
      <label className='db pb1'>{label}</label>
      <input {...input} type={type} className='ba b--light-gray pa2 f5 w-100 mb1'/>
      {
        touched
        && ((error && <span className='f7 red'>{error}</span>)
        || (warning && <span className='f7 yellow'>{warning}</span>))
      }
    </div>
  )
}

const AddChannelForm = props => {
  const { handleSubmit, back, valid, dirty } = props

  return (
    <form onSubmit={handleSubmit} className='flex flex-column items-center justify-center w-100 h-100'>
      <div className='w5 pv2'>
        <RoundIconButton icon='arrow-left' onClick={back}/>
      </div>
      <Field
        label='Channel name'
        type='text'
        name='channelName'
        component={renderField}
      />
      <div className='w5 pv2 flex'>
        <FormPrimaryButton className='pv2 ph3 bg-lightest-blue'>Add</FormPrimaryButton>
        <Link to='/chat' className='link pv2 ph3'>Cancel</Link>
      </div>
    </form>
  )
}

export default reduxForm({ form: 'addChannel', validate, warn })(AddChannelForm)
