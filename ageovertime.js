document.addEventListener("DOMContentLoaded", function() {
  // Load the CSV file using D3.js
  d3.csv("data1.csv")
    .then(function(data) {
      // Once the data is loaded, you can work with it here

      // For demonstration purposes, let's log the data to the console
      console.log(data);
    })
    .catch(function(error) {
      // If there's an error loading the data, handle it here
      console.error("Error loading data:", error);
    });
});