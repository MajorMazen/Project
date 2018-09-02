import React from 'react';
import { render } from 'react-dom';
import Root from './components/Root';
import store from './store'

render(
    //calling for the root component, which takes in a store input and outputs the possible routes and their respective components
    <Root store={store} />,
    document.getElementById('root')
)