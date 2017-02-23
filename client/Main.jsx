import React from 'react';
import {Meteor} from 'meteor/meteor';
import {render} from 'react-dom';
import App from './App/App.jsx';

Meteor.startup(()=> {
    render(<App></App>, document.getElementById('render-target'));
});