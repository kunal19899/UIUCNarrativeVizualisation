document.addEventListener("DOMContentLoaded", function() {
  // Load the CSV file using D3.js
  d3.csv("insurance.csv").then(function(data) {
  console.log(data);
  // Set up chart parameters
  const width = 800;
  const height = 500;
  const margin = { top: 50, right: 50, bottom: 50, left: 80 };

  // Group the data by age and calculate the average charges
  const averageData = d3.rollups(
    data,
    v => d3.mean(v, d => d.charges),
    d => d.age
  );

  // Convert the averageData array to objects with age and average_cost properties
  const averageDataset = averageData.map(([age, average_cost]) => ({
    age: age,
    average_cost: average_cost
  }));

  // Create an SVG element with margins
  const svg = d3.select("svg")
    .attr("width", width + 2*margin.left)
    .attr("height", height+ 2*margin.top);

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Create a scale for the x-axis (age)
  const xScale = d3.scaleLinear()
    .domain([15, 70]) // Use the extent of age values as the domain
    .range([0, innerWidth]);

  // Create a scale for the y-axis (insurance cost)
  const yScale = d3.scaleLinear()
    .domain([0, 27000])//d3.max(averageDataset, d => d.average_cost)]) // Use the maximum insurance_cost value as the domain
    .range([innerHeight, 0]);

  // Create a group (g) element to hold the chart
  const chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // Create the circles (data points) for the scatter plot
  const circles = chartGroup.selectAll(".circle")
    .data(averageDataset)
    .enter()
    .append("circle")
    .attr("class", "circle")
    .attr("cx", d => xScale(d.age))
    .attr("cy", d => yScale(d.average_cost))
    .attr("r", 5) // Set the circle radius

  // Create x-axis
  const xAxis = d3.axisBottom(xScale);
  chartGroup.append("g")
    .attr("transform", `translate(0, ${innerHeight})`)
    .call(xAxis);

  // Create y-axis
  const yAxis = d3.axisLeft(yScale);
  chartGroup.append("g")
    .call(yAxis);

  // Add labels for the axes
  svg.append("text")
    .attr("transform", `translate(${width / 2}, ${height})`)
    .style("text-anchor", "middle")
    .text("Age of Insuree");

  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0)
    .attr("x", 0 - height / 2)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Average Insurance Charges");
    
  })
  .catch(function(error) {
    // If there's an error loading the data, handle it here
    console.error("Error loading data:", error);
  });
});