import React from 'react'
import { connect } from 'react-redux'
import EditProfilePicForm from './EditProfilePicForm'

const EditProfile = props => {
  const { currentUser } = props
  const handleProfilePicEdit = data => {
    console.log(data)
  }

  return (
    <div>
      <EditProfilePicForm onSubmit={handleProfilePicEdit} user={currentUser}/>
    </div>
  )
}

export default connect(
  s => ({ currentUser: s.currentUser })
)(EditProfile)
