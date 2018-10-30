import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link, Redirect } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { FormBtn } from "../../components/Form";
import Moment from "react-moment";
import ReactChartkick, { LineChart } from 'react-chartkick'
import Chart from 'chart.js'
ReactChartkick.addAdapter(Chart)

class WeightHistory extends Component {
  state = {
    weightEntries: []
  };

  componentDidMount() {
    this.loadWeightEntries();
  }

  loadWeightEntries = () => {
    const userId = localStorage.getItem("userId");
    console.log(userId);
    API.getWeightEntries(userId)
      .then(res => {console.log(res);
        this.setState({ weightEntries: res.data.weightEntries });
      })
      .catch(err => console.log(err));
  };

  deleteWeightEntry = id => {
    API.deleteWeightEntry(id)
      .then(res => this.loadWeightEntries())
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
    var points = {};
    for (var i = 0; i < this.state.weightEntries.length; i++) {
        points[this.state.weightEntries[i].date] = this.state.weightEntries[i].weight;
    }
    return (
      <Container fluid>
        <Row>
          <Col size="sm-12 md-9">
            <Jumbotron>
              <h1>Weight History</h1>
            </Jumbotron>
            <LineChart data={points} />
            <form>
              
              <Link to={"/users/weight/"}>
                <FormBtn
                >
                Go Back to Weight Entry Page
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
            {this.state.weightEntries.length ? (
            <List>
                {this.state.weightEntries.map(weightEntry => (
                  <ListItem key={weightEntry._id}>
                    {weightEntry.weight} (<Moment format="MMMM Do YYYY, h:mm:ss a">{weightEntry.date}</Moment>)
                    <DeleteBtn onClick={() => this.deleteWeightEntry(weightEntry._id)} />
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

export default WeightHistory;