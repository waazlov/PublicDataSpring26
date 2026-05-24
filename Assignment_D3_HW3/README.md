# Interactive Lyneham UK Annual Temperature Trends D3 Visualization

## Overview

This project visualizes annual temperature trends for Lyneham, United Kingdom using the National Centers for Environmental Information Global Summary of the Year (GSOY), Version 1 dataset.

The visualization allows the viewer to switch between three annual temperature variables:

1. Average annual temperature
2. Average annual maximum temperature
3. Average annual minimum temperature

The interaction is designed to make comparison easier. Instead of showing all three lines at once, the chart lets the viewer focus on one temperature measure at a time. When a new option is selected, the line updates with a transition, making the change visible and easier to follow.

## Key Questions

This visualization explores three questions about annual temperature patterns in Lyneham, UK:

1. How has average annual temperature changed over time?
2. How do annual maximum and minimum temperature patterns compare with average temperature?
3. What does each temperature measure reveal when viewed separately?

## Visualization

### Initial Chart

![Initial Temperature Chart](images/Annual_Temperature_Trends_in_Lyneham_UK.png)

The initial multiple-line chart compared average annual temperature, average annual maximum temperature, and average annual minimum temperature for Lyneham, UK. Each line represents one temperature measure, and the x axis shows time by year.

### Updated Chart With Interaction Controls

![Interaction Controls](images/Interactive_Annual_Temperature_Trends_in_Lyneham_UK.gif)

The radio buttons now allow the viewer to choose which temperature measure appears in the chart.

## Key Findings

The chart shows that all three temperature measures generally increase from the 1960s to the 2020s. Average annual temperature rises from roughly the 8–9°C range in the early part of the record to around 11°C in the most recent years. This answers the first question by showing that Lyneham’s annual average temperature has trended upward over time, despite year-to-year variation.

Average maximum temperature and average minimum temperature move in a similar pattern across the chart. When the average temperature rises or falls, the maximum and minimum temperature lines usually rise or fall with it. This suggests that warmer and cooler years are reflected across the full annual temperature range rather than appearing only in daytime highs or nighttime lows.

The average maximum temperature remains consistently above the average temperature, while the average minimum temperature remains consistently below it. The spacing between the three lines stays fairly stable across the chart, which means the overall relationship between yearly highs, averages, and lows does not dramatically change. The main pattern is a gradual upward shift in all three lines.

The most recent years appear among the warmest in the chart. Near the 2020s, average maximum temperature reaches above 15°C, average temperature is around 11°C, and average minimum temperature is above 7°C. Compared with many earlier years, this suggests that recent annual conditions in Lyneham have been warmer across maximum, average, and minimum temperature measures.

## Dataset

**Source:**  
National Centers for Environmental Information, Global Summary of the Year (GSOY), Version 1

**Source Link:**  
[NCEI, Global Summary of the Year (GSOY), Version 1](https://www.ncei.noaa.gov/metadata/geoportal/rest/metadata/item/gov.noaa.ncdc:C00947/html)

**Dataset Used:**  
Global Summary of the Year climate data for Lyneham, UK

I used the NCEI data search function to find an observing location in the United Kingdom that had data updated recently (_2025-12-31_) and included values for average annual temperature, average annual maximum temperature, and average annual minimum temperature, and found out that data from Lyneham matched my needs.

The processed dataset used for this project includes four columns:

year  
tavg  
tmax  
tmin  

Each row represents one year of climate observations for the Lyneham station.

The variables used are:

1. `year`: the year of the annual climate summary
2. `tavg`: average annual temperature
3. `tmax`: average annual maximum temperature
4. `tmin`: average annual minimum temperature

The original dataset included many additional climate fields and attribute columns.

## Methods

### Data Preparation

The original GSOY station CSV was cleaned using Python before being used in D3. The raw dataset included annual climate summaries with many columns, including temperature, precipitation, wind, and attribute fields.

For this project, I selected only the columns needed for the chart:

1. `DATE`
2. `TAVG`
3. `TMAX`
4. `TMIN`

The columns were then renamed to make them simpler to use in D3:

1. `DATE` became `year`
2. `TAVG` became `tavg`
3. `TMAX` became `tmax`
4. `TMIN` became `tmin`

The temperature columns were converted into numeric values, and rows with missing values in the selected chart variables were removed. The data was then sorted by year so that the line chart would draw correctly from left to right.

The final cleaned file was saved as:

`data/lyneham_temperature_processed.csv`

### D3 Visualization Process

The visualization was built in JavaScript using D3.js.

The code performs the following steps:

1. Creates chart dimensions and margins.
2. Loads the cleaned CSV file using `d3.csv()`.
3. Parses the year values using `d3.timeParse()`.
4. Converts the temperature values from strings into numbers.
5. Creates a time scale for the x axis using `d3.scaleTime()`.
6. Creates a linear scale for the y axis using `d3.scaleLinear()`.
7. Creates an ordinal color scale for the three temperature measures.
8. Creates one SVG path for the temperature line.
9. Adds x and y axes.
10. Adds a chart title and axis labels.
11. Adds an updating line label.
12. Uses radio input buttons to let the viewer select a temperature measure.
13. Uses JavaScript and D3 event listeners to detect input changes.
14. Updates the line, label, and color with a transition.

### Interaction Design

The interaction uses HTML radio inputs so the viewer can choose between average temperature, average maximum temperature, and average minimum temperature.

The project includes:

1. HTML input tags using `input type="radio"`
2. HTML events using `oninput`
3. JavaScript/D3 events using `.on("change")`
4. A D3 transition using `.transition()` and `.duration()`

The purpose of the interaction is to support focused comparison. Selecting one measure at a time reduces visual clutter and helps the viewer notice the pattern of each temperature variable more clearly.

## Repository Structure

```text
Assignment_D3_HW3
│
├── data
│   └── lyneham_temperature_processed.csv
│
├── images
│   ├──Interactive_Annual_Temperature_Trends_in_Lyneham_UK.gif
│   └──Annual_Temperature_Trends_in_Lyneham_UK.png
│
├── index.html
├── main.js
├── style.css
└── README.md
```

## Tools Used

D3.js    
JavaScript    
HTML    
CSS    
Python    
pandas    
GitHub    
Live Server

## Limitations

This project is descriptive and focuses on one observing station in Lyneham, UK. The results should not be interpreted as a complete climate analysis for the entire United Kingdom.

The chart shows observed annual patterns, but it does not explain the causes of temperature change. Additional analysis would be needed to connect these patterns to broader climate drivers, local station conditions, or regional environmental changes.

## Author

Siwon Lee  

BS in Data Visualization  

University of Washington Bothell