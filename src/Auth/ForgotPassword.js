import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { requestForgotPassword } from './AuthActions'
import ForgotPasswordForm from './ForgotPasswordForm'

const ForgotPassword = (props) => {
  const handleForgotPassword = formData => {
    const { requestForgotPassword } = props.actions

    requestForgotPassword(formData)
  }

  return (
    <ForgotPasswordForm onSubmit={handleForgotPassword} forgotPassword={props.forgotPassword}/>
  )
}

export default connect(
  s => ({ forgotPassword: s.forgotPassword }),
  dispatch => ({ actions: bindActionCreators({ requestForgotPassword }, dispatch) })
)(ForgotPassword)
