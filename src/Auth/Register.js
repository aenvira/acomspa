import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { requestRegister } from './AuthActions'
import { Redirect } from 'react-router-dom'
import RegisterForm from './RegisterForm'

class Register extends React.Component {
  state = {
    redirectToReferrer: false
  }

  onAuthSuccess = () => {
    this.setState(_ => ({ redirectToReferrer: true }))
  }

  handleRegister = (formData) => {
    const { requestRegister } = this.props.actions
    requestRegister(formData)
  }

  render () {
    //const { redirectToReferrer } = this.state
    const { isAuthenticated, token } = this.props
    if (isAuthenticated) {
      return (
        <Redirect to={'/chat'}/>
      )
    }
    return (
      <RegisterForm onSubmit={this.handleRegister} token={token}/>
    )
  }
}

export default connect(
  s => ({ isAuthenticated: s.isAuthenticated, token: s.authToken }),
  dispatch => ({ actions: bindActionCreators({ requestRegister }, dispatch) })
)(Register)
