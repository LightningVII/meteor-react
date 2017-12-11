import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import AccountsUIWrapper from './AccountsUIWrapper.js';
import Task from './Task.js';

import { Tasks } from '../api/tasks.js';

// App component - represents the whole app
class App extends Component {
    state = {
        hideCompleted: false
    };

    handleSubmit(event) {
        event.preventDefault();

        // Find the text field via the React ref
        const text = this.textInput.value.trim();

        Tasks.insert({
            text,
            createdAt: new Date(), // current time
            owner: Meteor.userId(), // _id of logged in user
            username: Meteor.user().username // username of logged in user
        });

        // Clear form
        this.textInput.value = '';
    }

    toggleHideCompleted = () => {
        this.setState({
            hideCompleted: !this.state.hideCompleted
        });
    };

    toggleChecked = (id, checked) => {
        // Set the checked property to the opposite of its current value
        Tasks.update(id, {
            $set: { checked: checked }
        });
    };

    deleteThisTask = id => {
        Tasks.remove(id);
    };

    renderTasks = () => {
        let filteredTasks = this.props.tasks;
        if (this.state.hideCompleted) {
            filteredTasks = filteredTasks.filter(task => !task.checked);
        }
        return filteredTasks.map(task => (
            <Task
                key={task._id}
                task={task}
                handleDelete={this.deleteThisTask}
                handleToggle={this.toggleChecked}
            />
        ));
    };

    render() {
        return (
            <div className="container">
                <header>
                    <h1>Todo List ({this.props.incompleteCount})</h1>

                    <label className="hide-completed">
                        <input
                            type="checkbox"
                            readOnly
                            checked={this.state.hideCompleted}
                            onClick={this.toggleHideCompleted.bind(this)}
                        />
                        Hide Completed Tasks
                    </label>

                    <AccountsUIWrapper />

                    {this.props.currentUser ? (
                        <form
                            className="new-task"
                            onSubmit={this.handleSubmit.bind(this)}
                        >
                            <input
                                type="text"
                                ref={input => {
                                    this.textInput = input;
                                }}
                                placeholder="Type to add new tasks"
                            />
                        </form>
                    ) : (
                        ''
                    )}
                </header>

                <ul>{this.renderTasks()}</ul>
            </div>
        );
    }
}

export default withTracker(() => {
    return {
        tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
        incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
        currentUser: Meteor.user()
    };
})(App);
