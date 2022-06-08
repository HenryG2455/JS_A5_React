import React, { Component } from 'react'


class ControlPanel extends Component {
  render() {
    return (
        <div className="tab-content col-10" id="input_panel">
            <div>
                <div className="row">
                    <div className="col-2">
                        <label htmlFor="id"><strong>ID:</strong></label><br/>
                        <label htmlFor="category" id="cat">Category:</label><br/>
                        <label htmlFor="description">Description:</label><br/>
                        <label htmlFor="price">Price:</label><br/>
                        <label htmlFor="vegetarian">Vegetarian:</label><br/>
                    </div>
                    <div className="col-10">
                        <input type="number" id="id" name="id"/><br/>
                        <select className="form-control" id="category" >
                            <option value="APP">APP (Appetizer)</option>
                            <option value="ENT">ENT (Entree)</option>
                            <option value="DES">DES (Desert)</option>
                        </select>
                        <input type="description" id="description" name="description"/><br/>
                        <input type="number" id="price" name="price"/><br/>
                        <input type="checkbox" id="vegetarian" name="vegetarian" value="Car"/><br/>
                    </div>
                    
                </div>
                <button id="doneButton" className="btn-primary">Done</button>
                <button id="cancelButton" className="btn-primary">Cancel</button>
            </div>
        </div>
    )
  }
}

export default ControlPanel;
