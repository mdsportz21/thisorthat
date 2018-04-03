import React, { Component } from "react";
 
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {bracketName: ''};
  }

  handleChange(event) {
    this.setState({bracketName: event.target.value});
  }

  handleSubmit(event) {
    this.props.history.push({
      pathname: '/bracket',
      search: '?name=' + this.state.bracketName
    })
    event.preventDefault();
  }

  NameForm = () => (
    <form onSubmit={(e) => this.handleSubmit(e)}>
      <label>
        Name:
        <input type="text" value={this.state.bracketName} onChange={(e) => this.handleChange(e)} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );

  render() {
    const { NameForm } = this;

    return (
      <NameForm />
    );
  }
}
 
export default Home;