import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import "./App.scss";
import logo from "./assets/github-logo.png";
import Users from "./components/Users";

class App extends React.Component {
  render() {
    return (
      <Container>
        <Navbar>
          <Navbar.Brand>
            <img src={logo} alt="github logo" /> Github User Cards
          </Navbar.Brand>
        </Navbar>
        <Users />
      </Container>
    );
  }
}

export default App;
