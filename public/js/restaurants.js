//This function is to call the restaurant api and get all the restaurants
function getRestaurantData() {
    var request = new XMLHttpRequest();
    request.open('GET', restaurant_url, true);

    //This function will be called when data returns from the web api
    request.onload = function () {
        //get all the restaurant records into our movie array
        restaurant_array = JSON.parse(request.responseText);

        //call the function so as to display all restaurant
        displayRestaurants(cuisine);
    };
    //This command starts the calling of the restaurant web api
    request.send();
}
//This function is to display the restaurants
function displayRestaurants(cuisine) {
    var table = document.getElementById("restaurantsTable");
    var restaurantCount = 0;
    var message = "";

    table.innerHTML = "";
    const totalRestaurants = restaurant_array.length;
    for (var count = 0; count < totalRestaurants; count++) {
        if (cuisine === restaurant_array[count].cuisine) {
            var thumbnail = restaurant_array[count].thumbnail;
            var title = restaurant_array[count].restaurantName;       
            var cell = generateRestaurantHtml(restaurant_array[count].restaurant_id, thumbnail, title, count);
            table.insertAdjacentHTML('beforeend', cell);
            restaurantCount++;
        }
        else if (cuisine === "All") {
            var thumbnail = restaurant_array[count].thumbnail;
            var title = restaurant_array[count].restaurantName;          
            var cell = generateRestaurantHtml(restaurant_array[count].restaurant_id, thumbnail, title, count);
            table.insertAdjacentHTML('beforeend', cell);
            restaurantCount++;
        }
    }
}

function generateRestaurantHtml(restaurant_id, thumbnail, title, count) {
    // console.log("restaurant id is" + restaurant_id);
    var cell = '<div class="col-md-3" style="float: none; margin: 0 auto;">' +
        '<div class="flip-container" >' +
        '<div class="flipper">' +
        '<div class="front">' +
        '<a id="movies" href="#" data-toggle="modal" data-target="#restaurantModal" item=' + count + '>' +
        "<img src='" + thumbnail + "' width='250px'/>" +
        '</a>' +
        '</div>' +
        '<div class="back">' +
        '<div class="bg-dark mystyle text-center">' +
        '<span><br>' + title + '</span><br>' +
        '<button href="#" data-toggle="modal" data-target="#restaurantModal" item="' + count + '" type="button" class="btn btn-sm" onClick="showRestaurantDetails(this)" >See More</button> ' +
        '<button href="#" data-toggle="modal" data-target="#reviewModal" item="' + count + '" type="button" class="btn btn-sm" onClick="fetchReviews(' + restaurant_id + ')" >Reviews</button>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
    return cell;
}

function displayChinese() {
    event.preventDefault();
    cuisine = "Chinese";
    displayRestaurants(cuisine);
}

function displayJapanese() {
    event.preventDefault();
    cuisine = "Japanese";
    displayRestaurants(cuisine);

}

function displayWestern() {
    event.preventDefault();
    cuisine = "Western";
    displayRestaurants(cuisine);

}

function displayVegetarian() {
    event.preventDefault();
    cuisine = "Vegetarian";
    displayRestaurants(cuisine);

}

function displayAllRestaurants() {
    cuisine = "All"
    getRestaurantData();
}

//This function is to display the individual restaurant details
//whenever the user clicks on "See More"
function showRestaurantDetails(element) {
    var item = element.getAttribute("item");
    currentIndex = item;
    document.getElementById("restaurantName").textContent = restaurant_array[item].restaurantName;
    document.getElementById("address").textContent = restaurant_array[item].address;
    document.getElementById("openingHours1").textContent = restaurant_array[item].openingHours1;
    document.getElementById("openingHours2").textContent = restaurant_array[item].openingHours2;
    document.getElementById("phoneNumber").textContent = restaurant_array[item].phoneNumber;
    document.getElementById("rating").textContent = restaurant_array[item].rating;
    document.getElementById("restaurantMapUrl").textContent = restaurant_array[item].restaurantMapUrl;
    document.getElementById("cuisine").textContent = restaurant_array[item].cuisine;
    document.getElementById("thumb").src = restaurant_array[item].thumb;
}
