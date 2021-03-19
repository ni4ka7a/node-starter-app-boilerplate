import logo from '../logo.svg';
import '../App.css';
import React, { Component, Fragment } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './layout/Header';

import Register from './accounts/Register';
import Login from './accounts/Login';

import { loadUser } from '../actions/auth';

import { Provider } from 'react-redux';
import store from '../store';

class App extends Component {
    componentDidMount() {
        store.dispatch(loadUser());
    }

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Fragment>
                        <Header />
                        <div className="container">
                            <Switch>
                                <Route
                                    exact
                                    path="/register"
                                    component={Register}
                                />
                                <Route
                                    exact
                                    path="/Login"
                                    component={Login}
                                />
                            </Switch>
                        </div>
                    </Fragment>
            </Router>
        </Provider>
        );
    }
}

export default App;
