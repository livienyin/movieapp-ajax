function getMovieData(title) {
  $.ajax({
    url: 'http://www.omdbapi.com/?t=' + encodeURIComponent(title),
    method: 'get',
    dataType: 'json',
    success: function(movie){
      createDetailElement(movie)
    }
  });    
}

function createDetailElement(movie){
  var title = movie.Title;
  var year = movie.Year;
  var plot = movie.Plot;
  var headerElement = $('<h2 />');
  var paraElement = $('<p>');
  headerElement.append(title + ' ' + year);
  headerElement.appendTo('#movie_data');
  paraElement.append(plot);
  paraElement.insertAfter(headerElement);
}

function createListItem(movieData) {
  var listElement = $('<li />');
  listElement.attr('class', 'searchItem');
  listElement.append(movieData.Title);
  listElement.on('click', function (event) { getMovieData(movieData.Title); })
  $('#results').append(listElement);
  listElement.hide().fadeIn();
}

function createListItems(searchResults) {
  $('#results').html('');
  if (!searchResults.Search) {return;}
  for (var i=0; i<searchResults.Search.length; i++) {
    createListItem(searchResults.Search[i])
  }
}

$(document).ready(function(){

  $('#title_search').keyup(function(){
    var titleValue = $('#title_search').val();
    if (titleValue !== '') {
      $.ajax({
        url: 'http://www.omdbapi.com/?s=' + encodeURIComponent(titleValue),
        method: 'get',
        dataType: 'json',
        success: function(searchResults){
          createListItems(searchResults);
        }
      });
    } else {
      $('#results').html('');
    }
    return false;
  });

  $('form').on('submit', function(event){
    event.preventDefault();
    var titleValue = $('#title_search').val();
    $.ajax({
      url: 'http://www.omdbapi.com/?s=' + encodeURIComponent(titleValue),
      method: 'get',
      dataType: 'jsonp',
      success: function(movie){
        console.log(movie);
      }
    });
  });
});
