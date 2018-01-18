import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { requestResetPassword } from './AuthActions'
import ResetPasswordForm from './ResetPasswordForm'

const ResetPassword = ({ match, actions, resetPassword }) => {
  const handleResetPassword = formData => {
    const { requestResetPassword } = actions
    //console.log(match.params.token)
    requestResetPassword({
      token: match.params.token,
      password: formData.password
    })
  }

  return (
    <ResetPasswordForm onSubmit={handleResetPassword} resetPassword={resetPassword}/>
  )
}

export default connect(
  s => ({ resetPassword: s.resetPassword }),
  dispatch => ({ actions: bindActionCreators({ requestResetPassword }, dispatch) })
)(ResetPassword)
