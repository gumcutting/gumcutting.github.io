// Function to fetch and display RSS feed items
function fetchRssFeed() {
  var rssFeedURL = 'https://data.eso.sa.gov.au/prod/cfs/criimson/cfs_current_incidents.xml'; // Replace with the actual RSS feed URL

  fetch(rssFeedURL)
    .then(response => response.text())
    .then(data => {
      var parser = new DOMParser();
      var xmlDoc = parser.parseFromString(data, 'text/xml');

      // Extract items from the RSS feed
      var items = xmlDoc.querySelectorAll('item');

      // Display each item
      var rssFeedElement = document.getElementById('rss-feed');
      items.forEach(item => {
        var title = item.querySelector('title').textContent;
        var link = item.querySelector('link').textContent;
        var description = item.querySelector('description').textContent;

        var listItem = document.createElement('li');
        listItem.innerHTML = `
          <h3>${title}</h3>
          <p>${description}</p>
          <a href="${link}" target="_blank">Read more</a>
        `;

        rssFeedElement.appendChild(listItem);
      });
    })
    .catch(error => {
      console.error('Error fetching RSS feed:', error);
      var rssFeedElement = document.getElementById('rss-feed');
      rssFeedElement.innerHTML = '<p>Error fetching RSS feed</p>';
    });
}
// Load RSS feed items when the page is loaded
fetchRssFeed();

// Function to fetch and display BOM RSS feed items
function fetchBomRssFeed() {
  var rssFeedURL = 'https://api.rss2json.com/v1/api.json?rss_url=http://www.bom.gov.au/fwo/IDZ00064.warnings_land_sa.xml';

  fetch(rssFeedURL)
    .then(response => response.json())
    .then(data => {
      // Log the fetched data to the console for debugging
      console.log('Fetched data:', data);

      // Extract items from the converted JSON response
      var items = data.items;

      // Display each item
      var rssFeedElement = document.getElementById('rss-feed2');
      items.forEach(item => {
        var title = item.title;
        var link = item.link;
        var description = item.description;

        var listItem = document.createElement('li');
        listItem.innerHTML = `
          <h3>${title}</h3>
          <p>${description}</p>
          <a href="${link}" target="_blank">Read more</a>
        `;

        rssFeedElement.appendChild(listItem);
      });
    })
    .catch(error => {
      // Log the error to the console for debugging
      console.error('Error fetching BOM RSS feed:', error);
      var rssFeedElement = document.getElementById('rss-feed2');
      rssFeedElement.innerHTML = '<p>Error fetching BOM RSS feed</p>';
    });
}

// Load BOM RSS feed items when the page is loaded
fetchBomRssFeed();


















// Function to fetch weather data for a specific city and update the specified element
function fetchWeatherDataForCity(cityName, apiKey, elementId) {
  var units = 'metric';   

  var weatherApiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${units}&appid=${apiKey}`;

  fetch(weatherApiURL)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      var temperature = data.main.temp;
      var description = data.weather[0].description;
	  var windSpeed = data.wind.speed;
      // Display weather information
      var weatherElement = document.getElementById(elementId);
      weatherElement.innerHTML = `
        <h2>Current Weather in ${cityName}</h2>
        <p>Temperature: ${temperature}°C</p>
        <p>Description: ${description}</p>
		 <p>Wind Speed: ${windSpeed} m/s</p>
      `;
    })
    .catch(error => {
      console.error(`Error fetching OpenWeatherMap data for ${cityName}:`, error);
      var weatherElement = document.getElementById(elementId);
      weatherElement.innerHTML = '<p>Error fetching weather data</p>';
    });
}

// Load OpenWeatherMap data for each city when the page is loaded
function fetchWeatherForMultipleCities() {
  var apiKey = '17ca4422130bda1d139f00f28401ad8d'; // Your OpenWeatherMap API key
  var cities = ['adelaide hills, AU', 'Barossa, AU', 'crafers, AU', 'Strathalbyn, AU','McLaren Vale, AU','Montacute, AU' ]; // Your list of cities
  var elementIds = ['adelaide-hills-weather-info', 'barossa-weather-info', 'crafers-weather-info', 'strathalbyn-weather-info', 'mclaren-vale-weather-info', 'montacute-weather-info']; // IDs of corresponding HTML elements

  cities.forEach((city, index) => {
    fetchWeatherDataForCity(city, apiKey, elementIds[index]);
  });
}

// Call the function to load weather data for multiple cities when the page is loaded
fetchWeatherForMultipleCities();




























// Hide buttons initially
document.addEventListener('DOMContentLoaded', function () {
  // Hide buttons initially
  hideButtons('.button-list-item1');
  hideButtons('.button-list-item2');
  hideButtons('.button-list-item3');
  hideButtons('.button-list-item4');
  hideButtons('.button-list-item5');
  hideButtons('.button-list-item6');
  hideButtons('.button-list-item7');
  hideButtons('.button-list-item8');

  // Add event listener to close button lists when clicking outside of buttons
  document.addEventListener('click', function (event) {
    console.log('Clicked on:', event.target.tagName);
    var isButton = event.target.tagName === 'BUTTON';
    if (!isButton) {
      console.log('Clicked outside of buttons');
      hideButtons('.button-list-item1');
      hideButtons('.button-list-item2');
      hideButtons('.button-list-item3');
      hideButtons('.button-list-item4');
      hideButtons('.button-list-item5');
      hideButtons('.button-list-item6');
      hideButtons('.button-list-item7');
      hideButtons('.button-list-item8');
    }
  });
});

function hideButtons(buttonClass) {
  var buttons = document.querySelectorAll(buttonClass);
  buttons.forEach(function (button) {
    button.style.display = 'none';
  });
}





function toggleButtons(buttonClass) {
    // Check if the clicked button's list is already open
    var isAlreadyOpen = false;
    var buttons = document.querySelectorAll(buttonClass);
    buttons.forEach(function (button) {
        if (button.style.display === 'block') {
            isAlreadyOpen = true;
        }
    });

    // Close all lists initially
    hideButtons('.button-list-item1');
    hideButtons('.button-list-item2');
    hideButtons('.button-list-item3');
    hideButtons('.button-list-item4');
    hideButtons('.button-list-item5');
    hideButtons('.button-list-item6');
    hideButtons('.button-list-item7');
    hideButtons('.button-list-item8');

    // If the clicked button's list is already open, close it
    if (isAlreadyOpen) {
        hideButtons(buttonClass);
    } else {
       


	   // Open the clicked button's list
        var buttonsToOpen = document.querySelectorAll(buttonClass);
        buttonsToOpen.forEach(function (button) {
            button.style.display = 'block';
        });
    }
}





// Function to handle search bar functionality
document.addEventListener("DOMContentLoaded", function () {
  var searchBar = document.getElementById("search-bar");
  var searchResults = document.getElementById("search-results");

  searchBar.addEventListener("input", function () {
    var query = searchBar.value.toLowerCase();
    searchResults.innerHTML = "";

    if (query.trim() !== "") {
      var links = document.querySelectorAll('.button-link');
      links.forEach(function (link) {
        var linkText = link.textContent.toLowerCase();
        if (linkText.includes(query)) {
          var resultElement = document.createElement("div");
          resultElement.className = "search-result";
          var linkElement = document.createElement("a");
          linkElement.href = link.getAttribute("href");
          linkElement.textContent = linkText;
          resultElement.appendChild(linkElement);
          searchResults.appendChild(resultElement);
        }
      });
    }
  });
});
document.addEventListener("DOMContentLoaded", function () {
    var searchBar = document.getElementById("search-bar");
    var searchResults = document.getElementById("search-results");

    searchBar.addEventListener("input", function () {
        var query = searchBar.value.trim().toLowerCase();

        searchResults.innerHTML = ""; // Clear previous search results

        if (query !== "") {
            var links = document.querySelectorAll('.button-link');
            var matchingResults = [];
            links.forEach(function (link) {
                var tags = link.parentNode.getAttribute("data-tags");
                var linkText = link.textContent.toLowerCase();
                // Split the query into individual terms
                var terms = query.split(" ");
                // Check if all terms are present in the link text or tags
                var matchFound = terms.every(function (term) {
                    return linkText.includes(term) || (tags && tags.includes(term));
                });
                if (matchFound) {
                    matchingResults.push(link);
                }
            });

            if (matchingResults.length > 0) {
                matchingResults.forEach(function (result) {
                    var resultElement = document.createElement("div");
                    resultElement.className = "search-result";
                    var clonedLink = result.cloneNode(true);
                    resultElement.appendChild(clonedLink);
                    searchResults.appendChild(resultElement);
                });
            } else {
                searchResults.innerHTML = "<p>No matching results found.</p>";
            }
        } else {
            searchResults.innerHTML = ""; // Clear search results if the query is empty
        }
    });
});










