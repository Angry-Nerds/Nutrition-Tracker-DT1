import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link, Redirect } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { FormBtn } from "../../components/Form";

class Water extends Component {
  state = {
    glassesOfWater: 0
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleIncrement = event => {
    event.preventDefault();
    this.setState({ glassesOfWater: this.state.glassesOfWater + 1 });
  }

  handleDecrement = event => {
    event.preventDefault();
    if (this.state.glassesOfWater > 0) {
      this.setState({ glassesOfWater: this.state.glassesOfWater - 1 });
    }
  }

  submitWaterIntake = event => {
    event.preventDefault();

    API.saveWaterEntry({
          glassesOfWater: this.state.glassesOfWater,
          userId: localStorage.getItem("userId")
        })
        .then(this.setState({glassesOfWater: 0}))
        .catch(err => console.log(err));
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
              <h1>Glasses of Water Counter</h1>
              <h2>{this.state.glassesOfWater}</h2>
            </Jumbotron>
            <form>
            <FormBtn
                  onClick={this.handleIncrement}
                >
                  +
                </FormBtn>
                <FormBtn
                  onClick={this.handleDecrement}
                >
                  -
                </FormBtn>
                <br />
                <br />
                <FormBtn
                  disabled={this.state.glassesOfWater <= 0}
                  onClick={this.submitWaterIntake}
                >
                  Submit Water Intake
                </FormBtn>

              <Link to={"/users/water/history"}>
                <FormBtn
                >
                View Water Intake History
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

export default Water;