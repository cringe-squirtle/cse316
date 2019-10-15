import React, { Component } from 'react'

export class ListTrash extends Component {
    processDeleteList(){
        let dialog = document.getElementById("modal_yes_no_dialog");
        dialog.classList.add("is_visible");
    }
    render() {
        return (
            <div id="list_trash" 
            onClick={this.processDeleteList.bind(this)}>&#128465;</div>
        )
    }
}

export default ListTrash
