import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import * as acc from "../db/MenuItemAccessor";



class App extends React.Component {
  state ={
    menuItems: []
  }

  async componentDidMount(){
    let items = await acc.getAllItems();
        //objects[0].selected = true;
        this.setState({ menuItems: items });
  }

  render(){
  return (
    <div className="App">
      <header className="App-header">
        
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        
          Learn React
      </header>
    </div>
  );
  }
}

export default App;
