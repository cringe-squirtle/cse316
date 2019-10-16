
export class ChangeList{
    constructor(old_value, new_value, target, type, callback){
        this.old_value = old_value;
        this.new_value = new_value;
        this.target = target;
        this.type = type;
        this.callback = callback
    }

    doTransaction = () =>{
        if(this.type == "name"){
            this.target.props.todoList.name = this.new_value;
        }
        else if(this.type == "owner"){
            this.target.props.todoList.owner = this.new_value;
        }
        else if(this.type == "move"){
            let items = this.target.props.todoList.items;
            for(let i=0; i<this.new_value.length; i++){
                for(let j=0; j<items.length;j++){
                    if(items[j].key==this.new_value[i]){
                        let temp = items[i];
                        items[i] = items[j];
                        items[j] = temp;
                    }
                }
            }
        }
        else if(this.type == "delete"){
            let to_be_removed = this.old_value;
            let index = this.new_value;
            this.target.props.todoList.items.splice(index, 1);
        }
        else if(this.type == "edit_item"){
            let to_be_edit = this.old_value;
            let index = this.new_value;
            let items = this.target.props.todoList.items;
            if(index>items.length || index<0){
                return;
            }else if(index == items.length){
                items.push(to_be_edit);
            }else{
                this.before_edit = items[index];
                items[index]=to_be_edit;
            }
        }
        this.callback();
    }

    undoTransaction = () =>{
        if(this.type == "name"){
            this.target.props.todoList.name = this.old_value;
        }
        else if(this.type == "owner"){
            this.target.props.todoList.owner = this.old_value;
        }
        else if(this.type == "move"){
            this.target.current_sort_criteria=-1;
            let items = this.target.props.todoList.items;
            for(let i=0; i<this.old_value.length; i++){
                for(let j=0; j<items.length;j++){
                    if(items[j].key==this.old_value[i]){
                        let temp = items[i];
                        items[i] = items[j];
                        items[j] = temp;
                    }
                }
            }
        }
        else if(this.type == "delete"){
            let to_be_removed = this.old_value;
            let index = this.new_value;
            let new_items = [];
            let items = this.target.props.todoList.items;
            for(let i=0; i<=items.length;i++){
                if(i<index){
                    new_items.push(items[i]);
                    continue;
                }
                else if(i==index){
                    new_items.push(to_be_removed);
                    continue;
                }else{
                    new_items.push(items[i-1]);
                }
            }
            this.target.props.todoList.items=new_items;
        }
        else if(this.type == "edit_item"){
            let to_be_edit = this.old_value;
            let index = this.new_value;
            let items = this.target.props.todoList.items;
            if(index>=items.length || index<0){
                return;
            }else if(index == items.length-1){
                items.pop();
            }else{
                console.log(this.before_edit);
                items[index]=this.before_edit;
            }
            console.log(this.target.props.todoList)
        }
        this.callback();
    }
}


export default ChangeList;