import React from 'react';
import Login from './components/Login';
import Header from './components/Header';
import CreatePin from './components/AddPinComponent';
import Main from './components/Main';
import {Switch, BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import ProfileComponent from './components/ProfileComponent';
import PinScreen from './screens/PinScreen';
import UserScreen from './screens/UserScreen';
function App() {
  return (
      <Router>
        <Header/> 
        <Switch>
          <Route exact path="/">
            <Main/>
          </Route>
          <Route path="/profile" component={ProfileComponent} exact/>
          <Route path="/create-pin" component={CreatePin} exact/>
          <Route path="/pin/:id?" component={PinScreen} />
          <Route path="/user/:uname" component={UserScreen}/>
          <Route path="/login" component={Login}/>
          <Redirect to="/" />
        </Switch>
      </Router>
  )
}

export default App;
