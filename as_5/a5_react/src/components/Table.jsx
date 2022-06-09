import React from "react";

class Table extends React.Component {
  render() {
    
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Category</th>
              <th>Description</th>
              <th>Price</th>
              <th>Vegetarian</th>
            </tr>
          </thead>
          <tbody>
            {this.props.data.map((p) => {
                return (
                  <tr key ={p.id} className="tableRow" id={p.id} onClick={()=>this.props.onRowClick(p)}>
                    <td>{p.id}</td>
                    <td>{p.category}</td>
                    <td>{p.description}</td>
                    <td>{p.price}</td>
                    <td>{String(p.vegetarian)}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Table;
