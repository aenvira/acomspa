import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { isAppOnline } from './StartPageActions'
import Home from './Home'
import Loading from '../components/Loading/Loading'

const InitialState = props => (
  <div>
    <h1>Welcome to ACOM!</h1>
    <h4>Professional chat sysem.</h4>
  </div>
)

const OfflineState = props => (
  <div>
    <h1>We could not connect to the server!</h1>
    <p>You're computer might be offline or there is a problem with your internet connection.</p>
  </div>
)

class StartPage extends React.Component {

  componentDidMount() {
    const { isAppOnline } = this.props.actions
    isAppOnline()
  }

  render() {
    const { isOnline } = this.props
    return (
      <div className='flex justify-center h-100 items-center'>
        {
          isOnline.cata({
            NotAsked: () => <InitialState/>,
            Loading: () => <Loading/>,
            Failed: err => <OfflineState/>,
            Succeded: val => <Home/>
          })
        }
      </div>
    )
  }
}

export default connect(
   s => ({ isOnline: s.isOnline }),
   dispatch => ({ actions: bindActionCreators({ isAppOnline }, dispatch) })
)(StartPage)
