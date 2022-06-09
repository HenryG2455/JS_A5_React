import "./App.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import Table from "./components/Table";
import ControlPanel from "./components/ControlPanel";
import Buttons from "./components/Buttons";

class App extends React.Component {
  state = {
    menuItems: [],
    panel: false,
    rowSelected:0,
    dataSelected:{},
    button:""

  };

  componentDidMount() {
    document.getElementById("delete-tab").disabled = true;
    document.getElementById("update-tab").disabled = true;
    document.getElementById("input_panel").classList.add("hidden");
    this.getData();

  }

  doCancel = () => {
    if(this.state.rowSelected !== 0){
      document.getElementById(this.state.rowSelected).classList.remove("selected");
    }
    if(document.querySelector(".btnSelected") !== null){
      document.querySelector(".btnSelected").classList.remove('btnSelected');
    }
    this.setState({panel: false, rowSelected:0,dataSelected:{},button:""});
    document.getElementById("delete-tab").disabled = true;
    document.getElementById("update-tab").disabled = true;
    document.querySelector("#id").value = 0;
    document.querySelector("#category").value = "APP";
    document.querySelector("#description").value = "";
    document.querySelector("#price").value = 0;
    document.querySelector("#vegetarian").checked = false;
    document.getElementById("input_panel").classList.add("hidden");
  }
  
  async getData() {
    let url = "http://localhost:8000/api/menuitems/";
    const options = {
      method: "GET",
    };
    const response = await fetch(url, options);
    let res = await response.json();
    this.setState({ menuItems: res.data });
    //console.log(this.state.menuItems);
  }

  handleButtonClick = (msg) => {
    //alert("you clicked the city button");
    this.setState({button:msg});
    
    //Reset Button selection
    if(document.querySelector(".btnSelected") !== null){
      document.querySelector(".btnSelected").classList.remove('btnSelected');
    }

    if(msg === "ADD"){
      document.getElementById("input_panel").classList.remove("hidden");
      document.getElementById("add-tab").classList.add('btnSelected');
    }else if(msg === "DELETE"){
      document.getElementById("input_panel").classList.remove("hidden");
      document.getElementById("delete-tab").classList.add('btnSelected');
    }
    else if(msg === "UPDATE"){
      document.getElementById("input_panel").classList.remove("hidden");
      document.getElementById("update-tab").classList.add('btnSelected');
    }else if(this.state.rowSelected !== 0){
      document.getElementById("input_panel").classList.remove("hidden");
    }

  };

  dataOperation = async() =>{
    switch(this.state.button){
      case "ADD":
        await this.doAdd();
        
        break;
      case "DELETE":
        await this.doDelete();
        
        break;
      case "UPDATE":
        await this.doUpdate();
        
        break;
      default:
        break;
    }
    this.getData();
  }
  

  rowSelected=(data)=>{
    this.setState({rowSelected: data.id});
    this.setState({dataSelected: data})
    console.log(this.state.dataSelected);
    this.clearSelections();
    document.getElementById(""+data.id+"").classList.add("selected");
    this.populatePanel(data);
    document.getElementById("delete-tab").disabled = false;
    document.getElementById("update-tab").disabled = false;
  }

  populatePanel(data){
    let temp;
    if(data.vegetarian === "true"){
      temp = true;
    }else temp = false;
    document.querySelector("#id").value = data.id;
    document.querySelector("#category").value = data.category;
    document.querySelector("#description").value = data.description;
    document.querySelector("#price").value = data.price;
    document.querySelector("#vegetarian").checked = data.temp;
    
  }
  //CRUD functions
  async doAdd() {
    console.log(this.state.button)
    let updateObj = this.getInputData();
    console.log(updateObj)

    let url = "http://localhost:8000/api/menuitems/" + updateObj.id;
    const options = {
        method: "POST",
        body: JSON.stringify(updateObj),
        headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(url, options);
    
    let res = await response.status;
    let res2 = await response.json();
    console.log(response);
    if (response.status === 409){
        alert(res2.err);
    } else if (res.status === 500){
        alert(res2.err);
    }else if (response.status === 400){
        alert("Bad Request");
    }else if(response.status === 201){
        this.getData();
    }
  }

  //UPDATE BUTTON
  async doUpdate() {
    console.log(this.state.button)
    let updateObj = this.getInputData();

    let url = "http://localhost:8000/api/menuitems/" + updateObj.id;
    const options = {
        method: "PUT",
        body: JSON.stringify(updateObj),
        headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(url, options);
    console.log(response);
    let res = await response.status;
    let res2 = await response.json();
    console.log(res)
    if ( response.status === 404){
        alert(res2.err);
    } else if (response.status === 500){
        alert(res2.err);
    }else if (response.status === 400){
        alert(res2.err);
    }else if(response.status === 200){
        this.getData();

    }
  }

//DELETE BUTTON
async doDelete() {
  console.log(this.state.button)
  let updateObj = this.getInputData();

  let url = "http://localhost:8000/api/menuitems/" + updateObj.id;
  const options = {
      method: "DELETE",
  };
  const response = await fetch(url, options);
    let res = await response.status;
    let res2 = await response.json();
  console.log(response);
  if (response.status === 404){
      alert(res2.err);
  } else if (response.status === 500){
      alert(res2.err);
  }else if (response.status === 400){
      alert(res2.err);
  }else if(response.status === 200){
      this.getData();
      this.setState({rowSelected:0})
      //window.location.reload(false);
  }
}
  //END of CRUD Functions

  getInputData(){
    let id = Number(document.querySelector("#id").value);
    let category = document.querySelector("#category").value;
    let description = document.querySelector("#description").value;
    let price = Number(document.querySelector("#price").value);
    let vegetarian = document.querySelector("#vegetarian").checked;
    let updateObj = {
        id: id,
        category: category,
        description: description,
        price: price,
        vegetarian: vegetarian,
    };
    return updateObj;
  }



  clearSelections(){
    let elements = document.getElementsByTagName("tr");
    //elements[0].classList.remove("selected");
    //console.log(elements)
    for(let i = 0; i <elements.length; i++){
      elements[i].classList.remove("selected");
    }
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Buttons  onButtonClick={this.handleButtonClick}/>
          <ControlPanel onButtonClick={this.dataOperation} onCancelClick={this.doCancel}/>
          <Table data={this.state.menuItems} onRowClick={this.rowSelected}/>
        </header>
      </div>
    );
  }
}

export default App;
