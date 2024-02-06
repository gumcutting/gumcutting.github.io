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




// Function to fetch and display OpenWeatherMap data
function fetchWeatherData() {
  var apiKey = '735357a3477a903cc39700f1b5f1d88e';
  var city = 'Crafers, AU ';  // You can change the city as needed
  var units = 'metric';   // You can change the units (metric, imperial, standard)

  var weatherApiURL = `https://
api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;

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

// Display weather information
      var weatherElement = document.getElementById('weather-info');
      weatherElement.innerHTML = `
        <h2>Current Weather in ${city}</h2>
        <p>Temperature: ${temperature}°C</p>
        <p>Description: ${description}</p>
      `;
    })
    .catch(error => {
      console.error('Error fetching OpenWeatherMap data:', error);
      var weatherElement = document.getElementById('weather-info');
      weatherElement.innerHTML = '<p>Error fetching weather data</p>';
    });
}
// Load OpenWeatherMap data when the page is loaded
fetchWeatherData();



   document.addEventListener('DOMContentLoaded', function () {
    // Hide all button-list-item1 to button-list-item7 elements initially
    var buttons1 = document.querySelectorAll('.button-list-item1');
    var buttons2 = document.querySelectorAll('.button-list-item2');
    var buttons3 = document.querySelectorAll('.button-list-item3');
    var buttons4 = document.querySelectorAll('.button-list-item4');
    var buttons5 = document.querySelectorAll('.button-list-item5');
	var buttons6 = document.querySelectorAll('.button-list-item6');
	var buttons7 = document.querySelectorAll('.button-list-item7');
	var buttons8= document.querySelectorAll('.button-list-item8');

    hideButtons(buttons1);
    hideButtons(buttons2);
    hideButtons(buttons3);
    hideButtons(buttons4);
    hideButtons(buttons5);
	hideButtons(buttons6);
	hideButtons(buttons7);
	hideButtons(buttons8);
});

function hideButtons(buttons) {
    buttons.forEach(function (button) {
        button.style.display = 'none';
    });
}

function toggleButtons(buttonClass) {
    // Get all buttons with the specified class
    var buttons = document.querySelectorAll(buttonClass);

    // Hide all buttons of other classes
    hideButtons(document.querySelectorAll('.button-list-item1'));
    hideButtons(document.querySelectorAll('.button-list-item2'));
    hideButtons(document.querySelectorAll('.button-list-item3'));
    hideButtons(document.querySelectorAll('.button-list-item4'));
    hideButtons(document.querySelectorAll('.button-list-item5'));
	hideButtons(document.querySelectorAll('.button-list-item6'));
	hideButtons(document.querySelectorAll('.button-list-item7'));
	hideButtons(document.querySelectorAll('.button-list-item8'));

    // Loop through buttons and toggle their visibility
    buttons.forEach(function (button) {
        button.style.display = (button.style.display === 'none') ? 'block' : 'none';
    });
}



// search bar test

  document.addEventListener("DOMContentLoaded", function () {
      // Get the search bar and search results container
      var searchBar = document.getElementById("search-bar");
      var searchResults = document.getElementById("search-results");

      // Add an event listener for the input event on the search bar
      searchBar.addEventListener("input", function () {
        // Get the search query from the input
        var query = searchBar.value.toLowerCase();

        // Clear previous search results
        searchResults.innerHTML = "";

        // Check if the search bar is not empty
        if (query.trim() !== "") {
          // Check each link in your content and display matching results
          var links = document.querySelectorAll('.button-link');
          links.forEach(function (link) {
            var linkText = link.textContent.toLowerCase();
            if (linkText.includes(query)) {
              // Create a new result element and append it to the results container
              var resultElement = document.createElement("div");
              resultElement.className = "search-result";
              
              // Create a clickable link within the result element
              var linkElement = document.createElement("a");
              linkElement.href = link.getAttribute("href"); // Get the original link href
              linkElement.textContent = linkText;
              
              // Append the clickable link to the result element
              resultElement.appendChild(linkElement);
              
              // Append the result element to the results container
              searchResults.appendChild(resultElement);
            }
          });
        }
      });
    });







