import React from 'react';
import Router from 'react-router';
import routes from '../components/routes';

const reactRoot = document.getElementById('react-root');
const propsJson = reactRoot.getAttribute('data-react-props');
let props;
try {
  props = JSON.parse(propsJson);
} catch (e) {
  props = {};
}

Router.run(routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler {...props} />, reactRoot);
});
