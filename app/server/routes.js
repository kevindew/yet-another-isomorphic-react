import React from 'react';
import Home from '../components/home';

export default (app) => {

  // GET /
  // Default homepage route.
  //
  app.get('/', (req, res) => {
    res.render('home', { react: React.renderToString(<Home />) });
  });

};
