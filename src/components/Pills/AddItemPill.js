import React from 'react'

const AddItemPill = props => {
  const { label, handleRemove } = props

  return (
    <div className='f6 grow br-pill ph3 pv2 mb2 dib white bg-mid-gray ma1'>
      { label }
      <i className='fa fa-close mh1' onClick={handleRemove}></i>
    </div>
  )
}

export default AddItemPill
