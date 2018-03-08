import React from 'react'
import { Field, reduxForm } from 'redux-form'
import whiteAvatar from '../images/white_avatar.png'
import orangeAvatar from '../images/orange_avatar.png'
import yellowAvatar from '../images/yellow_avatar.png'
import limeAvatar from '../images/lime_avatar.png'
import blueAvatar from '../images/blue_avatar.png'

const defaultAvatars = [
  whiteAvatar,
  orangeAvatar,
  yellowAvatar,
  limeAvatar,
  blueAvatar
]

const getRandomAvatar = (avatars) => {
  const rand = Math.floor(Math.random() * (avatars.length))

  return avatars[rand]
}

const ImageUpload = props => {
  const { user } = props

  return (
    <div className='image-upload w-100 flex justify-center pa2'>
      <label for='file-input'>
        <img
          src={ user.avatar ? `${user.avatar}` : `${getRandomAvatar(defaultAvatars)}` }
          className='pointer br-100 dim' style={{ width: '200px', height: '200px' }}
        />
        <div className='middle pa2 f6 flex flex-column light-gray pointer'>
          <i className='fa fa-camera fa-2x'></i>
          <div className=''>CHANGE PROFILE PHOTO</div>
        </div>

      </label>
      <input id='file-input' type='file' className='dn'/>
    </div>
  )
}

const EditProfilePicForm = props => {
  const { handleSubmit, user } = props

  return (
    <form onSubmit={handleSubmit}>
      <Field name='profilePic' component={props => <ImageUpload user={user} {...props}/>}/>
    </form>
  )
}

export default reduxForm({ form: 'editProfilePic' })(EditProfilePicForm)
