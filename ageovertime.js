document.addEventListener("DOMContentLoaded", function() {
  // Load the CSV file using D3.js
  d3.csv("insurance.csv").then(function(data) {
    
  // Set up chart parameters
  const width = 600;
  const height = 400;
  const margin = { top: 20, right: 30, bottom: 30, left: 40 };

  // Create an SVG element with margins
  const svg = d3.select("#chart-container")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Create a scale for the x-axis (age)
  const xScale = d3.scaleLinear()
    .domain(d3.extent(dataset, d => d.age)) // Use the extent of age values as the domain
    .range([0, innerWidth]);

  // Create a scale for the y-axis (insurance cost)
  const yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset, d => d.insurance_cost)]) // Use the maximum insurance_cost value as the domain
    .range([innerHeight, 0]);

  // Create a group (g) element to hold the chart
  const chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // Create the circles (data points) for the scatter plot
  chartGroup.selectAll(".circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("class", "circle")
    .attr("cx", d => xScale(d.age))
    .attr("cy", d => yScale(d.insurance_cost))
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
    .attr("transform", `translate(${width / 2}, ${height - margin.bottom})`)
    .style("text-anchor", "middle")
    .text("Age");

  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0)
    .attr("x", 0 - height / 2)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Insurance Cost");
    console.log(data);
  })
  .catch(function(error) {
    // If there's an error loading the data, handle it here
    console.error("Error loading data:", error);
  });
});