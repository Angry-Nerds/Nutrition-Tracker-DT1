import React, { Component } from "react";
//import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link, Redirect } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
//import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";

class Login extends Component {
  state = {
    email: "",
    password: "",
    message: ""
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
      API.logUserIn({
        email: this.state.email,
        password: this.state.password
      })
        .then(res => {
          if (res.data.user) {
            localStorage.setItem("userId", res.data.user._id);
            this.setState({redirect: true});
          }
          else {
            this.setState({message: res.data.message});
          }
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    if (this.state.redirect) {
      return <Redirect push to="/users/options" />;
    }
    return (
      <Container fluid>
        <Row>
          <Col size="sm-12 md-9">
            <Jumbotron>
              <h1>Welcome to Nutrition Tracker!</h1>
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
              <p>{this.state.message}</p>
              <FormBtn
                disabled={!(this.state.email && this.state.password) 
                  || this.state.email === 'secret'}
                onClick={this.handleFormSubmit}
              >
                Log In
              </FormBtn>
              <br />
              <br />
              <Link to={"/users/signup"}>
                <FormBtn
                >
                Go to Sign-Up Page
              </FormBtn>
              </Link>
              
            </form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Login;