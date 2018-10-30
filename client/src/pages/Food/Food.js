import React, { Component } from "react";
//import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link, Redirect } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import SelectBtn from "../../components/SelectBtn";
import { Input, FormBtn } from "../../components/Form";
import moment from "moment";

class Food extends Component {
  state = {
    search: "",
    foodItems: [],
    apikey: "",
    itemNum: 0,
    nutrientsList: [],
    itemInfo: {},
    caloriesToday: 0,
    foodEntries: []
  };

  searchFoodItems = (event) => {
    API.getFoodItems()
  }

  componentDidMount() {
    this.getCaloriesToday();
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    this.getKey();
  };

  searchAPI = query => {
    API.foodSearch(query, this.state.apikey)
      .then(response => {
        this.setState({itemNum: response.data.list.item[0].ndbno});
        this.setState({foodItems: response.data.list.item});
        this.setState({itemNum: 0, 
          nutrientsList: [],
          itemInfo: {}
        });
      })
      .catch(err => console.log(err));
  }

  getKey = () => {
    API.getSecret()
      .then(res => {
        this.setState({apikey: res.data.password});
        this.searchAPI(this.state.search, this.state.apikey);
      })
      .catch(err => console.log(err));
  }

  getItem = id => {
    API.getFoodItem(id, this.state.apikey)
      .then(res => {console.log(res);
        this.setState({nutrientsList: res.data.report.food.nutrients});
        this.setState({itemInfo:res.data.report.food});
      })
      .catch(err => console.log(err));
  };

  submitItem = event => {
    event.preventDefault();
    const info = this.state.itemInfo;
    API.submitFoodItem({
      foodItem: info.name,
      itemNumber: info.ndbno,
      energy: this.findKey("Energy"),
      protein: this.findKey("Protein"),
      fat: this.findKey("Total lipid (fat)"),
      carbs: this.findKey("Carbohydrate, by difference"),
      fiber: this.findKey("Fiber, total dietary"),
      sugar: this.findKey("Sugars, total"),
      userId: localStorage.getItem("userId")
    })
    .then(res => {console.log(res); 
      this.getCaloriesToday();})
    .catch(err => console.log(err));
  };

  findKey = key => {
    const info = this.state.itemInfo;
    if (info.nutrients.find(obj => obj.name === key)) {
      return info.nutrients.find(obj => obj.name === key).value;
    }
    else {
      return 0;
    }
  }

  getCaloriesToday = () => {
    API.getCalsToday(localStorage.getItem("userId"))
    .then(res => {
      this.setState({ foodEntries: res.data.foodEntries });
      const today = moment().startOf('day');
      const tomorrow = moment(today).endOf('day');
      const result = this.state.foodEntries.filter(foodEntry => (moment(foodEntry.date).isAfter(today) && moment(foodEntry.date).isBefore(tomorrow)))
        .reduce(function(sum, entry) {return sum + entry.energy}, 0);
      this.setState({caloriesToday: result});
    })
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
              <h1>Food Search & Select</h1>
              <h2>Calories Consumed Today: {this.state.caloriesToday}</h2>
            </Jumbotron>
            <form>
              <Input
                value={this.state.search}
                onChange={this.handleInputChange}
                name="search"
                placeholder="Search"
              />
              <FormBtn
                  disabled={!(this.state.search)}
                  onClick={this.handleFormSubmit}
                >
                  Search
                </FormBtn>
                <br />
              <br />
                <FormBtn
                  disabled={this.state.nutrientsList.length === 0}
                  onClick={this.submitItem}
                >
                  Submit Food Entry
                </FormBtn>
              <br />
              <br />
              <Link to={"/users/food/history"}>
                <FormBtn
                >
                View Food Entry History
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
            {this.state.nutrientsList.length ? (
              <form>
              {this.state.nutrientsList.map(nutrient => (
                <p key={nutrient.name}>{nutrient.name}: {nutrient.value} {nutrient.unit}</p>
              ))}
              </form>
            ) : (<p></p>)}
            
            {this.state.foodItems.length ? (
            <List>
                {this.state.foodItems.map(foodItem => (
                  <ListItem key={foodItem.ndbno}>
                    {foodItem.name}
                    <SelectBtn onClick={() => this.getItem(foodItem.ndbno)} />
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

export default Food;