import React, { Component } from "react";
//import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link, Redirect } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
//import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";

class Weight extends Component {
  state = {
    weight: ""
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.weight > 0) {
      API.saveWeight({
        weight: parseFloat(this.state.weight),
        userId: localStorage.getItem("userId")
      })
        .then(this.setState({weight: ""}))
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
              <h1>Weight Entry</h1>
            </Jumbotron>
            <form>
            <Input
                value={this.state.weight}
                onChange={this.handleInputChange}
                name="weight"
                placeholder="Weight (in pounds)"
              />
              <FormBtn
                  disabled={!(this.state.weight)}
                  onClick={this.handleFormSubmit}
                >
                  Submit Weight Entry
                </FormBtn>
              <br />
              <br />
              <Link to={"/users/weight/history"}>
                <FormBtn
                >
                View Weight Entry History
              </FormBtn>
              </Link>
              <br />
              <br />
              <Link to={"/users/options"}>
                <FormBtn
                >
                Go Back to User Options
              </FormBtn>
              </Link>
            </form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Weight;