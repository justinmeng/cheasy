// Edamam API Info/Variables
var baseURL = "https://api.edamam.com/search?";
var appID = "e17dfb00";
var key = "b494a4fb8b7b191f85128459431bfc6e";
var sample = "https://api.edamam.com/search?q=chicken&app_id=e17dfb00&app_key=b494a4fb8b7b191f85128459431bfc6e";



$(document).ready(function () {
	var urlQuery= getUrlVars();
	var searchKey = urlQuery["category"];
	var params = {q: searchKey, app_id: appID, app_key: key};
	var queries = $.param(params);
	var searchURL = baseURL + queries;

	$.ajax({
			url: searchURL,
	    	dataType: 'jsonp',
	    	success: function(results){

	    		var recipes = results["hits"];
	    		for (recipeIndex in recipes) {
	    			var food = recipes[recipeIndex]["recipe"];
					var foodName = food["label"];
					var foodImage = food["image"];
	    			
					var li = generateFoodImageLI(foodName, foodImage);
					$("#recipe-container").append(li);

	    		}

	    	}
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
	//var result = '<li class="col-md-6"><p id="image-block">Pastas</p><a href="Recipes.html?category=pastas" id="pastas" class="category-button"><img src="images/pastas.png" alt="Pasta"></a></li>';
	var result = '<li class="col-md-6"><p id="image-block">' + foodName +  
	'</p><a href="#"><img src="' + foodImage + '" alt="' + foodName + '"></a></li>';
	
	return result;
}