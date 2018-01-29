import React from 'react'
import { IconOnlyButton } from '../components/Buttons/Buttons'
import EmojiPicker from 'emoji-picker-react'
import {emojify} from 'react-emojione'
class MessageInput extends React.Component {
  constructor(props) {
    super(props)
    this.state ={ 
      message: '',
      open: false
    }
  }

  handleOpenClose = () => 
    this.setState(prev => ({ open: !prev.open }))


  handleEmojiClick = (emoji, data, event) => {
    this.setState(prev => ({ message: prev.message + `:${data.name}:` }))
  }

  handleChange = ev => {
    this.setState({ message: ev.target.value })
  }
  
  onSubmit = event => {
    event.preventDefault()
    this.props.onSubmit({ message: this.state.message })
  }

  render() {
    const { message } = this.state
    const output = emojify(message, {output: 'unicode'})
    return (
      <form onSubmit={this.onSubmit} className='flex w-100 bg-silver-gray pa1'>
        <div className='relative pa2'>
          <IconOnlyButton type='button' onClick={this.handleOpenClose} icon='smile-o'/>

          {
            this.state.open
            ? <div className='z-3 absolute' style={{ bottom: '50px' }}>
                <EmojiPicker onEmojiClick={this.handleEmojiClick} />
              </div>
            : ''
          }
        </div>
        <div className='flex-auto pr1'>
          <input className='w-100 pa2' type='text' value={output} onChange={this.handleChange}/>
        </div>
        <IconOnlyButton type='submit' icon='send'/>
      </form>
    )
  }
}

export default MessageInput
