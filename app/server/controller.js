import React from 'react';

export default (app) => {

  // GET /
  // Default homepage route.
  //
  app.get('/', (req, res) => {
    res.render('home', { reactRoute: '/' });
  });

};
