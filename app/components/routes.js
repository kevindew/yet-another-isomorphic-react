import React from 'react';
import Router from 'react-router';
import App from '../components/App';
import About from '../components/About';
import Inbox from '../components/Inbox';
import Home from '../components/Home';

const Route = Router.Route;

export default (
  <Route handler={App}>
    <Route path="/about" handler={About}/>
    <Route path="/inbox" handler={Inbox}/>
    <Route path="/" handler={Home}/>
  </Route>
);
