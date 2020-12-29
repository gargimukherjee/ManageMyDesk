import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/app';
import Registration from './components/registration/registration';
import Login from './components/login/login';
import Home from './components/home/home';
import UploadDocument from './components/upload/upload';
import Search from './components/search/search';

function requireAuth(next,replace){
  let userDetails = sessionStorage.userDetails;
  if(userDetails === undefined){
    replace('/login');
  }
}

function checkLoggedInUser(next,replace){
  let userDetails = sessionStorage.userDetails;
  if(userDetails !== undefined){
    replace('/home');
  }
}

export default (
    <Route path="/" component = {App}>
    <IndexRoute component= {Login} onEnter={checkLoggedInUser}  />
    <Route path="register" component={Registration} onEnter={checkLoggedInUser} />
    <Route path="login" component={Login} onEnter={checkLoggedInUser}/>
    <Route path="home" component={Home} redirectTo="/login" onEnter={requireAuth}/>
    <Route path="document" component={UploadDocument} onEnter={requireAuth}/>
    <Route path="search" component={Search} onEnter={requireAuth}/>
    </Route>
);
