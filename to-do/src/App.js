// @flow
import React, {Component} from 'react';

import _ from 'lodash';
import TextField from 'material-ui/TextField';

import './App.css';

type ITaskType = {
    text: string,
    completed: boolean,
};

type IToDoAppState = {
    newTask: string,
    sortAToZ: boolean,
    tasks: Array<ITaskType>
};

class ToDoApp extends Component {
    state: IToDoAppState  = {
        newTask: '',
        sortAToZ: true,
        tasks: JSON.parse(localStorage.getItem("tasksInStorage")) || [],
    };

    addNewTask = (): void => {
        const tasks: Array<ITaskType> = this.getTasksArrayDeepClone();
        const { newTask } = this.state;

        if (newTask) {
            tasks.push({
                text: newTask,
                completed: false,
            });
        }

        this.setState({
            newTask: '',
            tasks
        }, this.saveInLocalStorage);

    };

    setNewTask = (e: SyntheticEvent): void => {
        this.setState({
            newTask: e.target.value
        });
    };

    markAsChecked = (index: number): void => {
        const tasks: Array<ITaskType> = this.getTasksArrayDeepClone();

        tasks[index].completed = !tasks[index].completed;

        this.setState({ tasks }, this.saveInLocalStorage);
    };

    deleteTask = (index: number): void => {
        const tasks: Array<ITaskType> = this.getTasksArrayDeepClone();

        tasks.splice(index, 1);

        this.setState({ tasks }, this.saveInLocalStorage);
    };

    // Get deep clone of tasks from state to avoid of change reference
    getTasksArrayDeepClone = (): Array<ITaskType> => _.cloneDeep(this.state.tasks);

    saveInLocalStorage = (): void => {
        localStorage.setItem('tasksInStorage', JSON.stringify(this.getTasksArrayDeepClone()));
    };

    render() {
        const {
            tasks,
        } = this.state;

        return (
            <div>
                <div className="app-wrapper">
                    <div className="tasks-wrapper">
                        <div className="app-header">
                            <h1 className="app-title">To Do App</h1>
                            <div className="new-task display-flex">
                                <TextField
                                    hintText="New Task"
                                    onChange={this.setNewTask}
                                    value={this.state.newTask}
                                />
                                <div onClick={this.addNewTask}>
                                    <i
                                        className="fas fa-plus plus-icon"
                                        style={{
                                            color: 'rgb(25, 146, 177',
                                        }}
                                    />
                                </div>
                            </div>
                            {tasks.map((task, index) => (
                                <div
                                    key={index}
                                    className="task-field display-flex"
                                >
                                    <div
                                        key={task.completed}
                                        onClick={() => this.markAsChecked(index)}
                                    >
                                        <i
                                            className={`far fa-${task.completed ? 'check-square' : 'square'} completed-icon`}
                                            style={{
                                                color: task.completed ? 'green' : 'rgb(162, 165, 166)',
                                            }}
                                        />
                                    </div>
                                    <TextField
                                        value={task.text}
                                    />
                                    <div
                                        onClick={() => this.deleteTask(index)}
                                    >
                                        <i
                                            className="fa fa-trash garbage-icon"
                                            style={{
                                                color: '#2a7d92',
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ToDoApp;
