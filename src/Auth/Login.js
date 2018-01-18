import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { requestLogin } from './AuthActions'
import { Redirect } from 'react-router-dom'
import LoginForm from './LoginForm'

class Login extends React.Component {
  state = {
    redirectToReferrer: false
  }

  onAuthSuccess = () => {
    this.setState(_ => ({ redirectToReferrer: true }))
  }

  handleLogin = (formData) => {
    const { requestLogin } = this.props.actions
    requestLogin(formData)
  }

  render () {
    //const { redirectToReferrer } = this.state
    const { isAuthenticated, token } = this.props
    console.log('token is: ', token)
    if (isAuthenticated) {
      return (
        <Redirect to={'/chat'}/>
      )
    }
    return (
      <LoginForm onSubmit={this.handleLogin} token={token}/>
    )
  }
}

export default connect(
  s => ({ isAuthenticated: s.isAuthenticated, token: s.authToken }),
  dispatch => ({ actions: bindActionCreators({ requestLogin }, dispatch) })
)(Login)
