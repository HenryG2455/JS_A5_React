
import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.css";

export class Buttons extends Component {

  render() {
    return (
        <div id='headerButtons'>
            <button
              className="btn btn-primary ms-3 col-4 btnSize"
              id="add-tab"
              type="button"
              onClick={() => this.props.onButtonClick("ADD")}
              >
              ADD
            </button>
            <button
              className="btn btn-primary ms-3 col-4 btnSize"
              id="update-tab"
              type="button"
              onClick={() => this.props.onButtonClick("UPDATE")}>
              UPDATE
            </button>

            <button
              className="btn btn-primary ms-3 col-4 btnSize"
              id="delete-tab"
              type="button"
              onClick={() => this.props.onButtonClick("DELETE")}>
              DELETE
            </button>
        <br />
      </div>
    )
  }
}

export default Buttons