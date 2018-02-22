// @flow
import React, {Component} from 'react';

import _ from 'lodash';
import TextField from 'material-ui/TextField';

import './App.css';

class App extends Component {
    render() {
        return (
            <div>
                <div className="app-wrapper">
                    <div className="tasks-wrapper">
                        <div className="app-header">
                            <h1 className="app-title">To Do App</h1>
                            <div className="new-task display-flex">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
