import React from 'react'

import {
  Link
} from 'react-router-dom'

const Home = () => (
  <div className='w5'>
      <Link to={'/login'} className='link dim dark-gray ph1 pv2 ba b--light-gray w-100 db'>
        <i  className='fa fa-key ph1'></i>
        Login
      </Link>
    <p className='pa2 tc'> or </p>
       <Link to={'/register'} className='link dim dark-gray ph1 pv2 ba b--light-gray w-100 db'>
        <i className='fa fa-user-plus ph1'></i>
        Register
      </Link>
  </div>
)

export default Home
