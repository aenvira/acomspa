import React from 'react'

const Search = props => {
  const { onChange } = props

  return (
    <input
      type='search'
      className='ph2 pv2 bg-white f7 w-100 shadow-4 bn'
      placeholder='Search or start a new chat'
      onChange={onChange}
    />
  )
}
const SearchBar = props => {

  return (
    <div
      className='ph2 pv3 bg-moon-gray bb b--light-silver'
    >
      <Search onChange={() => {}}/>
    </div>
  )
}

export default SearchBar
