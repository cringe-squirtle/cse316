import React, { Component } from 'react';
import testTodoListData from './TestTodoListData.json'
import HomeScreen from './components/home_screen/HomeScreen'
import ItemScreen from './components/item_screen/ItemScreen'
import ListScreen from './components/list_screen/ListScreen'

const AppScreen = {
  HOME_SCREEN: "HOME_SCREEN",
  LIST_SCREEN: "LIST_SCREEN",
  ITEM_SCREEN: "ITEM_SCREEN"
}

class App extends Component {
  state = {
    currentScreen: AppScreen.HOME_SCREEN,
    todoLists: testTodoListData.todoLists,
    currentList: null,
    currentItem: null
  }

  goHome = () => {
    this.setState({currentScreen: AppScreen.HOME_SCREEN});
    this.setState({currentList: null});
  }

  loadList = (todoListToLoad) => {
    this.setState({currentScreen: AppScreen.LIST_SCREEN});
    this.setState({currentList: todoListToLoad}, this.foolProof);
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
    console.log("item",todoItemToEdit)
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
          todoLists={this.state.todoLists}/>;
      case AppScreen.ITEM_SCREEN:
        return <ItemScreen 
          todoItem={this.state.currentItem}
          todoList={this.state.currentList}
          loadList={this.loadList.bind(this)}/>;
      default:
        return <div>ERROR</div>;
    }
  }
}

export default App;