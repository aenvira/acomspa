import React from 'react';

import Main from './Main/Main'
import StartPage from './StartPage/StartPage'
import PageNotFound from './PageNotFound'
import Login from './Auth/Login'
import Register from './Auth/Register'
import ForgotPassword from './Auth/ForgotPassword'
import ResetPassword from './Auth/ResetPassword'

import {
  Route,
  Switch,
  Link
} from 'react-router-dom';

//import logo from './logo.svg';

const TestRouterPage = ({ match }) => (
  <div className="h-100">
    <p>
      Test page {match.params.id}
    </p>
    <p>
    <Link to={`/`}>
      Home
    </Link>
    </p>
    <p>
      <Link to={`/aljlskaklksdkfaj falsflasd`}>
        Go to non-existent page
      </Link>
    </p>
  </div>
)

class App extends React.Component {

  render() {
    return (
      <div className="App h-100">
        <Route path="/" component={ ({ match }) => (
          <div className='h-100'>
            <Switch>
              <Route exact path="/" component={StartPage}/>
              <Route exact path="/login" component={Login}/>
              <Route exact path="/register" component={Register}/>
              <Route exact path="/forgotPassword" component={ForgotPassword}/>
              <Route path="/resetPassword/:token" component={ResetPassword}/>
              <Route path="/chat" component={Main}/>
              <Route exact path="/test/:id" component={TestRouterPage}/>
              <Route component={PageNotFound}/>
            </Switch>
          </div>
        )}/>
      </div>
    )
  }
}

export default App
