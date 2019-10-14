import React, { Component } from 'react'
import ListItemCard from './ListItemCard'
import { thisExpression } from '@babel/types';

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

    moveCardUp(index) {

        if(index<=0)
            return

        let temp = this.props.todoList.items[index];
        this.props.todoList.items[index]=this.props.todoList.items[index-1];
        this.props.todoList.items[index-1]=temp;

        this.setState(this.props.todoList, this.foolProof)
        

    }

    moveCardDown(index) {
        let num = this.props.todoList.items.length;
        if(index>=num)
            return

        let temp = this.props.todoList.items[index];
        this.props.todoList.items[index]=this.props.todoList.items[index+1];
        this.props.todoList.items[index+1]=temp;

        this.setState(this.props.todoList, this.foolProof)
        

    }

    deleteCard(index) {
        this.props.todoList.items.splice(index, 1);
        this.setState(this.props.todoList, this.foolProof)
    }

    foolProof(){
        let num = this.props.todoList.items.length;
        if(num==0)
            return
        let bts=document.getElementsByClassName("list_item_card_button");
        Array.from(bts).forEach((e)=>{
            e.classList.remove("disabled");
        })
        document.getElementById("button_move_up_0").classList.add("disabled");
        document.getElementById("button_move_down_"+(num-1)).classList.add("disabled");
    }

    sortByTask(){
        if(this.current_sort_criteria==this.sort_criteria.task_increasing){
            this.current_sort_criteria=this.sort_criteria.task_decreasing;
        }else
            this.current_sort_criteria=this.sort_criteria.task_increasing;
        this.props.todoList.items.sort(this.compare.bind(this));
        this.setState(this.props.todoList, this.foolProof.bind(this))
    }

    sortByDueDate(){
        if(this.current_sort_criteria==this.sort_criteria.due_date_increasing){
            this.current_sort_criteria=this.sort_criteria.due_date_decreasing;
        }else
            this.current_sort_criteria=this.sort_criteria.due_date_increasing;
        this.props.todoList.items.sort(this.compare.bind(this));
        this.setState(this.props.todoList, this.foolProof.bind(this))
    }

    sortByStatus(){
        if(this.current_sort_criteria==this.sort_criteria.status_increasing){
            this.current_sort_criteria=this.sort_criteria.status_decreasing;
        }else
            this.current_sort_criteria=this.sort_criteria.status_increasing;
        this.props.todoList.items.sort(this.compare.bind(this));
        this.setState(this.props.todoList, this.foolProof.bind(this))
    }

    compare(item1, item2){
        if(this.current_sort_criteria==this.sort_criteria.task_decreasing ||
            this.current_sort_criteria==this.sort_criteria.due_date_decreasing ||
            this.current_sort_criteria==this.sort_criteria.status_decreasing){
            let temp=item1;
            item1=item2;
            item2=temp
        }
        if(this.current_sort_criteria==this.sort_criteria.task_increasing ||
            this.current_sort_criteria==this.sort_criteria.task_decreasing){
                if(item1.description<item2.description)
                    return -1;
                if(item1.description>item2.description)
                    return 1;
                else
                    return 0;
            }
        if(this.current_sort_criteria==this.sort_criteria.due_date_increasing ||
            this.current_sort_criteria==this.sort_criteria.due_date_decreasing){
                let date1 = new Date(item1.due_date);
                let date2 = new Date(item2.due_date);
                if(date1<date2)
                    return -1;
                if(date1>date2)
                    return 1;
                else
                    return 0;
            }
        if(this.current_sort_criteria==this.sort_criteria.status_increasing ||
            this.current_sort_criteria==this.sort_criteria.status_decreasing){
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
                            index={index}
                            key={todoItem.key}
                            listItem={todoItem} 
                            moveCardUp={this.moveCardUp.bind(this)}
                            moveCardDown={this.moveCardDown.bind(this)}
                            deleteCard={this.deleteCard.bind(this)}/>
                    ))

                }
                <div className='list_item_add_card' >+</div>
            </div>
        )
    }
}

export default ListItemsTable
