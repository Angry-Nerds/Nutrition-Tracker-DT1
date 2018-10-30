import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link, Redirect } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { FormBtn } from "../../components/Form";
import Moment from "react-moment";
import moment from "moment";
import ReactChartkick, { ColumnChart } from 'react-chartkick'
import Chart from 'chart.js'
ReactChartkick.addAdapter(Chart)

class WaterHistory extends Component {
  state = {
    waterEntries: []
  };

  componentDidMount() {
    this.loadWaterEntries();
  }

  loadWaterEntries = () => {
    const userId = localStorage.getItem("userId");
    API.getWaterEntries(userId)
      .then(res => {
        this.setState({ waterEntries: res.data.waterEntries });
      })
      .catch(err => console.log(err));
  };

  deleteWaterEntry = id => {
    API.deleteWaterEntry(id)
      .then(res => this.loadWaterEntries())
      .catch(err => console.log(err));
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
        .then(res => {
            localStorage.setItem("userId", res.data._id);
            this.setState({redirect: true});
        })
        .catch(err => console.log(err));
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to="/users/options" />;
    }
    var points = [];
    for (var i = 0; i < this.state.waterEntries.length; i++) {
        points.push([moment(this.state.waterEntries[i].date).format("YYYY-MM-DD h:mm:ss a"), this.state.waterEntries[i].glassesOfWater]);
    }
    return (
      <Container fluid>
        <Row>
          <Col size="sm-12 md-9">
            <Jumbotron>
              <h1>Water Intake History</h1>
            </Jumbotron>
            <ColumnChart data={points}/>
            <form>
              
              <Link to={"/users/water/"}>
                <FormBtn
                >
                Go Back to Water Intake Page
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
            {this.state.waterEntries.length ? (
            <List>
                {this.state.waterEntries.map(waterEntry => (
                  <ListItem key={waterEntry._id}>
                    {waterEntry.glassesOfWater} (<Moment format="MMMM Do YYYY, h:mm:ss a">{waterEntry.date}</Moment>)
                    <DeleteBtn onClick={() => this.deleteWaterEntry(waterEntry._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default WaterHistory;