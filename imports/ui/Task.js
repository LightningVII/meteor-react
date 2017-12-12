import React, { Component } from 'react';
import classnames from 'classnames';

// Task component - represents a single todo item
export default class Task extends Component {
    toggleChecked = () => {
        // Set the checked property to the opposite of its current value
        const { handleToggle, task: { _id, checked } } = this.props;
        handleToggle(_id, !checked);
    };

    deleteThisTask = () => {
        const { handleDelete, task: { _id } } = this.props;
        handleDelete(_id);
    };

    togglePrivate = () => {
        const { handlePrivate, task: { _id, authority } } = this.props;
        handlePrivate(_id, !authority);
    };

    render() {
        // Give tasks a different className when they are checked off,
        // so that we can style them nicely in CSS
        const {
            showPrivateButton,
            task: { checked, authority, username, text }
        } = this.props;
        const taskClassName = classnames({
            checked: checked,
            private: authority
        });

        return (
            <li className={taskClassName}>
                <button className="delete" onClick={this.deleteThisTask}>
                    &times;
                </button>

                <input
                    type="checkbox"
                    readOnly
                    checked={!!checked}
                    onClick={this.toggleChecked}
                />

                {showPrivateButton ? (
                    <button
                        className="toggle-private"
                        onClick={this.togglePrivate}
                    >
                        {authority ? 'Private' : 'Public'}
                    </button>
                ) : (
                    ''
                )}

                <span className="text">
                    <strong>{username}</strong>: {text}
                </span>
            </li>
        );
    }
}
