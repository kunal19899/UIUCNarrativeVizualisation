// Define the scenes and parameters
const scenes = [
    { category: "A" },
    { category: "B" },
    { category: "C" },
  ];
  
let currentScene = 0;

// Function to draw the visualization for Scene A
function drawSceneA(data) {
    // Your visualization code for Scene A here
    // Use data.filter(d => d.category === "A") to filter the data
  }
  
  // Function to draw the visualization for Scene B
  function drawSceneB(data) {
    // Your visualization code for Scene B here
    // Use data.filter(d => d.category === "B") to filter the data
  }
  
  // Function to draw the visualization for Scene C
  function drawSceneC(data) {
    // Your visualization code for Scene C here
    // Use data.filter(d => d.category === "C") to filter the data
  }

  function updateScene() {
    // Filter data based on the current scene's category
    const filteredData = data.filter(d => d.category === scenes[currentScene].category);
  
    // Clear the SVG container
    d3.select("#visualization").html("");
  
    // Call the appropriate draw function based on the current scene
    switch (currentScene) {
      case 0:
        drawSceneA(filteredData);
        break;
      case 1:
        drawSceneB(filteredData);
        break;
      case 2:
        drawSceneC(filteredData);
        break;
      // Add more cases for additional scenes if needed
    }
  }

  // Event listener for the "Next" button
d3.select("#nextButton").on("click", () => {
    currentScene = (currentScene + 1) % scenes.length;
    updateScene();
  });

  // Load data and render the initial scene
d3.csv("data.csv").then((loadedData) => {
    data = loadedData;
  
    // Call the updateScene() function to render the first scene
    updateScene();
  });

  // Example annotation for Scene A
d3.select("#annotation").html("This is Scene A. It shows data for category A.");

// Example annotation for Scene B
d3.select("#annotation").html("This is Scene B. It shows data for category B.");

// Example annotation for Scene C
d3.select("#annotation").html("This is Scene C. It shows data for category C.");

    
  