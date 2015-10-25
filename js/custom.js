

$(document).ready(function () {

	// Applies the search button functionality
	$("#search-button").click(function() {
		var value = $("#search-field").val();
		window.location.href = "http://www.google.com/search?q=" + value;
	});

});
