import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class TodoListLink extends Component {
    loadList = () =>{
        this.props.todoList.max = this.props.todoList.items.length;
        this.props.loadList(this.props.todoList);
    }
    render() {        
        return (
            <p 
                className='home_list_link'
                onClick={this.loadList.bind(this)}
            >
                {this.props.todoList.name}<br />
            </p>
        )
    }
}

TodoListLink.propTypes = {
    loadList: PropTypes.func.isRequired,
    todoList: PropTypes.object.isRequired
}

export default TodoListLink
