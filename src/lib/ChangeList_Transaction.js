
export class ChangeList_Transaction{
    constructor(initList, newList){
        this.oldList = initList;
        this.list = initList;
        this.newList = newList; 
    }

    doTransaction = () =>{
        console.log(this.list.list)
        this.list.setList(this.newList);
        console.log(this.list.list)
    }

    undoTransaction = () =>{
        this.list.setList(this.oldList.getList());
    }
}


export default ChangeList_Transaction