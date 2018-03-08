import React from 'react'
import {
  Route
} from 'react-router-dom'
import { connect } from 'react-redux'
import AccountSettings from './AccountSettings'
import EditProfile from '../Profile/EditProfile'

class Account extends React.Component {

  render() {
    const { currentUser } = this.props

    return (
      <div>
        <Route exact path='/chat/account' render={props => <AccountSettings user={currentUser}/>}/>
        <Route exact path='/chat/account/profile' component={EditProfile}/>
      </div>
    )
  }
}

export default connect(
  s => ({
    currentUser: s.currentUser
  })
)(Account)
