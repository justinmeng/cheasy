// Edamam API Info/Variables
var baseURL = "https://api.edamam.com/search?";
var appID = "e17dfb00";
var key = "b494a4fb8b7b191f85128459431bfc6e";
var sample = "https://api.edamam.com/search?q=chicken&app_id=e17dfb00&app_key=b494a4fb8b7b191f85128459431bfc6e";


// Target API Key Info/Variables
var targetBaseURL = "https://api.target.com";
var targetGetBase = "/items/v3/";
var targetKey = "1Kfdqvy6wHmvJ4LDyAVOl7saCBoKHcSb";


//var foodList = [];
// key = foodName, value = recipeObject
var foodDict = {};

// ingredients.json
var ingredientsJsonDict;



$(document).ready(function () {
	var urlQuery= getUrlVars();
	var searchKey = urlQuery["category"];
	var params = {q: searchKey, app_id: appID, app_key: key};
	var queries = $.param(params);
	var searchURL = baseURL + queries;


	// Load all the recipes
	$.ajax({
			async: false,
			url: searchURL,
	    	dataType: 'jsonp',
	    	success: function(results){

	    		var recipes = results["hits"];
	    		for (recipeIndex in recipes) {
	    			var food = recipes[recipeIndex]["recipe"];
					var foodName = food["label"];
					var foodImage = food["image"];
					foodDict[foodName] = food;

					var li = generateFoodImageLI(foodName, foodImage);
					$("#recipe-container").append(li);

	    		}
	    	}
	});
	
	
	
	
	// Whenever the image recipes are clicked, show the calories mang
	$(document).on('click', '.recipe', function() {
		createFoodFactsContainer();
		generateContents(this.id)
	});


});


// Read a page's GET URL variables and return them as an associative array.
function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

// Generates a <li> string of a given food's name and image
function generateFoodImageLI(foodName, foodImage) {
	var result = '<li class="col-md-6 text-center pagination-centered"><p id="image-block">' + foodName +
	'</p><a class="recipe" id="' + foodName + '" href="#food-facts"><img style="padding-bottom:22px;" src="' + foodImage + '" alt="' + foodName + '"></a></li>';

	return result;
}





/************* Food Facts Container Stuff ****************/
function createFoodFactsContainer() {
	$("#food-facts").remove();
	$("body").append('<div class="container-fluid background-1" id="food-facts"></div>');
};


// Generates all the contents for the food
function generateContents(foodName) {
	var food = foodDict[foodName];
	
	
	var nameText = '<h1 class="text-center">' + foodName + '</h1>';
	var foodURL = '<h5 class="text-center"><a target="_blank" href="' + food["url"] + '">' + food["url"] +  '</a></h5>';
	var imgText = '<img style="padding-top:30px;float:left" src="' + food["image"] + '" alt="' + foodName + '">';
	
	// Nutrients
	var totalNutrients = food["totalNutrients"];
	var calories = parseInt(food["calories"]) + " Calories";
	var fat = parseInt(totalNutrients["FAT"]["quantity"]) + totalNutrients["FAT"]["unit"] + " Fat";
	var carbs = parseInt(totalNutrients["CHOCDF"]["quantity"]) + totalNutrients["CHOCDF"]["unit"] + " Carbohydrates"
	var protein = parseInt(totalNutrients["PROCNT"]["quantity"]) + totalNutrients["PROCNT"]["unit"] + " Protein";
	var nutrientText = '<br/><br/><br/><div class="nutrient-font text-center">' + calories + "<br/>" + fat + "<br/>" + carbs + "<br/>" + protein + "<br/></div>";
	
	$("#food-facts").append(nameText + foodURL + imgText + nutrientText + '<br/><br/><br/><br/><br/><br/><br/>');
	
	
	// Ingredients
	$("#food-facts").append('<h2>Ingredients</h2>');
	var ingredients = food["ingredients"];
	var ingredientText = '<div class="col-md-5"><ul>'
	for (ingredientIndex in ingredients) {
		var currentIngredient = ingredients[ingredientIndex];
		ingredientText += '<li>' + currentIngredient["quantity"] + " " + currentIngredient["measure"]
						+ " " + currentIngredient["food"] + "</li></br>";
	}
	ingredientText += '</ul></div>';
	$("#food-facts").append(ingredientText);
	
	
}




// Using Target API, retrieve price of ingredient through
// specified DPCI number
function getPriceIngredient(ingredientDPCI) {
	var params = {key: targetKey, product_id: ingredientDPCI.toLowerCase(),
				  id_type: "dpci", fields: "pricing"};
	var queries = $.param(params);
	var searchURL = targetBaseURL + targetGetBase + "?" + queries;

	var finalPrice = "";
	
	
	
	$.ajax({
			type: "GET",
			url: searchURL,
			async: false,
	    	dataType: 'jsonp',
	    	success: function(results){
				finalPrice = results["product_composite_response"]["items"][0]["online_price"]["current_price"];
				$("div").append(finalPrice);
				return finalPrice;
	    	}
	});
	
	return finalPrice;
}


//
// function ingredientToDPCI(ingredient) {
// 	var DPCI = "";
// 	$.ajax({
// 			type: "GET",
// 			url: "/ingredients.json",
// 			async: false,
// 	    	dataType: 'jsonp',
// 	    	success: function(results){
// 				DPCI = results[ingredient];
// 				return finalPrice;
// 	    	}
// 	});
//
// 	return DPCI;
// }














