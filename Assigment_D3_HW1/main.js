// Chart dimension
const width = 700;
const height = 400;
const margin = 60;

// CSV load
d3.csv("data/processed/lpi_processed.csv").then(data => {
    // Convert numeric values from strings to numbers
    data.forEach(d => {
        d.maritime_partners = +d.maritime_partners;
        d.import_dwell_time = +d.import_dwell_time;
    });

    // Create SVG for bar chart
    const barSvg = d3.select("body")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    // Bar chart scale
    const xBar = d3.scaleBand()
        .domain(data.map(d => d.country_code))
        .range([margin, width - margin])
        .padding(0.1);

    const yBar = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.maritime_partners)])
        .range([height - margin, margin]);

    // Draw bar chart rectangles
    barSvg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", d => xBar(d.country_code))
        .attr("y", d => yBar(d.maritime_partners))
        .attr("width", xBar.bandwidth())
        .attr("height", d => (height - margin) - yBar(d.maritime_partners))
        .attr("fill", "steelblue");

    // Create bar chart axes
    const xBarAxis = d3.axisBottom(xBar);
    const yBarAxis = d3.axisLeft(yBar);

    //Bar chart title
    barSvg.append("text")
        .attr("x", width / 2)
        .attr("y", 30)
        .attr("text-anchor", "middle")
        .text("Top Countries by Maritime Connectivity (2024)");
    
    // Bar chart x-axis label 
    barSvg.append("text")
        .attr("x", width / 2)
        .attr("y", height - 10)
        .attr("text-anchor", "middle")
        .text("Country");
    
    // Bar chart y-axis label
    barSvg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("y", 20)
        .attr("text-anchor", "middle")
        .text("Maritime Partner Economies");

    // Add axes to bar chart
    barSvg.append("g")
        .attr("transform", `translate(0, ${height - margin})`)
        .call(xBarAxis);

    barSvg.append("g")
        .attr("transform", `translate(${margin}, 0)`)
        .call(yBarAxis);

    // Create SVG for scatterplot
    const scatterSvg = d3.select("body")
        .append("svg")
        .attr("width", width)
        .attr("height", height);
    
    // Scatterplot scale
    const xScatter = d3.scaleLinear()
        .domain([
            d3.min(data, d => d.maritime_partners) - 1, 
            d3.max(data, d => d.maritime_partners)])
        .range([margin, width - margin]);

    const yScatter = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.import_dwell_time)])
        .range([height - margin, margin]);

    // Draw scatterplot circles
    scatterSvg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xScatter(d.maritime_partners))
        .attr("cy", d => yScatter(d.import_dwell_time))
        .attr("r", 6)
        .attr("fill", "orange");
    
    // Create scatterplot axes
    const xScatterAxis = d3.axisBottom(xScatter);
    const yScatterAxis = d3.axisLeft(yScatter);

    // Scatterplot title
    scatterSvg.append("text")
        .attr("x", width / 2)
        .attr("y", 30)
        .attr("text-anchor", "middle")
        .text("Maritime Connectivity vs Import Dwell Time");
    
    // Scatterplot x-axis label
    scatterSvg.append("text")
        .attr("x", width / 2)
        .attr("y", height - 10)
        .attr("text-anchor", "middle")
        .text("Maritime Partner Economies");

    // Scatterplot y-axis label
    scatterSvg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("y", 20)
        .attr("text-anchor", "middle")
        .text("Import Dwell Time (Days)");

    // Add axes to scatterplot
    scatterSvg.append("g")
        .attr("transform", `translate(0, ${height - margin})`)
        .call(xScatterAxis);

    scatterSvg.append("g")
        .attr("transform", `translate(${margin}, 0)`)
        .call(yScatterAxis);

    // Add country labels next to scatterplot points
    scatterSvg.selectAll(".country-label")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "country-label")
        .attr("x", d => xScatter(d.maritime_partners) + 8)
        .attr("y", d => yScatter(d.import_dwell_time) + 4)
        .text(d => d.country_code)
        .style("font-size", "10px");
});