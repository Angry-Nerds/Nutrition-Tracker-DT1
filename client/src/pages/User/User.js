import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { FormBtn } from "../../components/Form";

class User extends Component {
handleLogOut = event => {
  localStorage.setItem("userId", null);
};

render() {
  return (
    <Container fluid>
      <Row>
      <Col size="sm-12 md-9">
              <Jumbotron>
                <h1>User Options</h1>
              </Jumbotron>
              <form>
                <Link to={"/users/food"}>
                  <FormBtn
                    
                  >
                    Track Food
                  </FormBtn>
                </Link>
                <br />
                <br />
                <Link to={"/users/water"}>
                  <FormBtn
                    
                  >
                    Track Water Intake
                  </FormBtn>
                </Link>
                <br />
                <br />
                <Link to={"/users/weight"}>
                <FormBtn
                  
                >
                  Track Weight
                </FormBtn>
                </Link>
                <br />
                <br />
                <Link to={"/"}>
                  <FormBtn
                    onClick={this.handleLogOut}
                  >
                  Log Out
                </FormBtn>
                </Link>
              </form>
        </Col>
      </Row>
    </Container>
    );
  }
}

export default User;