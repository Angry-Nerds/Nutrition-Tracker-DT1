import React, { Component } from "react";
//import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link, Redirect } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
//import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";

class Signup extends Component {
  state = {
    email: "",
    password: "",
    height: "",
    initialWeight: ""
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.email && this.state.password) {
      API.signUserUp({
        email: this.state.email,
        password: this.state.password,
        height: parseInt(this.state.height, 10),
        initialWeight: parseFloat(this.state.initialWeight)
      })
        .then(res => {localStorage.setItem("userId", res.data._id);
            this.setState({redirect: true});
        })
        .catch(err => console.log(err));
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to="/users/options" />;
    }
    return (
      <Container fluid>
        <Row>
          <Col size="sm-12 md-9">
            <Jumbotron>
              <h1>Sign Up For an Account:</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.email}
                onChange={this.handleInputChange}
                name="email"
                placeholder="Email (required)"
              />
              <Input
                value={this.state.password}
                onChange={this.handleInputChange}
                name="password"
                placeholder="Password (required)"
              />
              <Input
                value={this.state.height}
                onChange={this.handleInputChange}
                name="height"
                placeholder="Height (in inches)"
              />
              <Input
                value={this.state.initialWeight}
                onChange={this.handleInputChange}
                name="initialWeight"
                placeholder="Weight (in pounds)"
              />
              <Link to={"/users/options"}>
                <FormBtn
                  disabled={!(this.state.email && this.state.password)}
                  onClick={this.handleFormSubmit}
                >
                  Sign Up
                </FormBtn>
              </Link>
              <br />
              <br />
              <Link to={"/"}>
                <FormBtn
                >
                Go Back to Log-In Page
              </FormBtn>
              </Link>
            </form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Signup;