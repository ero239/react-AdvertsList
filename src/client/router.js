import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import AppLayout from './containers/AppLayout/AppLayout';
import ProductLayout from './containers/ProductLayout/ProductLayout';

export default function() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={AppLayout} />
        <Route path="/product/:id" component={ProductLayout} />
      </Switch>
    </BrowserRouter>
  );
}
