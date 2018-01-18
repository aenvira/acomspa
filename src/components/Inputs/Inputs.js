import React from 'react'

const noop = () => {}

export const Input = props => {
  const {
    type,
    name,
    onChange,
    value,
    step,
    label = '',
    placeholder = '',
    error = '',
    groupClassNames,
    labelClassNames,
    inputClassNames,
    errorClassNames,
    onFocus = noop,
    onClick = noop
  } = props

  return (
    <div className={`${groupClassNames}`}>
      <label htmlFor={name} className={`${labelClassNames}`}>{label}</label>
      <input
        className={`${inputClassNames}`}
        value={value}
        onChange={onChange}
        onClick={onClick}
        onFocus={onFocus}
        type={type}
        name={name}
        placeholder={placeholder}
        step={step}/>
      <div className={`${errorClassNames}`}>{ error }</div>
    </div>
  )
}

export const AuthInput = props =>
  <Input
    groupClassNames='flex flex-column mb1'
    labelClassNames='pb1 bold'
    inputClassNames='px2 py1'
    errorClassNames='f6 pt1'
    {...props}
  />
