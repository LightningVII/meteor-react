import React, { Component } from 'react';

// Task component - represents a single todo item
export default class Task extends Component {
    toggleChecked = () => {
        // Set the checked property to the opposite of its current value
        const {_id, checked} = this.props.task
        this.props.handleToggle(_id, !checked);
    }

    deleteThisTask = () => {
        this.props.handleDelete(this.props.task._id);
    };

    render() {
        // Give tasks a different className when they are checked off,
        // so that we can style them nicely in CSS
        const taskClassName = this.props.task.checked ? 'checked' : '';

        return (
            <li className={taskClassName}>
                <button className="delete" onClick={this.deleteThisTask}>
                    &times;
                </button>

                <input
                    type="checkbox"
                    readOnly
                    checked={!!this.props.task.checked}
                    onClick={this.toggleChecked}
                />

                <span className="text">{this.props.task.text}</span>
            </li>
        );
    }
}
