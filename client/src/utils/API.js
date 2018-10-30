import axios from "axios";

export default {
  // Gets all books
  getBooks: function() {
    return axios.get("/api/books");
  },
  // Gets the book with the given id
  getBook: function(id) {
    return axios.get("/api/books/" + id);
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  },
  logUserIn: function(userData) {
    return axios.post("/api/users/login", userData);
  },
  signUserUp: function(userData) {
    return axios.post("/api/users/signup", userData)
  },
  addWeightEntry: function(id, weightData) {
    return axios.post("/api/users/" + id + "/weight", weightData)
  },
  getUserByEmail: function() {
    return axios.get("/api/users/signup")
  },
  saveFoodEntry: function(foodData) {
    return axios.post("/api/users/food", foodData)
  },
  saveWaterEntry: function(waterData) {
    return axios.post("/api/users/water", waterData)
  },
  saveWeight: function(weightData) {
    return axios.post("/api/users/weight", weightData)
  },
  // getWeightEntries: function(idData) {
  //   return axios.post("/api/users/weight/history", idData);
  // },
  getWeightEntries: function(id) {
    return axios.get("/api/users/weight/history/" + id);
  },
  getWaterEntries: function(id) {
    return axios.get("/api/users/water/history/" + id);
  },
  getFoodEntries: function(id) {
    return axios.get("/api/users/food/history/" + id);
  },
  getSecret: function() {
    return axios.get("/api/users/food/secret");
  },
  foodSearch: function(query, key) {
    const apikey = key;
    const requestURL = 'https://api.nal.usda.gov/ndb/search/?format=json&q=' + query + '&sort=n&max=25&offset=0&api_key=' + apikey;
    return axios.get(requestURL);    
  },
  getFoodItem: function(num, key) {
    const apikey = key;
    const requestURL = 'https://api.nal.usda.gov/ndb/reports/?ndbno=' + num + '&type=b&format=json&api_key=' + apikey;
    return axios.get(requestURL);
  },
  submitFoodItem: function(foodData) {
    return axios.post("/api/users/food", foodData);
  },
  getCalsToday: function(id) {
    return axios.get("/api/users/food/cals/" + id);
  },
  deleteFoodEntry: function(id) {
    return axios.delete("/api/users/food/history/" + id);
  },
  deleteWaterEntry: function(id) {
    return axios.delete("/api/users/water/history/" + id);
  },
  deleteWeightEntry: function(id) {
    return axios.delete("/api/users/weight/history/" + id);
  }
};
