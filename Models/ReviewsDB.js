"use strict"

var db = require('../db-connection');
const Review = require('./Review');

class ReviewsDB{

    getAllReviews(request, respond){
        var sql = "SELECT * FROM restaurant_review.review";

        if(request.query.restaurant_id !== undefined) {
            sql = "SELECT * FROM restaurant_review.review WHERE restaurant_id = " + request.query.restaurant_id;
        }

        db.query(sql, function(error, result){
            if(error){
                throw error;
            }
            else{
                respond.json(result);
            }
        });
    }

    addReview(request, respond){
        var now = new Date();
        //var reviewObject = new Review(null, request.body.restaurant_id, request.body.user_id, request.body.title, request.body.reviewContent, request.body.photoUrl, request.body.rating, now.toString());
        var sql = "INSERT INTO restaurant_review.review (restaurant_id,user_id, title, reviewContent,photoUrl, rating,datePosted) VALUES (?,?,?,?,?,?,?)";
        var values = [request.body.restaurant_id,1,request.body.title,request.body.reviewContent,"",request.body.rating,now];
        db.query(sql, values, function (error, result) {
            if(error){
                throw error;
            }
            else{
                respond.json(result);
            }
          });

    }
    
    updateReview(request, respond){
        var now = new Date();
        //var reviewObject = new Review(null, request.body.restaurant_id, request.body.user_id, request.body.title, request.body.reviewContent, request.body.photoUrl, request.body.rating, now.toString());
        var sql = "UPDATE restaurant_review.review SET review = ?, rating =? WHERE review_id = ?";
        var values = [request.body.review_id,request.body.title,request.body.reviewContent,request.body.rating,now];
        db.query(sql, values, function (error, result) {
            if(error){
                throw error;
            }
            else{
                respond.json(result);
            }
          });

    }
    // updateComment(request, respond){
    //     var now = new Date();
        
    //     var commentObject = new Comment(request.params.id, request.body.movieId, request.body.movie, request.body.review,
    //         request.body.username, request.body.rating, now.toString());

    //     var sql = "UPDATE movie_review.comment SET review = ?, rating = ?, datePosted=? WHERE _id = ?";
    //     var values = [commentObject.getReview(), commentObject.getRating(), commentObject.getDatePosted(), commentObject.getId()];
    //     db.query(sql, values, function (error, result) {
    //         if(error){
    //             throw error;
    //         }
    //         else{
    //             respond.json(result);
    //         }
    //       });
    // }
    
    // deleteComment(request, respond){
    //     var commentID = request.params.id;
    //     var sql = "DELETE FROM movie_review.comment WHERE _id = ?";
    //     db.query(sql, commentID, function (error, result) {
    //         if(error){
    //             throw error;
    //         }
    //         else{
    //             respond.json(result);
    //         }
    //       });
    // }
    
}
module.exports = ReviewsDB;

