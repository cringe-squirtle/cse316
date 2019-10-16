
export class Value{
    constructor(){
        this.value = null;
    }
    setValue = (initList) =>{
        this.value = initList;
    }
    getValue = () =>{
        return this.value;
    }
}


export default Value