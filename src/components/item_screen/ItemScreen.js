import React, { Component } from 'react'
import ChangeList from '../../lib/ChangeList'
export class ItemScreen extends Component {

    state={
        description : this.props.todoItem? this.props.todoItem.description: "",
        assigned_to : this.props.todoItem? this.props.todoItem.assigned_to: "",
        due_date : this.props.todoItem? this.props.todoItem.due_date: "",
        completed : this.props.todoItem? this.props.todoItem.completed: false
    }

    cancelItemChange(){
        this.props.loadList(this.props.todoList);
    }
    submitItemChange(){

        let item = {
            key: this.props.todoItem?this.props.todoItem.key:this.props.todoList.items.length,
            description: this.state.description,
            assigned_to: this.state.assigned_to,
            due_date: this.state.due_date,
            completed: this.state.completed
        }
        
        let index = -1;
        if(this.props.todoItem==null){

            index = item.key;
            
        }else{
            index = this.props.todoList.items.indexOf(this.props.todoItem);
        }

        let new_transaction = new ChangeList(item, index, this, "edit_item", ()=>{
            this.props.loadList(this.props.todoList)
        });
        window.tps.addTransaction(new_transaction);
    }


    getDescription(){
        return this.state.description;
    }
    setDescription(event){
        this.setState({description : event.target.value});
    }
    getAssignedTo(){
        return this.state.assigned_to;
    }
    setAssignedTo(event){
        this.setState({assigned_to : event.target.value});
    }
    getDueDate(){
        return this.state.due_date;
    }
    setDueDate(event){
        this.setState({due_date : event.target.value});
    }
    getStatus(){
        return this.state.completed;
    }
    setStatus(event){
        this.setState({completed : event.target.checked});
    }

    render() {
        return (
            <div id="todo_item" >
                <h3 id="item_heading">Item</h3>
                <div id="item_form_container">
                    <div id="item_description_prompt" className="item_prompt">Description:</div>
                    <input id="item_description_textfield" className="item_input" type="input" 
                    value={this.getDescription()}
                    onChange={this.setDescription.bind(this)}/>
                    <div id="item_assigned_to_prompt" className="item_prompt">Assigned To:</div>
                    <input id="item_assigned_to_textfield" className="item_input" type="input" 
                    value={this.getAssignedTo()}
                    onChange={this.setAssignedTo.bind(this)}/>
                    <div id="item_due_date_prompt" className="item_prompt">Due Date:</div>
                    <input id="item_due_date_picker" className="item_input" type="date" 
                    value={this.getDueDate()}
                    onChange={this.setDueDate.bind(this)}/>
                    <div id="item_completed_prompt" className="item_prompt">Completed:</div>
                    <input id="item_completed_checkbox" className="item_input" type="checkbox" 
                    value={this.getStatus()}
                    onChange={this.setStatus.bind(this)}/>
                </div>
                <button id="item_form_submit_button" className="item_button"
                onClick={this.submitItemChange.bind(this)}>Submit</button>
                <button id="item_form_cancel_button" className="item_button"
                onClick={this.cancelItemChange.bind(this)}>Cancel</button>
            </div>
        )
    }
}

// ItemScreen.propTypes = {
//     currentScreen: PropTypes.string.isRequired,
//     todoItem: PropTypes.object.isRequired
// }

export default ItemScreen
