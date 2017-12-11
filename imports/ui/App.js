import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks.js';

import Task from './Task.js';

// App component - represents the whole app
class App extends Component {
    handleSubmit(event) {
        event.preventDefault();

        // Find the text field via the React ref
        const text = this.textInput.value.trim();

        Tasks.insert({
            text,
            createdAt: new Date() // current time
        });

        // Clear form
        this.textInput.value = '';
    }

    toggleChecked(id, checked) {
        // Set the checked property to the opposite of its current value
        Tasks.update(id, {
            $set: { checked: checked }
        });
    }

    deleteThisTask = id => {
        Tasks.remove(id);
    };

    renderTasks = () => {
        return this.props.tasks.map(task => (
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
                    <h1>Todo List</h1>

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
                </header>

                <ul>{this.renderTasks()}</ul>
            </div>
        );
    }
}

export default withTracker(() => {
    return {
        tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch()
    };
})(App);
