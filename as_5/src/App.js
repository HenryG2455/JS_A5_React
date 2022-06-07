import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import React from "react";

import ControlPanel from "./components/ControlPanel.jsx";
import MatchedPlaces from "./components/MatchedPlaces.jsx";
import { getPlaces } from "./services/placesService.js";

class App extends React.Component {
state ={
  menuItems: []
}

  componentDidMount(){
    let menuItems =[]
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
