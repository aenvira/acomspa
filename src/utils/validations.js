export const isRequired = value => 
  value ? undefined : 'Required'

export const isMax = max => value => 
  value && value.length > max ? `Must be ${max} characters or less` : undefined

export const isMin = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined

export const isNumber = value =>
  value && isNaN(Number(value)) ? 'Must be a number' : undefined

export const isEmail = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined

export const isAlphaNumeric = value =>
    value && /[^a-zA-Z0-9 ]/i.test(value)
    ? 'Only alphanumeric characters'
    : undefined

export const isPhoneNumber = value =>
  value && !/^(0|[1-9][0-9]{9})$/i.test(value)
    ? 'Invalid phone number, must be 10 digits'
    : undefined

class Error {
  constructor(val, err = null) {
    this.value = val
    this.error = err
  }

  static of(val) {
    return new Error(val)
  }

  map(fn) {
    return new Error(this.value, fn(this.value))
  }

  composeMap(...fns) {
    const errors = fns.map(f => f(this.value)).filter(x => x !== undefined)
    return new Error(this.value, errors)
  }
    
  fold() {
    return this.error
  }
}

export const check = checks => data => {
  const keys = Object.keys(checks)
  if(data) {
    return keys.reduce((pre, key) => {
      const fieldError = Error.of(data[key])
        .composeMap(...checks[key])
        .fold()
      const errors = fieldError.length > 0 
        ? Object.assign({}, pre, { [key]: fieldError }) 
        : pre
      console.log('errors:', errors)
      return errors
    }, {})
  }
}

