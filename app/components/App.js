import React from 'react';
import Router from 'react-router';
import About from './about';

const RouteHandler = Router.RouteHandler;

export default class App extends React.Component {
  render() {
    const handler = this.props.children || <RouteHandler />;
    return handler;
  }
};
