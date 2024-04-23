function drawThird(fileData) {

    d3.select("#chart-container").selectAll("svg").remove();
    d3.selectAll(".tooltip").remove();
    d3.select("#chart-container").selectAll("g").remove();
    d3.select("#treemap").selectAll("svg").remove();
    d3.selectAll(".tooltip").remove();
    d3.select("#treemap").selectAll("g").remove();


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
        .on("click", function () {
            // Call a function to handle going back
            handleBack();
        });
    // Legend data
    const categories = [
      "Consumption_of_Raw_Materials",
      "Employees_Cost",
      "Other_Expenses",
      "Purchase_of_Traded_goods"
  ];

  const profitloss = [
      "Profit",
      "Loss"
  ];

  // Sample data
  const data = fileData;
  /// NEW CHART

  // Chart dimensions
  const w = window.innerWidth;
  const h = (window.innerHeight - window.innerHeight*0.2)/2;
  const legend_w = 150;
  const margin = { top: 20, right: 50, bottom: 31, left: 50 };
  const width = w - margin.left - margin.right;
  const height = h - margin.top - margin.bottom;

  // Create SVG container
  const svg = d3.select("#piechart-container")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);

  const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

  const x = d3.scaleBand()
      .domain(data.map(d => d.year))
      .range([0, width-legend_w])
      .padding(0.1);
  g.append("g")
      .attr("transform", `translate(${(legend_w)},${height})`)
      .call(d3.axisBottom(x));

  g.append("text")
      .attr("x", (width+legend_w) / 2)
      .attr("y", height + margin.bottom)
      .attr("text-anchor", "middle")
      .text(`Year`);

  // set the color scale
  const color = d3.scaleOrdinal()
      .domain(categories)
      .range(d3.schemeSet2);

  const tooltip1 = d3
      .select("#piechart-container")
      .append("div")
      .attr("class", "tooltip1")
      .style('position', 'absolute')
      .style('visibility', 'hidden')
      .style('background-color', 'grey')
      .style('color', 'white')
      .style('text-align', 'center')
      .style('font-size', '12px')
      .style('padding', '9px')
      .style('padding-top', '5px')
      .style('padding-bottom', '5px')
      .style('border-radius', '10px');

  // Create groups for pie charts
  const pieGroups = g.selectAll(".pie-chart")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "pie-chart")
      .attr("transform", d => `translate(${x(d.year) + x.bandwidth()/2 + legend_w}, ${height/2})`); // Use x scale for positioning
  console.log("alright");
  // Compute the position of each group on the pie:
  const pie = d3.pie()
      .value(d => d[1]);
  // const data_ready = pie(Object.entries(filteredData));
  
  // console.log("alright");
  // Build the pie chart for each group
  pieGroups.each(function (d) {

      const group = d3.select(this);

      const filteredData = {
          Consumption_of_Raw_Materials: d.Consumption_of_Raw_Materials,
          Employees_Cost: d.Employees_Cost,
          Other_Expenses: d.Other_Expenses,
          Purchase_of_Traded_goods: d.Purchase_of_Traded_goods
      };
      const data_arc = pie(Object.entries(filteredData)); // Compute pie arcs for the current data item

      const exp = d.Consumption_of_Raw_Materials + d.Employees_Cost + d.Other_Expenses + d.Purchase_of_Traded_goods;
      const radius = Math.sqrt(exp/10/Math.PI)*5;
      const x_coor = x(d.year) + x.bandwidth()/2 + legend_w;

      console.log(d);
      console.log(filteredData);
      console.log(Object.entries(filteredData));
      console.log(pie(Object.entries(filteredData)));

      // Define arc function with variable radius
      const arc = d3.arc()
          .innerRadius(0)
          .outerRadius(radius); // Adjust radius based on profit percentage

      // Build arcs for the pie chart
      group.selectAll('path')
          .data(data_arc)
          .join('path')
          .attr('d', arc)
          .attr('fill', d => color(d.data[0]))
          .attr("stroke",  "black")
          .attr("stroke-width", "2px")
          .attr("opacity", 0.7)
          .on("mouseover", function (event, d) {
              tooltip1.text(`${d.data[0]}: ${d.data[1]}`);
              tooltip1.style("visibility", "visible");
          })
          .on("mousemove", (event) => {
              tooltip1
                  .style("top", event.pageY - 10 + "px")
                  .style("left", event.pageX + 10 + "px");
          })
          .on("mouseout", function (event, d) {
              tooltip1.style("visibility", "hidden");
          });


  });

  const legend_category = g.selectAll('.legend-item-category')
      .attr('class', 'legend')
      .data(categories)
      .enter()
      .append('g')
      .attr('class', 'legend-item-category')
      .attr('transform', (d, i) => `translate(0, ${i * 20})`)
      .each(function (d) {
          d3.select(this).append('rect')
          .attr('width', 17)
          .attr('height', 17)
          .attr('fill',  color(d));

          d3.select(this).append('text')
          .attr('x', 22)
          .attr('y', 14)
          .text(d);
    });

  g.append('text')
      .attr('class', 'legend-item-area')
      .attr('x', 0)
      .style("font-size", "14px")
      .attr('y', 120) // Adjust the y-coordinate for positioning
      .text("Area of pie chart ∝");

  g.append('text')
      .attr('class', 'legend-item-area')
      .attr('x', 0)
      .attr('y', 138) 
      .style("font-size", "14px")
      .text("Net Expenditure");

      /// NEW CHART

  // Chart dimensions
  const w_1 = (window.innerWidth - window.innerWidth * 0.05) / 2;;
  const h_1 = (window.innerHeight - window.innerHeight*0.2)/2;
  const margin_1 = { top: 20, right: 50, bottom: 31, left: 50 };
  const width_1 = w_1 - margin_1.left - margin_1.right;
  const height_1 = h_1 - margin_1.top - margin_1.bottom;

  d3.select("#linegraph-container")
    .style("width", `${w_1}px`)
    .style("height", `${h_1}px`);

  const svg_1 = d3.select("#linegraph-container")
      .append("svg")
      .attr("width", width_1 + margin_1.left + margin_1.right)
      .attr("height", height_1 + margin_1.top + margin_1.bottom);

  const g_1 = svg_1.append("g")
      .attr("transform", `translate(${margin_1.left},${margin_1.top})`);

  const x_1 = d3.scaleBand()
      .domain(data.map(d => d.year))
      .range([20, width_1])
      .padding(0.1);
  g_1.append("g")
      .attr("transform", `translate(0,${height_1})`)
      .call(d3.axisBottom(x_1));

  const max_profit = d3.max(data, d => d.Net_Profit_Loss);

  const y_1 = d3.scaleLinear()
      .domain([0, max_profit + max_profit * 0.10])
      .range([height_1, 0]);
  g_1.append("g")
      .attr("transform", `translate(${20},0)`)
      .call(d3.axisLeft(y_1));

  g_1.append("text")
      .attr("x", (width_1) / 2)
      .attr("y", height_1 + margin_1.bottom)
      .attr("text-anchor", "middle")
      .text(`Year`);

  g_1.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height_1 / 2)
      .attr("y", -margin_1.left + margin_1.left / 4)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text(`Profit`);

  const line_1 = d3.line()
      .x(d => x_1(d.year) + x_1.bandwidth() / 2)
      .y(d => y_1(d.Net_Profit_Loss) + margin_1.top - 20); // Adjusted to include margin.top

  g_1.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", 1.5)
      .attr("d", line_1);

  g_1.selectAll('.dot')
      .data(data)
      .enter().append('circle')
      .attr('class', 'dot')
      .attr('cx', d => x_1(d.year) + x_1.bandwidth() / 2)
      .attr('cy', d => y_1(d.Net_Profit_Loss) + margin_1.top - 20)
      .attr('r', 3)
      .attr('fill', 'black')
      .style('opacity', 1);

  g_1.selectAll('.label')
      .data(data)
      .enter().append('text')
      .attr('class', 'label')
      .attr('x', d => x_1(d.year)+ x_1.bandwidth() / 2)
      .attr('y', d => y_1(d.Net_Profit_Loss) + margin_1.top - 10)
      .text(d => d.Net_Profit_Loss)
      .attr('text-anchor', 'middle')
      .attr('font-size', '10px')
      .attr('fill', 'black')
      .style('opacity', 1); // Initially hidden

  /// NEW CHART

  // Chart dimensions
  const w_2 = (window.innerWidth - window.innerWidth * 0.05) / 2;
  const h_2 = (window.innerHeight - window.innerHeight * 0.2) / 2;
  const margin_2 = { top: 20, right: 50, bottom: 31, left: 50 };
  const width_2 = w_2 - margin_2.left - margin_2.right;
  const height_2 = h_2 - margin_2.top - margin_2.bottom;

  d3.select("#heatmap-container")
      .style("width", `${w_2}px`)
      .style("height", `${h_2}px`);

  const svg_2 = d3.select("#heatmap-container")
      .append("svg")
      .attr("width", width_2 + margin_2.left + margin_2.right)
      .attr("height", height_2 + margin_2.top + margin_2.bottom);

  const g_2 = svg_2.append("g")
      .attr("transform", `translate(${margin_2.left},${margin_2.top})`);

  // Labels of row and columns
  const myGroups = data.map(d => d.year);
  const myVars = ["EPS", "P/S", "P/E"];

  const x_2 = d3.scaleBand()
      .domain(data.map(d => d.year))
      .range([20, width_2])
      .padding(0.01);
  g_2.append("g")
      .attr("transform", `translate(0,${height_2})`)
      .call(d3.axisBottom(x_2));

  const y_2 = d3.scaleBand()
      .domain(["EPS", "P/S", "P/E"])
      .range([height_2, 0]);
  g_2.append("g")
      .attr("transform", `translate(${20},0)`)
      .call(d3.axisLeft(y_2));

  const max_eps = d3.max(data, d => d.EPS);
  const max_ps = d3.max(data, d => d.SalesperShare);
  const max_pe = d3.max(data, d => (d.Revenue * d.SalesperShare) / d.EPS);

  const min_eps = d3.min(data, d => d.EPS);
  const min_ps = d3.min(data, d => d.SalesperShare);
  const min_pe = d3.min(data, d => (d.Revenue * d.SalesperShare) / d.EPS);

  // Build color scale
  const myColor_2 = d3.scaleLinear()
      .range(["white", "#69b3a2"])
      .domain([d3.min([min_eps, min_pe, min_ps]), d3.max([max_eps, max_pe, max_ps])]);

  g_2.append("text")
      .attr("x", (width_2) / 2)
      .attr("y", height_2 + margin_2.bottom)
      .attr("text-anchor", "middle")
      .text(`Year`);

  g_2.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height_2 / 2)
      .attr("y", -margin_2.left + margin_2.left / 4)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text(`Profit`);

  const tooltip2 = d3
      .select("#chart-container")
      .append("div")
      .attr("class", "tooltip2")
      .style('position', 'absolute')
      .style('visibility', 'hidden')
      .style('background-color', 'grey')
      .style('color', 'white')
      .style('text-align', 'center')
      .style('font-size', '12px')
      .style('padding', '9px')
      .style('padding-top', '5px')
      .style('padding-bottom', '5px')
      .style('border-radius', '10px');

  const dataprocessed2 = [];

  data.forEach(d => {
      const p_s = {
          year: d.year,
          parameter: "P/S",
          value: d.SalesperShare
      };
      const eps = {
          year: d.year,
          parameter: "EPS",
          value: d.EPS
      };
      const p_e = {
          year: d.year,
          parameter: "P/E",
          value: d.Revenue * d.SalesperShare / d.EPS
      };

      dataprocessed2.push(p_s, eps, p_e);
  });

  console.log(dataprocessed2);

  // add the squares
  g_2.selectAll()
      .data(dataprocessed2, d => d.parameter + ':' + d.year)
      .enter()
      .append("rect")
      .attr("x", d => x_2(d.year))
      .attr("y", d => y_2(d.parameter))
      .attr("width", x_2.bandwidth())
      .attr("height", y_2.bandwidth())
      .style("fill", d => myColor_2(d.value))
      .on("mouseover", (event, d) => {
          tooltip2.text(`${d.year}: ${d.parameter}: ${d.value}`);
          tooltip2.style("visibility", "visible");
      })
      .on("mousemove", (event) => {
          tooltip2
              .style("top", event.pageY - 10 + "px")
              .style("left", event.pageX + 10 + "px");
      })
      .on("mouseout", (event, d) => {
          tooltip2.style("visibility", "hidden");
      });



}