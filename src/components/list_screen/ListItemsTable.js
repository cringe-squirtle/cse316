import React, { Component } from 'react'
import ListItemCard from './ListItemCard'
import ChangeList from '../../lib/ChangeList'
export class ListItemsTable extends Component {


    sort_criteria={
        task_increasing: 0,
        task_decreasing: 1,
        due_date_increasing: 2,
        due_date_decreasing: 3,
        status_increasing: 4,
        status_decreasing: 5
    }
    current_sort_criteria=-1;

    resetCardKey(){
        let items = this.props.todoList.items;
        for(let i=0;i<items.length;i++){
            items[i].key=i;
        }
    }

    moveCardUp(index) {

        if(index<=0)
            return

        let old_order = [];
        let items = this.props.todoList.items;
        for(let i = 0; i<items.length;i++){
            old_order.push(items[i].key);
        }

        let temp = this.props.todoList.items[index];
        this.props.todoList.items[index]=this.props.todoList.items[index-1];
        this.props.todoList.items[index-1]=temp;
        
        let new_order = [];
        for(let i = 0; i<items.length;i++){
            new_order.push(items[i].key);
        }

        let callback = () =>{
            this.props.loadList(this.props.todoList);
        }

        let new_transaction = new ChangeList(old_order, new_order, this, "move", callback);
        window.tps.addTransaction(new_transaction);
        

    }

    moveCardDown(index) {

        

        let num = this.props.todoList.items.length;
        if(index>=num-1)
            return

        let old_order = [];
        let items = this.props.todoList.items;
        for(let i = 0; i<items.length;i++){
            old_order.push(items[i].key);
        }

        let temp = this.props.todoList.items[index];
        this.props.todoList.items[index]=this.props.todoList.items[index+1];
        this.props.todoList.items[index+1]=temp;

        

        let new_order = [];
        for(let i = 0; i<items.length;i++){
            new_order.push(items[i].key);
        }

        console.log(old_order, new_order);

        let callback = () =>{
            this.props.loadList(this.props.todoList);
        }

        let new_transaction = new ChangeList(old_order, new_order, this, "move", callback);
        window.tps.addTransaction(new_transaction);
        
    }

    deleteCard(index) {
        let to_be_removed = this.props.todoList.items[index];

        let callback = () =>{
            this.setState(this.props.todoList, this.foolProof)
        }

        let new_transaction = new ChangeList(to_be_removed, index, this, "delete", callback);
        window.tps.addTransaction(new_transaction);
    }


    sortByTask(){
        if(this.current_sort_criteria===this.sort_criteria.task_increasing){
            this.current_sort_criteria=this.sort_criteria.task_decreasing;
        }else
            this.current_sort_criteria=this.sort_criteria.task_increasing;

        let old_order = [];
        let items = this.props.todoList.items;
        for(let i = 0; i<items.length;i++){
            old_order.push(items[i].key);
        }
        items.sort(this.compare.bind(this));

        let new_order = [];
        for(let i = 0; i<items.length;i++){
            new_order.push(items[i].key);
        }

        let callback = () =>{
            this.props.loadList(this.props.todoList);
        }

        let new_transaction = new ChangeList(old_order, new_order, this, "move", callback);
        window.tps.addTransaction(new_transaction);
    }

    sortByDueDate(){
        if(this.current_sort_criteria===this.sort_criteria.due_date_increasing){
            this.current_sort_criteria=this.sort_criteria.due_date_decreasing;
        }else
            this.current_sort_criteria=this.sort_criteria.due_date_increasing;
        let old_order = [];
        let items = this.props.todoList.items;
        for(let i = 0; i<items.length;i++){
            old_order.push(items[i].key);
        }
        items.sort(this.compare.bind(this));

        let new_order = [];
        for(let i = 0; i<items.length;i++){
            new_order.push(items[i].key);
        }

        let callback = () =>{
            this.props.loadList(this.props.todoList);
        }

        let new_transaction = new ChangeList(old_order, new_order, this, "move", callback);
        window.tps.addTransaction(new_transaction);
    }

    sortByStatus(){
        if(this.current_sort_criteria===this.sort_criteria.status_increasing){
            this.current_sort_criteria=this.sort_criteria.status_decreasing;
        }else
            this.current_sort_criteria=this.sort_criteria.status_increasing;

        let old_order = [];
        let items = this.props.todoList.items;
        for(let i = 0; i<items.length;i++){
            old_order.push(items[i].key);
        }
        items.sort(this.compare.bind(this));

        let new_order = [];
        for(let i = 0; i<items.length;i++){
            new_order.push(items[i].key);
        }

        let callback = () =>{
            this.props.loadList(this.props.todoList);
        }

        let new_transaction = new ChangeList(old_order, new_order, this, "move", callback);
        window.tps.addTransaction(new_transaction);
    }

    compare(item1, item2){
        if(this.current_sort_criteria===this.sort_criteria.task_decreasing ||
            this.current_sort_criteria===this.sort_criteria.due_date_decreasing ||
            this.current_sort_criteria===this.sort_criteria.status_decreasing){
            let temp=item1;
            item1=item2;
            item2=temp
        }
        if(this.current_sort_criteria===this.sort_criteria.task_increasing ||
            this.current_sort_criteria===this.sort_criteria.task_decreasing){
                if(item1.description<item2.description)
                    return -1;
                if(item1.description>item2.description)
                    return 1;
                else
                    return 0;
            }
        if(this.current_sort_criteria===this.sort_criteria.due_date_increasing ||
            this.current_sort_criteria===this.sort_criteria.due_date_decreasing){
                let date1 = new Date(item1.due_date);
                let date2 = new Date(item2.due_date);
                if(date1<date2)
                    return -1;
                if(date1>date2)
                    return 1;
                else
                    return 0;
            }
        if(this.current_sort_criteria===this.sort_criteria.status_increasing ||
            this.current_sort_criteria===this.sort_criteria.status_decreasing){
                if(item1.completed<item2.completed)
                    return -1;
                if(item1.completed>item2.completed)
                    return 1;
                else
                    return 0;
            }
    }

    render() {
        return (
            <div id="list_items_container" >
                <div className='list_item_header_card'>
                    <div className="list_item_task_header" onClick={this.sortByTask.bind(this)}>Task</div>
                    <div className="list_item_due_date_header" onClick={this.sortByDueDate.bind(this)}>Due Date</div>
                    <div className="list_item_status_header" onClick={this.sortByStatus.bind(this)}>Status</div>
                </div>
                
                {
                    this.props.todoList.items.map((todoItem, index)=>(
                        <ListItemCard 
                            editItem={this.props.editItem.bind(this)}
                            index={index}
                            key={todoItem.key}
                            listItem={todoItem}
                            moveCardUp={this.moveCardUp.bind(this)}
                            moveCardDown={this.moveCardDown.bind(this)}
                            deleteCard={this.deleteCard.bind(this)}/>
                    ))

                }
                <div className='list_item_add_card' 
                onClick={this.props.editItem.bind(this, null)}>&#x2b;</div>
            </div>
        )
    }
}

export default ListItemsTable
