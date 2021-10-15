"use strict"
 
var restaurantdb = require('../Models/RestaurantsDB');
var restaurantDBObject = new restaurantdb;

function routeRestaurants(app) {
    app.route("/restaurants")
     .get(restaurantDBObject.getAllRestaurants);

}
module.exports = { routeRestaurants };





