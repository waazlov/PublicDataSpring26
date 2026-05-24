// Set chart dimensions
const width = 950;
const height = 500;
const margin = {
    top: 70,
    right: 190,
    bottom: 70,
    left: 70
};

// Create labels for each temperature measure
const measureLabels = {
    tavg: "Avg Temp",
    tmax: "Avg Max Temp",
    tmin: "Avg Min Temp"
};

// Create a function used by the HTML input event
function showSelectedMeasure(value) {
    document.getElementById("selectedMeasure").innerText = "Currently showing: " + measureLabels[value];
}

// Load the external CSV file
d3.csv("data/lyneham_temperature_processed.csv").then(data => {

    // Parse years as dates and convert temperatures to numbers
    const parseYear = d3.timeParse("%Y");

    data.forEach(d => {
        d.year = parseYear(d.year);
        d.tavg = +d.tavg;
        d.tmax = +d.tmax;
        d.tmin = +d.tmin;
    });

    // Create the SVG container
    const svg = d3.select("body")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    // Create the x-scale for years
    const xScale = d3.scaleTime()
        .domain(d3.extent(data, d => d.year))
        .range([margin.left, width - margin.right]);

    // Create the y-scale for all temperature values
    const yScale = d3.scaleLinear()
        .domain([
            d3.min(data, d => d.tmin) - 1,
            d3.max(data, d => d.tmax) + 1
        ])
        .range([height - margin.bottom, margin.top]);

    // Create a color scale for the three temperature measures
    const colorScale = d3.scaleOrdinal()
        .domain(["tavg", "tmax", "tmin"])
        .range(d3.schemeAccent);

    // Create chart axes
    const bottomAxis = d3.axisBottom(xScale)
        .ticks(8)
        .tickFormat(d3.timeFormat("%Y"));

    const leftAxis = d3.axisLeft(yScale);

    // Add the x-axis
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(0, ${height - margin.bottom})`)
        .call(bottomAxis);

    // Add the y-axis
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(${margin.left}, 0)`)
        .call(leftAxis);

    // Add the chart title
    svg.append("text")
        .attr("class", "chart-title")
        .attr("x", width / 2)
        .attr("y", 35)
        .attr("text-anchor", "middle")
        .text("Annual Temperature Trends in Lyneham, UK");

    // Add the x-axis label
    svg.append("text")
        .attr("class", "axis-label")
        .attr("x", (width - margin.right + margin.left) / 2)
        .attr("y", height - 20)
        .attr("text-anchor", "middle")
        .text("Year");

    // Add the y-axis label
    svg.append("text")
        .attr("class", "axis-label")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("y", 22)
        .attr("text-anchor", "middle")
        .text("Temperature");

    // Create one path that will update when the user selects a measure
    const temperatureLine = svg.append("path")
        .datum(data)
        .attr("class", "temperature-line");

    // Create a label that updates with the selected line
    const lineLabel = svg.append("text")
        .attr("class", "line-label");

    // Create a line based on the selected temperature measure
    function makeLine(measure) {
        return d3.line()
            .x(d => xScale(d.year))
            .y(d => yScale(d[measure]));
    }

    // Update the chart line, color, and label
    function updateChart(measure) {
        temperatureLine
            .transition()
            .duration(1000)
            .attr("d", makeLine(measure))
            .attr("stroke", colorScale(measure));

        lineLabel
            .transition()
            .duration(1000)
            .attr("x", width - margin.right + 10)
            .attr("y", yScale(data[data.length - 1][measure]))
            .attr("fill", colorScale(measure))
            .text(measureLabels[measure]);
    }

    // Use event listeners to update the chart when inputs change
    d3.selectAll("input[name='measure']").on("change", event => {
        const selectedMeasure = event.currentTarget.value;
        updateChart(selectedMeasure);
    });

    // Draw the chart
    updateChart("tavg");
});