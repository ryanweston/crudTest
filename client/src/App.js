import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HttpsRedirect from 'react-https-redirect';
import Nav from './components/layout/Nav';
import Landpage from './components/layout/Landpage';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/layout/dashboard/Dashboard';
import Alert from './components/general/Alert';
import SubmitReview from './components/layout/dashboard/SubmitReview';
import EditReview from './components/layout/dashboard/EditReview';
//Redux imports
import { Provider } from 'react-redux';
import store from './store';
import { fetchUni } from './actions/university';
import { setHeader, getUser } from './actions/login';
import './styles/App.css';

const App = () => {
  //Runs university fetch on app initialisation
  //Prevents the request being made repeatedly due to other state changes within Landpage
  useEffect(() => {
    store.dispatch(fetchUni());
    console.log('App component rendered.');
    //Sets headers for request, enables ability to fetch user
    setHeader(localStorage.getItem('token'));
    store.dispatch(getUser())
  }, []);


  //HttpsRedirect forces redirect to SSL domain
  return (<HttpsRedirect>
    <Provider store={store}>
      <Router>
        <Fragment>
          <section className="container">
            <Nav />
            <Alert />

            <Switch>
              <Route exact path="/" component={Landpage} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/submit" component={SubmitReview} />
              <Route exact path="/edit" component={EditReview} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  </HttpsRedirect>);
};


export default App;
