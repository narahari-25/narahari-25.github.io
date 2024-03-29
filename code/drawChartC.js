function drawChartC(file1Data, file2Data, file3Data, file4Data) {
    d3.select("#chart").selectAll("svg").remove();
    d3.selectAll(".tooltip").remove();
    d3.select("#chart").selectAll("g").remove();

    const margin = { top: 100, right: 0, bottom: 200, left: 400 };
    const width = 900 - margin.left - margin.right;
    const height = 800 - margin.top - margin.bottom;

    const svg = d3.select("#chart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Tooltip functions
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

    let totalExpenditureA1 = d3.sum(file1Data.map(year =>
        year.Consumption_of_Raw_Materials + year.Purchase_of_Traded_goods + year.Employees_Cost + year.Other_Expenses
    ));
    let totalExpenditureA2 = d3.sum(file2Data.map(year =>
        year.Consumption_of_Raw_Materials + year.Purchase_of_Traded_goods + year.Employees_Cost + year.Other_Expenses
    ));
    let totalExpenditureA3 = d3.sum(file3Data.map(year =>
        year.Consumption_of_Raw_Materials + year.Purchase_of_Traded_goods + year.Employees_Cost + year.Other_Expenses
    ));
    let totalExpenditureA4 = d3.sum(file4Data.map(year =>
        year.Consumption_of_Raw_Materials + year.Purchase_of_Traded_goods + year.Employees_Cost + year.Other_Expenses
    ));
    totalExpenditureA1 = totalExpenditureA1 / 5;
    totalExpenditureA2 = totalExpenditureA2 / 5;
    totalExpenditureA3 = totalExpenditureA3 / 5;
    totalExpenditureA4 = totalExpenditureA4 / 5;
    let countA = 0;
    let countB = 0;
    let countC = 0;
    let countD = 0;
    let profitA2 = d3.sum(file2Data.map(year => year.Net_Profit_Loss));
    if (profitA2 < 0) {
        countB = 1;
        profitA2 = profitA2 * (-1);
    }
    profitA2 = profitA2 / 5;
    let profitA3 = d3.sum(file3Data.map(year => year.Net_Profit_Loss));
    if (profitA3 < 0) {
        countC = 1;
        profitA3 = profitA3 * (-1);
    }
    profitA3 = profitA3 / 5;
    let profitA1 = d3.sum(file1Data.map(year => year.Net_Profit_Loss));
    if (profitA1 < 0) {
        countA = 1;
        profitA1 = profitA1 * (-1);
    }
    profitA1 = profitA1 / 5;
    let profitA4 = d3.sum(file4Data.map(year => year.Net_Profit_Loss));
    if (profitA4 < 0) {
        countD = 1;
        profitA4 = profitA4 * (-1);
    }

    profitA4 = profitA4 / 5;
    const data = [
        { letter: 'GodawariPower', expenditure: totalExpenditureA1, profit: profitA1 },
        { letter: 'ImpexFerroTech', expenditure: totalExpenditureA2, profit: profitA2 },
        { letter: 'PrecisionWires', expenditure: totalExpenditureA3, profit: profitA3 },
        { letter: 'TechnocraftInd', expenditure: totalExpenditureA4, profit: profitA4 }
    ];

    // Define the scales
    const x = d3.scaleBand()
        .domain(data.map(d => d.letter))
        .range([0, width])
        .padding(0.1);

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => Math.max(d.expenditure, d.profit))])
        .nice()
        .range([height, 0]);

    // Create and append the bars for expenditure
    function barClickHandler(d) {

        loadData().then(([mnm1Data, mnm2Data, mnm3Data, mnm4Data]) => {
            if (d.letter == 'GodawariPower') {
                drawChartA2(mnm1Data);
            }
            else if (d.letter == 'ImpexFerroTech') {
                drawChartA2(mnm2Data);
            }
            else if (d.letter == 'PrecisionWires') {
                drawChartA2(mnm3Data);
            }
            else if (d.letter == 'TechnocraftInd') {
                drawChartA2(mnm4Data);
            }
        }).catch(function (error) {
            console.log(error);
        });


    }


    // Attach event listener to the SVG container for clicks
    svg.on("click", function (event, d) {
        // Determine the clicked element
        const target = event.target;

        // Check if the clicked element has the class "bar"
        if (target.classList.contains("bar")) {
            // Extract data bound to the clicked element
            const d = d3.select(target).datum();
            // Call the barClickHandler function
            barClickHandler(d);
        }
    });



    // Create and append the bars for expenditure
    svg.selectAll(".expenditure")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar expenditure") // Ensure that your bars have the correct class
        .attr("x", d => x(d.letter))
        .attr("width", x.bandwidth() / 2)
        .attr("y", height) // Initial position at the bottom
        .attr("height", 0) // Initial height of 0

        .attr("stroke", "black") // Add border color
        .attr("stroke-width", 1) // Add border width
        
        .on("mouseover", function (event, d) {
            showTooltip(event, `Expenditure: ${d.expenditure}`);
        })
        .on("mouseout", hideTooltip)
        .on("click", barClickHandler)

        .transition() // Add transition for smooth animation
        .duration(1500) // Set transition duration
        .attr("y", d => y(d.expenditure))
        .attr("height", d => height - y(d.expenditure));



    // Create and append the bars for profit
    svg.selectAll(".profit")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar profit")
        .attr("x", d => x(d.letter) + x.bandwidth() / 2)
        .attr("width", x.bandwidth() / 2)

        .attr("y", height) // Initial position at the bottom
        .attr("height", 0) // Initial height of 0

        .attr("stroke", "black") // Add border color
        .attr("stroke-width", 1) // Add border width

        .on("mouseover", function (event, d) {
            if (d.letter == 'GodawariPower' && countA == 1) {
                showTooltip(event, `Loss: ${d.profit}`);
            }
            else if (d.letter == 'ImpexFerroTech' && countB == 1) {

                showTooltip(event, `Loss: ${d.profit}`);
            }
            else if (d.letter == 'PrecisionWires' && countC == 1) {

                showTooltip(event, `Loss: ${d.profit}`);
            }
            else if (d.letter == 'TechnocraftInd' && countD == 1) {

                showTooltip(event, `Loss: ${d.profit}`);
            }
            else {
                showTooltip(event, `Profit: ${d.profit}`);
            }
        })
        .on("mouseout", hideTooltip)
        .on("click", barClickHandler) // Add click event listener

        .transition() // Add transition for smooth animation
        .duration(1500) // Set transition duration
        .attr("y", d => y(d.profit))
        .attr("height", d => height - y(d.profit));


    // Add the x-axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Add the y-axis
    svg.append("g")
        .call(d3.axisLeft(y));

    // Create a legend
    const legend = svg.append("g")
        .attr("class", "legend")
        .attr("transform", "translate(" + (width - 120) + "," + 5 + ")");

    // Add rectangles for legend items
    const legendItems = legend.selectAll(".legend-item")
        .data(["Expenditure", "Profit"])
        .enter().append("g")
        .attr("class", "legend-item")
        .attr("transform", (d, i) => "translate(0," + (i * 20) + ")");

    legendItems.append("rect")
        .attr("x", 0)
        .attr("width", 18)
        .attr("height", 18)
        .attr("fill", d => d === "Expenditure" ? expenditureColor : profitColor)
        .attr("stroke", "black") // Add border color
        .attr("stroke-width", 1); // Add border width

    // Add text labels for legend items
    legendItems.append("text")
        .attr("x", 25)
        .attr("y", 9)
        .attr("dy", ".35em")
        .text(d => d);

}

