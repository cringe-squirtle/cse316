import React, { Component } from 'react';
import testTodoListData from './TestTodoListData.json'
import HomeScreen from './components/home_screen/HomeScreen'
import ItemScreen from './components/item_screen/ItemScreen'
import ListScreen from './components/list_screen/ListScreen'
import JSTPS from './lib/JSTPS'

const AppScreen = {
  HOME_SCREEN: "HOME_SCREEN",
  LIST_SCREEN: "LIST_SCREEN",
  ITEM_SCREEN: "ITEM_SCREEN"
}

window.tps = new JSTPS();
window.onkeydown = (e) =>{
  if(e.ctrlKey && (e.key==='z' || e.key==='Z')){
    window.tps.undoTransaction();
  }
  if(e.ctrlKey && (e.key==='y' || e.key==='Y')){
    window.tps.doTransaction();
  }
}


class App extends Component {


  state = {
    currentScreen: AppScreen.HOME_SCREEN,
    todoLists: testTodoListData.todoLists,
    currentList: null,
    currentItem: null,
    tps : new JSTPS()
  }


  goHome = () => {

    this.setState({currentScreen: AppScreen.HOME_SCREEN});
    this.setState({currentList: null});
    window.tps = new JSTPS();
  }

  loadList = (todoListToLoad) => {
    this.setState({currentScreen: AppScreen.LIST_SCREEN});
    this.setState({currentList: todoListToLoad}, this.foolProof);
    
    let new_lists = [];
    new_lists.push(todoListToLoad);
    let index = this.state.todoLists.indexOf(todoListToLoad);
    for(let i=0; i< this.state.todoLists.length;i++){
      if(i==index)
        continue;
      new_lists.push(this.state.todoLists[i]);
    }
    this.setState({todoLists: new_lists});

    console.log("currentList: " + this.state.currentList);
    console.log("currentScreen: " + this.state.currentScreen);
  }

  foolProof(){
    let num = this.state.currentList.items.length;
    if(num===0)
      return
    let bts=document.getElementsByClassName("list_item_card_button");
    Array.from(bts).forEach((e)=>{
        e.classList.remove("disabled");
    })
    document.getElementById("button_move_up_0").classList.add("disabled");
    console.log(document.getElementById("button_move_up_0"))
    document.getElementById("button_move_down_"+(num-1)).classList.add("disabled");
  }

  createNewList(){
    let key = this.state.todoLists.length-1;
    let new_list ={
        key : key,
        name : 'Unknown',
        owner : '',
        items : []
    }

    this.state.todoLists.push(new_list);
    this.setState(this.state.todoLists);
    this.loadList(new_list);
  }

  editItem(todoItemToEdit){
    this.setState({currentItem: todoItemToEdit});
    this.setState({currentScreen: AppScreen.ITEM_SCREEN});
  }

  render() {
    switch(this.state.currentScreen) {
      case AppScreen.HOME_SCREEN:
        return <HomeScreen 
        loadList={this.loadList.bind(this)} 
        todoLists={this.state.todoLists} 
        createNewList={this.createNewList.bind(this)}/>
      case AppScreen.LIST_SCREEN:            
        return <ListScreen
          goHome={this.goHome.bind(this)}
          editItem={this.editItem.bind(this)}
          todoList={this.state.currentList} 
          todoLists={this.state.todoLists}
          tps={this.state.tps}/>;
      case AppScreen.ITEM_SCREEN:
        return <ItemScreen 
          todoItem={this.state.currentItem}
          todoList={this.state.currentList}
          loadList={this.loadList.bind(this)}
          tps={this.state.tps}/>;
      default:
        return <div>ERROR</div>;
    }
  }
}

export default App;