import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { logout } from '../Auth/AuthActions'
import DropDownMenu from '../components/Menus/DropDown'

class ProfileMenu extends React.Component {
  
  handleLogout = () => {
    console.log('logout')
    const { logout } = this.props.actions
    logout()
  }

  render() {

    const menuItems =  [
      { label: 'New contact', to: '/chat/contacts/add' },
      { label: 'New channel', to: '/chat/channels/add' },
      { label: 'My Addess book', to: '/chat/contacts' },
      { label: 'My Account', to: '/chat/account' },
      { label: 'Log out', onClick: this.handleLogout, to: '/login' }
    ]

    return (
      <DropDownMenu menuItems={menuItems}/>
    )
  }
}

export default connect(
  s => ({ isAuthenticated: s.isAuthenticated }),
  dispatch => ({ actions: bindActionCreators({ logout }, dispatch) })
)(ProfileMenu)
