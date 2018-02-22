// @flow
import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

type IDeleteDialogState = {
    open: boolean,
};

type IDeleteDialogProps = {
    deleteTask: () => void,
    closeDialogFromParent: () => void,
};

export default class DeleteDialog extends Component {
    state: IDeleteDialogState = {
        open: false,
    };

    componentWillMount() {
        this.setState({open: true});
    }

    handleClose = (): void => {
        this.props.closeDialogFromParent();

        this.setState({
            open: false
        });
    };

    deleteTask = (): void => {
        this.props.deleteTask();
        this.handleClose()
    };

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onClick={this.deleteTask}
            />,
        ];

        return (
            <div>
                <Dialog
                    modal={false}
                    actions={actions}
                    open={this.state.open}
                    title="Delete the completed task"
                    onRequestClose={this.handleClose}
                >
                    Are you sure you want to permanently delete this completed item?
                </Dialog>
            </div>
        );
    }
}