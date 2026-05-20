// Set chart dimensions
const width = 950;
const height = 500;
const margin = {
    top: 70,
    right: 190,
    bottom: 70,
    left: 70
};

// Load the external CSV file
d3.csv("data/processed/lyneham_temperature_processed.csv").then(data => {

    // Parse years as dates and convert temperature values to numbers
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
        .domain([
            d3.min(data, d => d.year),
            d3.max(data, d => d.year)
        ])
        .range([margin.left, width - margin.right]);

    // Create the y-scale for temperature values
    const yScale = d3.scaleLinear()
        .domain([
            d3.min(data, d => d.tmin) - 1,
            d3.max(data, d => d.tmax) + 1
        ])
        .range([height - margin.bottom, margin.top]);

    // Create an ordinal color scale for the three temperature lines
    const colorScale = d3.scaleOrdinal()
        .domain(["tavg", "tmax", "tmin"])
        .range(d3.schemeAccent);

    // Draw the average temperature line
    svg.append("path")
        .datum(data)
        .attr("class", "temperature-line")
        .attr("d", d3.line()
            .x(d => xScale(d.year))
            .y(d => yScale(d.tavg))
        )
        .attr("stroke", colorScale("tavg"));

    // Draw the average maximum temperature line
    svg.append("path")
        .datum(data)
        .attr("class", "temperature-line")
        .attr("d", d3.line()
            .x(d => xScale(d.year))
            .y(d => yScale(d.tmax))
        )
        .attr("stroke", colorScale("tmax"));

    // Draw the average minimum temperature line
    svg.append("path")
        .datum(data)
        .attr("class", "temperature-line")
        .attr("d", d3.line()
            .x(d => xScale(d.year))
            .y(d => yScale(d.tmin))
        )
        .attr("stroke", colorScale("tmin"));

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

    // Add label for average temperature line
    svg.append("text")
        .attr("class", "line-label")
        .attr("x", width - margin.right + 10)
        .attr("y", yScale(data[data.length - 1].tavg))
        .attr("fill", colorScale("tavg"))
        .text("Average Temperature");

    // Add label for average maximum temperature line
    svg.append("text")
        .attr("class", "line-label")
        .attr("x", width - margin.right + 10)
        .attr("y", yScale(data[data.length - 1].tmax))
        .attr("fill", colorScale("tmax"))
        .text("Average Maximum Temperature");

    // Add label for average minimum temperature line
    svg.append("text")
        .attr("class", "line-label")
        .attr("x", width - margin.right + 10)
        .attr("y", yScale(data[data.length - 1].tmin))
        .attr("fill", colorScale("tmin"))
        .text("Average Minimum Temperature");
});