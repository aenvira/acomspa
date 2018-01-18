import React from 'react'
const noop = () => {}

const defaultStyles =   {
  border: 'none',
  outline: 0,
  boxShadow: 'none'
}

export const Button = ({
  onClick = noop,
  children,
  className,
  style,
  type,
  badge
}) => {
  return (
    <button
      {...(badge && { 'data-notifications': badge })}
      onClick={onClick}
      type={type}
      className={`pointer ${className}`}
      style={{...defaultStyles, ...style}}
    >
      { children }
    </button>
  )
}

export const FormPrimaryButton = props =>
  <Button
    {...props}
    className={`bg-blue px2 py1 border ${props.className}`}
    type='submit'
  >
    { props.children }
  </Button>

export const IconOnlyButton = props =>
  <Button
    {...props}
    className={`bg-transparent ph2 pv1 dim ${props.className}`}>
    <i className={`fa fa-${props.icon} fa-fw ${props.iconClassName}`}></i>
  </Button>

export const RoundIconButton = props =>
  <Button
    {...props}
    className={`bg-moon-gray dim ${props.className}`}
    style={{
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      textAlign: 'center'
    }}
  >
    <i className={`fa fa-${props.icon} fa-fw ${props.iconClassName}`}></i>
  </Button>

export const TextButton = props =>
  <Button { ...props }
    className='bg-transparent ph2 pv1 flex justify-start underline-hover'>
    { props.children }
  </Button>

export const IconButton = props => 
  <Button {...props}
    className={`bg-moon-gray dim ${props.className}`}
  >
    <i className={`fa fa-${props.icon} fa-fw ${props.iconClassName}`}></i>
    { props.children }
  </Button>
