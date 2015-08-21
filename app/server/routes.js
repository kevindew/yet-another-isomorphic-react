import React from 'react';
import App from '../components/app';
import About from '../components/about'

export default (app) => {

  // GET /
  // Default homepage route.
  //
  app.get('/', (req, res) => {
    res.render('home', { react: React.renderToString(<App><About/></App>) });
  });

};
