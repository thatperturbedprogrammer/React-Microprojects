import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: "",
      toDoList: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit() {
    const itemsArray = this.state.userInput.split(",");
    this.setState({
      toDoList: itemsArray,
    });
  }
  handleChange(e) {
    this.setState({
      userInput: e.target.value,
    });
  }
  render() {
    const items = this.state.toDoList.map((toDoItem, index) => (
      <li key={index}>{toDoItem}</li>
    ));
    return (
      <div className="container">
        <textarea
          onChange={this.handleChange}
          value={this.state.userInput}
          placeholder="Separate Items With Commas"
        />
        <br />
        <button onClick={this.handleSubmit}>Create List</button>
        <h4>My "To Do" List:</h4>
        <ul>{items}</ul>
      </div>
    );
  }
}

export default App;
