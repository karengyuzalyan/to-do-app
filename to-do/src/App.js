// @flow
import React, {Component} from 'react';

import _ from 'lodash';
import TextField from 'material-ui/TextField';

import DeleteDialog from './Dialog';
import './App.css';

type ITaskType = {
    text: string,
    completed: boolean,
};

type IToDoAppState = {
    newTask: string,
    sortAToZ: boolean,
    selectedIndex: number,
    tasks: Array<ITaskType>,
    isDeleteDialogOpen: boolean,
};

class ToDoApp extends Component {
    state: IToDoAppState  = {
        newTask: '',
        sortAToZ: true,
        selectedIndex: null,
        isDeleteDialogOpen: false,
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

    handleTaskTextChange = (e: SyntheticEvent, index: number): void => {
        const tasks: Array<ITaskType> = this.getTasksArrayDeepClone();

        tasks[index].text = e.target.value;

        this.setState({ tasks }, this.saveInLocalStorage);
    };

    markAsChecked = (index: number): void => {
        const tasks: Array<ITaskType> = this.getTasksArrayDeepClone();

        tasks[index].completed = !tasks[index].completed;

        this.setState({ tasks }, this.saveInLocalStorage);
    };

    openDeleteDialogOrNot = (index: number): void => {
        const tasks: Array<ITaskType> = this.getTasksArrayDeepClone();
        this.setState({ selectedIndex: index });

        if (tasks[index].completed === true) {
            this.setState({ isDeleteDialogOpen: true })
        } else {
            this.deleteTask(index);
        }
    };

    deleteTask = (): void => {
        const tasks: Array<ITaskType> = this.getTasksArrayDeepClone();

        tasks.splice(this.state.selectedIndex, 1);
        this.setState({ tasks }, this.saveInLocalStorage);
    };

    // Get deep clone of tasks from state to avoid of change reference
    getTasksArrayDeepClone = (): Array<ITaskType> => _.cloneDeep(this.state.tasks);

    closeDialogFromParent = (): void => this.setState({ isDeleteDialogOpen: false });

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
                                        onChange={(e) => this.handleTaskTextChange(e, index)}
                                    />
                                    <div
                                        onClick={() => this.openDeleteDialogOrNot(index)}
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
                {this.state.isDeleteDialogOpen &&
                    <DeleteDialog
                        deleteTask={this.deleteTask}
                        closeDialogFromParent={this.closeDialogFromParent}
                    />
                }
            </div>
        );
    }
}

export default ToDoApp;
