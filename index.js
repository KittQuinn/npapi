'use strict';

const apiKey = 'fhN3PuGYvpGY6oK7olMKRBDDvzAKYOg8kIMcGlRs';
const parksURL = 'https://developer.nps.gov/api/v1/alerts';

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

function displayResults(responseJson) {
    // if there are previous results, remove them
    console.log(responseJson);
    $('#results-list').empty();
    // iterate through the items array
    for (let i = 0; i < responseJson.data.length; i++){
      // for each video object in the items 
      //array, add a list item to the results 
      //list with the video title, description,
      //and thumbnail
      $('#results-list').append(
        `<li><h3>${responseJson.data[i].title}</h3>
        <p>${responseJson.data[i].description}</p>
        <p>${responseJson.data[i].url}</p>
        </li>`
      )};
    //display the results section  
    $('#results').removeClass('hidden');
  };


function getParks(query, maxResults) {
    const params = {
        //api_key: apiKey,
        stateCode: query,
        limit: maxResults,
    };

    const queryString = formatQueryParams(params)
    const url = parksURL + '?' + queryString;

    console.log(url);

    fetch(url, {
      headers: {
        'X-Api-Key': `${apiKey}`, 
      }
    })
    
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    }) 
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });

}






function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const stateSearch = $('#js-state-search').val();
        const maxResults = $('#js-max-results').val();
        getParks(stateSearch, maxResults);
    })
    
}

$(watchForm);