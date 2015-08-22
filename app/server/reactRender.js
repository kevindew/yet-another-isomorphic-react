import React from 'react';
import Router from 'react-router';
import routes from '../components/routes';
import htmlentities from 'htmlentities';

export default function(route, props = {}, id = 'react-root') {
  let result;
  Router.run(routes, route, (Handler) =>  {
    result = React.renderToString(<Handler {...props} />);
  });

  const propsEncoded = htmlentities.encode(JSON.stringify(props));

  return `<div id="${id}" data-react-props="${propsEncoded}">${result}</div>`;
}
