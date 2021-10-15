"use strict"
var db = require('../db-connection');
const Restaurant = require('../Models/Restaurant');

class RestaurantsDB{
    getAllRestaurants(request, respond){
        var sql = "SELECT * FROM restaurant_review.restaurant";
        db.query(sql, function(error, result){
            if(error){
                throw error;
            }
            else{
                respond.json(result);
            }
        });
    }
  
}

module.exports = RestaurantsDB;


