import React from 'react'
import { RoundIconButton } from '../Buttons/Buttons'
import { Link } from 'react-router-dom'

const noop = () => {}

const MenuList = props => {
  const { items } = props

  const renderOption = option => {
    const { label, onClick = noop, to } = option
    const clickHandler = e => {
      //e.preventDefault()
      onClick(option)
    }
    return (
      <li key={label} className='bb b--light-gray pv2 ph1 hover-bg-light-gray pointer'>
        <Link to={to} className='link black w-100' onClick={clickHandler}>{ label }</Link>
      </li>
    )
  }

  return (
    <nav className='bg-white pa1 shadow-1'>
      <ul>{ items.map(renderOption) }</ul>
    </nav>
  )
}

class DropDownMenu extends React.Component {
  constructor(props) {
    super(props)

    this.state = { isOpen: false }
  }

  componentWillUnmount() {
    if(this.state.isOpen) {
      this.toggleMenu()
    }
  }

  handleOutsideClick = (e) => {
    if (this.node.contains(e.target)) {
      return
    }
    this.toggleMenu()
  }

  toggleMenu = () => {
    if(!this.state.isOpen) {
      document.addEventListener('click', this.handleOutsideClick, false);
    } else {
      document.removeEventListener('click', this.handleOutsideClick, false);
    }
    this.setState(prevstate => ({ isOpen: !prevstate.isOpen }))
  }

  render() {
    const { isOpen } = this.state
    const { menuItems } = this.props
    return (
      <div className='relative'>
        <RoundIconButton className='fr' icon='ellipsis-v' onClick={this.toggleMenu}/>
        { 
          isOpen
            ? <div
                ref={node => { this.node = node }}
                className='relative z-3' style={{ bottom: '-45px', right: '0px', width: '150px' }}>
                <MenuList items={menuItems} toggleMenu={this.toggleMenu}/>
              </div>
            : ''
        }
      </div>
    )
  }

}


export default DropDownMenu
