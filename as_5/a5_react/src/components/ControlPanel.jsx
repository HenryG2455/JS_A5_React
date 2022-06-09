import React, { Component } from 'react'


class ControlPanel extends Component {
  render() {
    return (
        <div className="tab-content col-10" id="input_panel">
            <div>
                <div className="row">

                    <div className='row'>
                        <div className="col-2">
                            <label htmlFor="id"><strong>ID:</strong></label><br/>
                        </div>
                        <div className="col-10">
                            <input type="number" id="id" name="id"/><br/>
                        </div>
                    </div>

                    <div className='row'>
                        <div className="col-2">
                            <label htmlFor="category" id="cat">Category:</label><br/>
                        </div>
                        <div className="col-10">
                            <select className="drop" id="category" >
                                <option value="APP">APP (Appetizer)</option>
                                <option value="ENT">ENT (Entree)</option>
                                <option value="DES">DES (Desert)</option>
                            </select>
                        </div>
                    </div>

                    <div className='row'>
                        <div className="col-2">
                            <label htmlFor="description">Description:</label><br/>
                        </div>
                        <div className="col-10">
                            <input type="description" id="description" name="description"/><br/>
                        </div>
                    </div>

                    <div className='row'>
                        <div className="col-2">
                            <label htmlFor="price">Price:</label><br/>
                        </div>
                        <div className="col-10">
                        <input type="number" id="price" name="price"/><br/>
                        </div>
                    </div>

                    <div className='row'>
                        <div className="col-2">
                            <label htmlFor="vegetarian">Vegetarian:</label><br/>
                        </div>
                        <div className="col-10">
                            <input type="checkbox" id="vegetarian" name="vegetarian" value="Car"/><br/>
                        </div>
                    </div>
                    
                </div>
                <div className='row'>
                    <button  className="btn-primary panelButton" onClick={()=> this.props.onButtonClick()}>Done</button>
                    <button  className="btn-primary panelButton" onClick={()=> this.props.onCancelClick()}>Cancel</button>
                </div>
            </div>
        </div>
    )
  }
}

export default ControlPanel;
