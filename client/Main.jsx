import React from 'react';
import {Meteor} from 'meteor/meteor';
import {render} from 'react-dom';
import App from './App/App.jsx';
import Landing from './App/Landing.jsx';
import {Router, Switch, Route, IndexRoute} from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory();

Meteor.startup(()=> {

    render(<Router history={history}>
        <Switch>
            <Route exact path="/" component={Landing}/>
            <Route path="/tnote" component={App}/>
        </Switch>
    </Router>, document.getElementById('render-target'));
});