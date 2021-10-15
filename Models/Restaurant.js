"use strict"

class Restaurant{
    constructor(restaurant_id, restaurantName, address, openingHours1, openingHours2, phoneNumber, rating, restaurantMapUrl, cuisine, thumbnail){
        this.restaurant_id = restaurant_id;
        this.restaurantName = restaurantName;
        this.address = address;
        this.openingHours1 = openingHours1;
        this.openingHours2 = openingHours2;
        this.phoneNumber = phoneNumber;
        this.rating = rating;
        this.restaurantMapUrl = restaurantMapUrl;
        this.thumb = thumbnail;
        this.cuisine = cuisine;

    }
    getRestaurantId(){
        return this.restaurant_id;
    }
    getRestaurantName(){
        return this.restaurantName;
    }
    getAddress(){
        return this.address;
    }
    getOpeningHours1(){
        return this.openingHours1;
    }
    getOpeningHours2(){
        return this.openingHours2;
    }
    getPhoneNumber(){
        return this.phoneNumber;
    }
    getRating(){
        return this.rating;
    }
    getRestaurantMapUrl(){
        return this.restaurantMapUrl;
    }
    getThumbnail(){
        return this.thumb;
    }
    getCuisine(){
        return this.cuisine;
    }

    
}
module.exports = Restaurant;