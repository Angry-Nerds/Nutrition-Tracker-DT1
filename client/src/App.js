import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import User from "./pages/User";
import Food from "./pages/Food";
import FoodHistory from "./pages/FoodHistory";
import Water from "./pages/Water";
import WaterHistory from "./pages/WaterHistory";
import Weight from "./pages/Weight";
import WeightHistory from "./pages/WeightHistory";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";

const App = () => (
  <Router>
    <div>
      <Nav />
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/users/login" component={Login} />
        <Route exact path="/users/signup" component={Signup} />
        <Route exact path="/users/options" component={User} />
        <Route exact path="/users/food" component={Food} />
        <Route exact path="/users/food/history" component={FoodHistory} />
        <Route exact path="/users/water" component={Water} />
        <Route exact path="/users/water/history" component={WaterHistory} />
        <Route exact path="/users/weight" component={Weight} />
        <Route exact path="/users/weight/history" component={WeightHistory} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>
);

export default App;
