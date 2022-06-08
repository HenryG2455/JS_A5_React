import './App.css';
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import Table from "./components/Table";
import ControlPanel from './components/ControlPanel';


class App extends React.Component {
  state = {
    menuItems: [] 
  }

  componentDidMount() {
    this.getData()
  }

  async getData(){
    let url = "http://localhost:8000/api/menuitems/" ;
    const options = {
        method: "GET"
    };
    const response = await fetch(url, options);
    let res = await response.json()
    this.setState({ menuItems: res.data });
    console.log(this.state.menuItems)
    
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
        <div >
        <ul className="nav nav-pills" id="myTab" role="tablist">
            <li className="nav-item">
                <button className="nav-link navBtn" id="add-tab" data-bs-toggle="tab" data-bs-target="#add"
                    type="button" role="tab">
                    ADD
                </button>
            </li>
            <li className="nav-item">
                <button className="nav-link default" id="update-tab" data-bs-toggle="tab" data-bs-target="#add"
                    type="button" role="tab">
                    UPDATE
                </button>
            </li>
            <li className="nav-item">
                <button className="nav-link default" id="delete-tab" data-bs-toggle="tab" data-bs-target="#add"
                    type="button" role="tab">
                    DELETE
                </button>
            </li>
        </ul>
        <br/>
    </div>
          <ControlPanel/>
          <Table data ={this.state.menuItems}/>
        </header>T
      </div>
    );
  }
}

export default App;
