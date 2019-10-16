import React, { Component } from 'react'
export class ListItemCard extends Component {
    setStatus(completed){
        if(completed)
            return (
                <div className='list_item_card_completed'>Completed</div>
            )
        
        return <div className='list_item_card_not_completed'>Pending</div>;
    }

    editItem(){
        this.props.editItem(this.props.listItem);
    }
    

    render() {
        return (
            <div className='list_item_card' 
            id={'list_item_card_'+this.props.index}
            onClick={this.editItem.bind(this)}>
                <div className='list_item_card_description'>
                    {this.props.listItem.description}
                </div>
                <div className='list_item_card_assigned_to'>
                    Assigned To: <strong>{this.props.listItem.assigned_to}</strong>
                </div>
                <div className='list_item_card_due_date'>
                    {this.props.listItem.due_date}
                </div>
                {this.setStatus(this.props.listItem.completed)}
                <div className="list_item_card_toolbar">
                    <div className="list_item_card_button" 
                    id={"button_move_up_"+this.props.index}
                    onClick={
                        e => {
                            e.stopPropagation();
                            this.props.moveCardUp(this.props.index);
                        }
                    }
                    >&#x21e7;</div>
                    <div className="list_item_card_button"
                    id={"button_move_down_"+this.props.index} 
                    onClick={
                        e => {
                            e.stopPropagation();
                            this.props.moveCardDown(this.props.index);
                        }
                    }>&#x21e9;</div>
                    <div className="list_item_card_button"
                    id={"button_delete_"+this.props.index} 
                    onClick={
                        e => {
                            e.stopPropagation();
                            this.props.deleteCard(this.props.index);
                        }
                    }>&#10005;</div>
                </div>
            </div>
        )
    }
}

export default ListItemCard
