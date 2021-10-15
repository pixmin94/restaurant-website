"use strict"

class Review{
    constructor(review_id, restaurant_id, restaurant, review, username, rating, datePosted){
        this.review_id = review_id;
        this.restaurant_id = restaurant_id;
        this.restaurant = restaurant;
        this.review = review;
        this.username = username;
        this.rating = rating;
        this.datePosted = datePosted;
    }
    getReviewId(){
        return this.review_id;
    }
    getrestaurantId(){
        return this.restaurantId;
    }
    getRestaurant(){
        return this.restaurant;
    }
    getReview(){
        return this.review;
    }
    getUsername(){
        return this.username;
    }
    getRating(){
        return this.rating;
    }
    getDatePosted(){
        return this.datePosted;
    }
    setRestaurantId(restaurant_id){
        this.restaurant_id = restaurant_id;
    }
    setRestaurant(restaurant){
        this.restaurant = restaurant;
    }
    setReview(review){
        this.review = review;
    }
    setUsername(username){
        this.username = username;
    }
    setRating(rating){
        this.rating = rating;
    }
    setDatePosted(datePosted){
        this.datePosted = datePosted;
    }
}
module.exports = Review;