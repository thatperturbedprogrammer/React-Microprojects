import React from "react";

class DisplayMessages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      messages: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
  }

  handleChange(e) {
    this.setState({ input: e.target.value });
  }

  submitMessage(e) {
    e.preventDefault(); // Prevent page refresh
    if (this.state.input.trim() !== "") {
      this.setState((prevState) => ({
        messages: [...prevState.messages, prevState.input],
        input: "",
      }));
    }
  }

  render() {
    return (
      <div>
        <h2>Type in a new Message:</h2>
        <form onSubmit={this.submitMessage}>
          <textarea
            onChange={this.handleChange}
            value={this.state.input}
            required
          />
          <button type="submit">Add message</button>
        </form>
        <ul>
          {this.state.messages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default DisplayMessages;
