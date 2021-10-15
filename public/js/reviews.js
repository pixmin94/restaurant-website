function fetchReviews(restaurant_id) {
    var request = new XMLHttpRequest();

    request.open('GET', "/reviews", true);
    console.log(restaurant_id);
    localStorage.setItem("Rest_id", restaurant_id);
    //This command starts the calling of the comments api
    request.onload = function () {
        //get all the comments records into our comments array
        review_array = JSON.parse(request.responseText);
        showRestaurantReviews(review_array);
    };
    request.send();

}

function showRestaurantReviews(reviews) {
    console.log("it run here showRestaurantReviews()");
    var reviewHolder = document.getElementById("reviewBody");
    reviewHolder.innerHTML = "";

    console.log(localStorage.getItem("Rest_id")+" next:"+reviews[0].restaurant_id);

    for (var count = 0; count < reviews.length; count++) {
        if (reviews[count].restaurant_id == localStorage.getItem("Rest_id")) {
            var cell = '</p><div class = "bg-light"><h5>' +
                reviews[count].title +
                '</br></h5>' +
                reviews[count].reviewContent +
                '</div></p>';

                reviewHolder.insertAdjacentHTML('beforeend', cell);

        }
    }

    // for (review of reviews) {
    //     var cell = '</p><div class = "bg-light"><h5>' + 
    //     review.title +
    //     '</br></h5>' +
    //     review.reviewContent +
    //     '</div></p>'

    //     reviewHolder.innerHTML += cell;
    // }
}

function newReview() {
    //Initialise each HTML input elements in the modal window with default value.
    rating = 0;
    document.getElementById("title").value = "";
    document.getElementById("reviewContent").value = "";
}

// Submit or send the new comment to the server to be added.
function addReview() {
    event.preventDefault();
    //alert("my restaurant id is"+localStorage.getItem("Rest_id"));
    var review = new Object();
    review.restaurant_id = localStorage.getItem('Rest_id'); // Movie ID is required by server to create new comment 
    // Movie title is required by server to create new comment
    review.title = document.getElementById("title").value; // Value from HTML input text
    review.reviewContent = document.getElementById("reviewContent").value; // Value from HTML input text
    review.rating = document.getElementById("rating").value;

    var postReview = new XMLHttpRequest(); // new HttpRequest instance to send comment

    postReview.open("POST", review_url, true); //Use the HTTP POST method to send data to server

    postReview.setRequestHeader("Content-Type", "application/json");
    postReview.onload = function () {
        fetchReviews(); // fetch all comments again so that the web page can have updated comments.     
    };
    // Convert the data in Comment object to JSON format before sending to the server.
    postReview.send(JSON.stringify(review));
}

//This function allows the user to mouse hover the black and white popcorn
//so that it will turn to a colored version when hovered
function rateIt(element) {
    var num = element.getAttribute("value");
    var classname = element.getAttribute("class");
    var popcorns = document.getElementsByClassName(classname);
    var classTarget = "." + classname;

    // This is another way of writing 'for' loop, which initialises the 
    // popcorn images to use black and white.
    for (let star of star) {
        popcorn.setAttribute("src", starBWImage);
    }
    changeStarImage(num, classTarget);
}

// This function sets the rating and coloured images based on the value of the image tag when  
// the mouse cursor hovers over the popcorn image.
function changeStarImage(num, classTarget) {
    switch (eval(num)) {
        case 1:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", starImage);
            rating = 1;
            break;
        case 2:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='2']").setAttribute("src", starImage);
            rating = 2;
            break;
        case 3:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='2']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='3']").setAttribute("src", starImage);
            rating = 3;
            break;
        case 4:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='2']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='3']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='4']").setAttribute("src", starImage);
            rating = 4;
            break;
        case 5:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='2']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='3']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='4']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='5']").setAttribute("src", starImage);
            rating = 5;
            break;
    }
}


//This function will hide the existing modal and present a modal with the selected comment
//so that the user can attempt to change the username, rating or movie review
function editComment(element) {
    var item = element.getAttribute("item");

    currentIndex = item;

    document.getElementById("editnickname").value = comment_array[item].username;
    document.getElementById("edituserComments").value = comment_array[item].review;
    console.log(comment_array[item].rating);
    displayColorPopcorn('editpop', comment_array[item].rating);
}

//This function displayS the correct number of colored popcorn
//based on the movie rating that is given in the user comment
function displayColorStar(classname, num) {
    var pop = document.getElementsByClassName(classname);
    var classTarget = "." + classname;
    for (let p of pop) {
        p.setAttribute("src", starBWImage);
    }
    changeStarImage(num, classTarget);
}

//This function sends the Comment data to the server for updating
function updateReview() {
    var response = confirm("Are you sure you want to update this review?");
    if (response == true) {
        //var commentModal = document.getElementById("editCommentModal");
        var edit_review_url = review_url + "/" + review_array[currentIndex]._id;
        var updateReview = new XMLHttpRequest(); // new HttpRequest instance to send request to server
        //commentModal.hide();
        updateReview.open("PUT", edit_review_url, true); //The HTTP method called 'PUT' is used here as we are updating data
        updateReview.setRequestHeader("Content-Type", "application/json");
        review_array[currentIndex].username = document.getElementById("editnickname").value;
        review_array[currentIndex].review = document.getElementById("edituserComments").value;
        review_array[currentIndex].rating = rating;
        updateReview.onload = function () {
            fetchReviews();
        };
        updateReview.send(JSON.stringify(review_array[currentIndex]));
    }
}

//This function deletes the selected comment in a specific movie
function deleteReview(element) {
    var response = confirm("Are you sure you want to delete this review?");

    if (response == true) {
        var item = element.getAttribute("item"); //get the current item
        var delete_review_url = review_url + "/" + review_array[item]._id;
        var eraseReview = new XMLHttpRequest();
        eraseReview.open("DELETE", delete_review_url, true);
        eraseReview.onload = function () {
            fetchComments();
        };
        eraseReview.send();
    }
}


//This function is to display all the comments of that movie
//whenever the user click on the "comment" button
// function showRestaurantReviews(element) {
//     document.getElementById("emptyReview").innerHTML = "No review yet. Create one now";
//     var item = element.getAttribute("item");
//     currentIndex = item;

//     document.getElementById("review").textContent = "Review for " + restaurant_array[item].restaurant_id;
//     document.getElementById("reviewBody").textContent = "";

//     for (var i = 0; i < review_array.length; i++) {
//         if (review_array[i].restaurant_id.trim() == restaurant_array[item].restaurant_id.trim()) {
//             document.getElementById("emptyReview").innerHTML = "";
//             selectedRestaurantId = restaurant_array[item].restaurant_id;
//             star = "";
//             var html = '<div class="text-center" style="width:100%;">                                                           \
//                             <div class="card">                                                                                  \
//                                 <div class="card-body">                                                                         \
//                                     <p class="card-text" id="rating' + i + '">' + review_array[i].reviewContent + "</p>               \
//                                     <small>by " + review_array[i].username + " @ " + review_array[i].datePosted + "</small>   \
//                                 </div>                                                                                          \
//                             </div>                                                                                              \
//                         </div>";
//             document.getElementById("reviewBody").insertAdjacentHTML('beforeend', html);

//             var star = "";
//             for (var j = 0; j < review_array[i].rating; j++) {
//                 console.log(i);
//                 star += "<img src='images/star.png' style='width:50px' />";
//             }
//             star += "<img src='images/delete.png' class='edit' data-dismiss='modal' item='" + i + "' onClick='deleteReview(this)' />";
//             star += "<img src='images/edit.png' class='edit' data-toggle='modal' data-target='#editReviewModal' data-dismiss='modal' item='"
// 		 + i + "' onClick='editComment(this)' />";
//             document.getElementById("rating" + i).insertAdjacentHTML('beforebegin', star + "<br/>");
//         }
//     }
// }

