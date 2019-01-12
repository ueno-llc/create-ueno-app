import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Helmet from 'react-helmet';

import AppLayout from './components/app-layout/AppLayout';
import Home from './pages/index';
import About from './pages/about';
import NotFound from './pages/404';
import * as serviceWorker from './serviceWorker';

const App = () => (
  <Router>
    <Route
      render={() => (
        <AppLayout>
          <Helmet>
            <html lang="en" />
            <title>Hello</title>
          </Helmet>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route component={NotFound} />
          </Switch>
        </AppLayout>
      )}
    />
  </Router>
)

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
