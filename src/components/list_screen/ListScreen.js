import React, { Component } from 'react'
import ListHeading from './ListHeading'
import ListItemsTable from './ListItemsTable'
import ListTrash from './ListTrash'
import Modal from '../../modal';

export class ListScreen extends Component {
    getListName() {
        if (this.props.todoList) {
            return this.props.todoList.name;
        }
        else
            return "";
    }

    setListName(event) {
        this.props.todoList.name = event.target.value;
        this.setState(this.props.todoList);
    }

    setListOwner(event) {
        this.props.todoList.owner = event.target.value;
        this.setState(this.props.todoList);
    }

    getListOwner() {
        if (this.props.todoList) {
            return this.props.todoList.owner;
        }
    }
    render() {
        return (
            <div id="todo_list">
                <ListHeading goHome={this.props.goHome} />
                <ListTrash />
                <div id="list_details_container">
                    <div id="list_details_name_container" className="text_toolbar">
                        <span id="list_name_prompt">Name:</span>
                        <input 
                            value={this.getListName()} 
                            type="text" 
                            id="list_name_textfield" 
                            onChange={this.setListName.bind(this)}/>
                    </div>
                    <div id="list_details_owner_container" className="text_toolbar">
                        <span id="list_owner_prompt">Owner:</span>
                        <input 
                            value={this.getListOwner()}
                            type="text" 
                            id="list_owner_textfield" 
                            onChange={this.setListOwner.bind(this)}/>
                    </div>
                </div>
                <ListItemsTable 
                editItem={this.props.editItem.bind(this)}
                todoList={this.props.todoList} />
                <Modal 
                goHome={this.props.goHome.bind(this)}
                todoList={this.props.currentList} 
                todoLists={this.props.todoLists}/>
            </div>
        )
    }
}

export default ListScreen
