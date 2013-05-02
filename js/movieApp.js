$(document).ready(function(){
	$('form').on('submit', function(event){
    event.preventDefault();
    $.ajax({
      url: 'http://www.omdbapi.com/?t=True%20Grit&y=1969',
      method: 'get',
      // data: {todo_item: item},
      dataType: 'jsonp',
			success: function(movie){
     		console.log(movie)
			}
    });
  });
});