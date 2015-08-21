import React from 'react';
import Router from 'react-router';
import App from '../components/app';
import About from '../components/about';
import Inbox from '../components/inbox';

const Route = Router.Route;

export default (
  <Route handler={App}>
    <Route path="about" handler={About}/>
    <Route path="inbox" handler={Inbox}/>
    <Route path="" handler={Inbox}/>
  </Route>
);
