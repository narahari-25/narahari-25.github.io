function drawParallelB(file1Data,file2Data,file3Data,file4Data){
    // Remove existing SVG elements
    d3.select("#chart-container").selectAll("svg").remove();
    d3.selectAll(".tooltip").remove();
    d3.select("#chart-container").selectAll("g").remove();
    d3.select("#treemap").selectAll("svg").remove();
    d3.selectAll(".tooltip").remove();
    d3.select("#treemap").selectAll("g").remove();


    console.log("hello");
    const margin = { top: 100, right: 500, bottom: 200, left: 100 };
    const width = 1500 - margin.left - margin.right;
    const height = 800 - margin.top - margin.bottom;

    const svg = d3.select("#parallel")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left +"," + margin.top + ")");

  
  const tooltip = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

  function showTooltip(event, content) {
      tooltip
          .html(content)
          .style("left", event.pageX + "px")
          .style("top", event.pageY + "px")
          .transition()
          .duration(200)
          .style("opacity", 0.9);
  }

  function hideTooltip() {
      tooltip.transition()
          .duration(200)
          .style("opacity", 0);
  }
  let EPSA1 = d3.sum(file1Data.map(year => year.EPS));
  let EPSA2 = d3.sum(file2Data.map(year => year.EPS));
  let EPSA3 = d3.sum(file3Data.map(year => year.EPS));
  let EPSA4 = d3.sum(file4Data.map(year => year.EPS));
  EPSA1=EPSA1/5;
  EPSA2=EPSA2/5;
  EPSA3=EPSA3/5;
  EPSA4=EPSA4/5;
  let SalesA1=d3.sum(file1Data.map(year => year.SalesperShare));
  let SalesA2=d3.sum(file2Data.map(year => year.SalesperShare));
  let SalesA3=d3.sum(file3Data.map(year => year.SalesperShare));
  let SalesA4=d3.sum(file4Data.map(year => year.SalesperShare));
  SalesA1=SalesA1/5;
  SalesA2=SalesA2/5;
  SalesA3=SalesA3/5;
  SalesA4=SalesA4/5;
  let PEA1=d3.sum(file1Data.map(year => (year.Revenue*year.SalesperShare)/(year.EPS)));
  let PEA2=d3.sum(file2Data.map(year => (year.Revenue*year.SalesperShare)/(year.EPS)));
  let PEA3=d3.sum(file3Data.map(year => (year.Revenue*year.SalesperShare)/(year.EPS)));
  let PEA4=d3.sum(file4Data.map(year => (year.Revenue*year.SalesperShare)/(year.EPS)));
  PEA1=PEA1/5;
  PEA2=PEA2/5;
  PEA3=PEA3/5;
  PEA4=PEA4/5;
  const data = [
      { letter: 'Hester-Bio', Price_to_Earnings_ratio: PEA1, Price_to_Sales_ratio: SalesA1,EPS:EPSA1 },
      { letter: 'Ind_Swift', Price_to_Earnings_ratio: PEA2, Price_to_Sales_ratio: SalesA2,EPS:EPSA2 },
      { letter: 'Kopran', Price_to_Earnings_ratio: PEA3, Price_to_Sales_ratio: SalesA3,EPS:EPSA3 },
      { letter: 'Themis_Medicare', Price_to_Earnings_ratioe: PEA4, Price_to_Sales_ratio: SalesA4,EPS:EPSA4 }
  ];
  const xScale = d3.scalePoint()
      .domain(["Price_to_Earnings_Ratio", "Price_to_Sales_ratio","EPS"])
      .range([0, width - 50]);

  const yScale = d3.scaleLinear()
      .domain([0, Math.max(EPSA1,EPSA2,EPSA3,EPSA4,SalesA1,SalesA2,SalesA3,SalesA4,PEA1,PEA2,PEA3,PEA4)+10])
      .range([height - 50, 50]);

    // Draw axes
    const xAxis = d3.axisBottom(xScale);

    const yAxis = d3.axisLeft(yScale);
    // Append x-axis
    svg.append("g")
        .attr("transform", `translate(0, ${height - 50})`)
        .call(xAxis)
        .selectAll("text")
        .attr("font-size", "14px"); // Increase font size of x-axis labels
    
    // Append y-axis
    svg.append("g")
        .call(yAxis)
        .selectAll("text")
        .attr("font-size", "14px"); // Increase font size of y-axis labels
    
    // Append x-axis label
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", height) // Adjust the position as needed
        .attr("fill", "black")
        .attr("text-anchor", "middle")
        .attr("font-size", "20px")
        .text("Parameters");
    
    // Append y-axis label
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -60)
        .attr("x", -height / 2)
        .attr("dy", "1em")
        .attr("fill", "black")
        .attr("text-anchor", "middle")
        .attr("font-size", "20px")
        .text("Companies");
    
    
     
    
        svg.append("g")
            .attr("transform", `translate(${width - 475}, 0)`)
            .call(yAxis)
            .selectAll("text")
        .attr("font-size", "14px");
        svg.append("g")
            .attr("transform", `translate(${width - 50}, 0)`)
            .call(yAxis)
            .selectAll("text")
        .attr("font-size", "14px");
  
  const Hester_Bio = svg.selectAll(".Hester-Bio-dot")
      .data([{ parameter: "Price_to_Earnings_ratio", value: PEA1 }, { parameter: "Price_to_Sales_ratio", value: SalesA1  },{parameter: "EPS",value:EPSA1}])
      .enter()
      .append("circle")
      .attr("class", "Hester-Bio-dot")
      .attr("cx", d => xScale(d.parameter)) // Set the x-coordinate
      .attr("cy", d => yScale(d.value)) // Set the y-coordinate
      .attr("r", 5) // Set the radius of the dot
      .style("fill", "blue") // Set the fill color to blue
      .on("mouseover", function(event, d) {
        // Show tooltip on mouseover
        showTooltip(event, `Hester-Bio: ${d.value}`);
    })
    .on("mouseout", function() {
        // Hide tooltip on mouseout
        hideTooltip();
    });
  
      const Ind_Swift = svg.selectAll(".Ind_Swift-dot")
      .data([{ parameter: "Price_to_Earnings_ratio", value: PEA2 }, { parameter: "Price_to_Sales_ratio", value: SalesA2  },{parameter: "EPS",value:EPSA2}])
      .enter()
      .append("circle")
      .attr("class", "Ind_Swift-dot")
      .attr("cx", d => xScale(d.parameter)) // Set the x-coordinate
      .attr("cy", d => yScale(d.value)) // Set the y-coordinate
      .attr("r", 5) // Set the radius of the dot
      .style("fill", "green")// Set the fill color to blue
      .on("mouseover", function(event, d) {
        // Show tooltip on mouseover
        showTooltip(event, `Ind_Swift: ${d.value}`);
    })
    .on("mouseout", function() {
        // Hide tooltip on mouseout
        hideTooltip();
    });

      const Kopran = svg.selectAll(".Kopran-dot")
      .data([{ parameter: "Price_to_Earnings_ratio", value: PEA3 }, { parameter: "Price_to_Sales_ratio", value: SalesA3  },{parameter: "EPS",value:EPSA3}])
      .enter()
      .append("circle")
      .attr("class", "Kopran-dot")
      .attr("cx", d => xScale(d.parameter)) // Set the x-coordinate
      .attr("cy", d => yScale(d.value)) // Set the y-coordinate
      .attr("r", 5) // Set the radius of the dot
      .style("fill", "purple") // Set the fill color to blue
      .on("mouseover", function(event, d) {
        // Show tooltip on mouseover
        showTooltip(event, `Kopran: ${d.value}`);
    })
    .on("mouseout", function() {
        // Hide tooltip on mouseout
        hideTooltip();
    });

      const Themis_Medicare = svg.selectAll(".Themis_Medicare-dot")
      .data([{ parameter: "Price_to_Earnings_ratio", value: PEA4 }, { parameter: "Price_to_Sales_ratio", value: SalesA4  },{parameter: "EPS",value:EPSA4}])
      .enter()
      .append("circle")
      .attr("class", "Themis_Medicare-dot")
      .attr("cx", d => xScale(d.parameter)) // Set the x-coordinate
      .attr("cy", d => yScale(d.value)) // Set the y-coordinate
      .attr("r", 5) // Set the radius of the dot
      .style("fill", "red") // Set the fill color to blue
      .on("mouseover", function(event, d) {
        // Show tooltip on mouseover
        showTooltip(event, `Themis_Medicare: ${d.value}`);
    })
    .on("mouseout", function() {
        // Hide tooltip on mouseout
        hideTooltip();
    });

      const lineHester_Bio12 = svg.append("line")
      .attr("class", "lineHester-Bio12")
      .attr("x1", xScale("Price_to_Earnings_ratio")) // Start x-coordinate
      .attr("y1", yScale(PEA1)) // Start y-coordinate
      .attr("x2", xScale("Price_to_Sales_ratio")) // End x-coordinate
      .attr("y2", yScale(SalesA1)) // End y-coordinate
      .attr("stroke", "rgb(70, 145, 180)")
      .attr("stroke-width", 2)
      .attr("opacity", 0.8);

      const lineHester_Bio23 = svg.append("line")
      .attr("class", "lineHester-Bio23")
      .attr("x1", xScale("Price_to_Sales_ratio")) // Start x-coordinate
      .attr("y1", yScale(SalesA1)) // Start y-coordinate
      .attr("x2", xScale("EPS")) // End x-coordinate
      .attr("y2", yScale(EPSA1)) // End y-coordinate
      .attr("stroke", "rgb(70, 145, 180)")
      .attr("stroke-width", 2)
      .attr("opacity", 0.8);
      const lineInd_Swift12 = svg.append("line")
      .attr("class", "lineInd_Swift12")
      .attr("x1", xScale("Price_to_Earnings_ratio")) // Start x-coordinate
      .attr("y1", yScale(PEA2)) // Start y-coordinate
      .attr("x2", xScale("Price_to_Sales_ratio")) // End x-coordinate
      .attr("y2", yScale(SalesA2)) // End y-coordinate
      .attr("stroke", "green")
      .attr("stroke-width", 2)
      .attr("opacity", 0.8);

      const lineInd_Swift23 = svg.append("line")
      .attr("class", "lineInd_Swift23")
      .attr("x1", xScale("Price_to_Sales_ratio")) // Start x-coordinate
      .attr("y1", yScale(SalesA2)) // Start y-coordinate
      .attr("x2", xScale("EPS")) // End x-coordinate
      .attr("y2", yScale(EPSA2)) // End y-coordinate
      .attr("stroke", "green")
      .attr("stroke-width", 2)
      .attr("opacity", 0.8);

      const lineKopran12 = svg.append("line")
      .attr("class", "lineKopran12")
      .attr("x1", xScale("Price_to_Earnings_ratio")) // Start x-coordinate
      .attr("y1", yScale(PEA3)) // Start y-coordinate
      .attr("x2", xScale("Price_to_Sales_ratio")) // End x-coordinate
      .attr("y2", yScale(SalesA3)) // End y-coordinate
      .attr("stroke", "purple")
      .attr("stroke-width", 2)
      .attr("opacity", 0.8);

      const lineKopran23 = svg.append("line")
      .attr("class", "lineKopran23")
      .attr("x1", xScale("Price_to_Sales_ratio")) // Start x-coordinate
      .attr("y1", yScale(SalesA3)) // Start y-coordinate
      .attr("x2", xScale("EPS")) // End x-coordinate
      .attr("y2", yScale(EPSA3)) // End y-coordinate
      .attr("stroke", "purple")
      .attr("stroke-width", 2)
      .attr("opacity", 0.8);
      
      const lineThemis_Medicare12 = svg.append("line")
      .attr("class", "lineThemis_Medicare12")
      .attr("x1", xScale("Price_to_Earnings_ratio")) // Start x-coordinate
      .attr("y1", yScale(PEA4)) // Start y-coordinate
      .attr("x2", xScale("Price_to_Sales_ratio")) // End x-coordinate
      .attr("y2", yScale(SalesA4)) // End y-coordinate
      .attr("stroke", "red")
      .attr("stroke-width", 2)
      .attr("opacity", 0.8);

      const lineThemis_Medicare23 = svg.append("line")
      .attr("class", "lineThemis_Medicare23")
      .attr("x1", xScale("Price_to_Sales_ratio")) // Start x-coordinate
      .attr("y1", yScale(SalesA4)) // Start y-coordinate
      .attr("x2", xScale("EPS")) // End x-coordinate
      .attr("y2", yScale(EPSA4)) // End y-coordinate
      .attr("stroke", "red")
      .attr("stroke-width", 2)
      .attr("opacity", 0.8);

      function handleBack() {
          loadData().then(([file1Data, file2Data, file3Data, file4Data, ph1Data, ph2Data, ph3Data, ph4Data, mnm1Data, mnm2Data, mnm3Data, mnm4Data]) => {
              drawChart(file1Data, file2Data, file3Data, file4Data, ph1Data, ph2Data, ph3Data, ph4Data, mnm1Data, mnm2Data, mnm3Data, mnm4Data);
          });
          // Implement your logic here to go back
          // For example, you can navigate to a previous page or state
          console.log("Back button clicked");
      }
      const backButton = d3.select("#parallel").insert("button", ":first-child")
      .text("Back")
      .attr("class", "back-button")
      .on("click", function() {
          // Call a function to handle going back
          handleBack();
      });
      const legend = svg.append("g")
        .attr("class", "legend")
        .attr("transform", "translate(" + (width) + "," + (height - 150) + ")") // Adjusted position
        .style("padding", "15px");

    // Add rectangles for legend items
    const legendItems = legend.selectAll(".legend-item")
        .data(["Hester-Bio", "Ind_Swift", "Kopran", "Themis_Medicare"])
        .enter().append("g")
        .attr("class", "legend-item")
        .attr("transform", (d, i) => "translate(0," + (i * 20) + ")");

    legendItems.append("rect")
        .attr("x", 0)
        .attr("width", 18)
        .attr("height", 18)
        .attr("fill", d => {
            switch (d) {
                case "Hester-Bio": return "blue";
                case "Ind_Swift": return "green";
                case "Kopran": return "purple";
                case "Themis_Medicare": return "red";
                // Default color if not specified
            }
        })
        .attr("stroke", "purple") // Add border color
        .attr("stroke-width", 1); // Add border width

    // Add text labels for legend items
    legendItems.append("text")
        .attr("x", 25)
        .attr("y", 9)
        .attr("dy", ".35em")
        .text(d => d);
  
}