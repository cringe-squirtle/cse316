import React, { Component } from 'react'

export class Modal extends Component {
    hideDialog() {
        let dialog = document.getElementById("modal_yes_no_dialog");
        dialog.classList.remove("is_visible");
    }
    deleteList(){
        let index = this.props.todoLists.indexOf(this.props.todoList);
        this.props.todoLists.splice(index, 1);
        this.setState(this.props.todoLists);
        this.props.goHome();
    }
    render() {
        return (
            <div className="modal" id="modal_yes_no_dialog" data-animation="slideInOutLeft">
                <div className="modal_dialog">
                    <header className="dialog_header">
                        Delete list?
                    </header>
                    <section className="dialog_content">
                        <p><strong>Are you sure you want to delete this list?</strong></p>
                    </section>
                        <button id="dialog_yes_button" onClick={this.deleteList.bind(this)}>Yes</button>
                        <button id="dialog_no_button" onClick={this.hideDialog.bind(this)}>No</button>
                    <footer className="dialog_footer">
                        The list will not be retreivable.
                    </footer>
                </div>
            </div>
        )
    }
}

export default Modal
