const profitColor = "#82CAFF"
const expenditureColor = "#4361EE"

function drawChart(file1Data, file2Data, file3Data, file4Data, ph1Data, ph2Data, ph3Data, ph4Data, mnm1Data, mnm2Data, mnm3Data, mnm4Data) {
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

    let totalExpenditureFood = d3.sum(file1Data.map(year =>
        year.Consumption_of_Raw_Materials + year.Purchase_of_Traded_goods + year.Employees_Cost + year.Other_Expenses
    ));
    totalExpenditureFood += d3.sum(file2Data.map(year =>
        year.Consumption_of_Raw_Materials + year.Purchase_of_Traded_goods + year.Employees_Cost + year.Other_Expenses
    ));
    totalExpenditureFood += d3.sum(file3Data.map(year =>
        year.Consumption_of_Raw_Materials + year.Purchase_of_Traded_goods + year.Employees_Cost + year.Other_Expenses
    ));
    totalExpenditureFood += d3.sum(file4Data.map(year =>
        year.Consumption_of_Raw_Materials + year.Purchase_of_Traded_goods + year.Employees_Cost + year.Other_Expenses
    ));
    totalExpenditureFood = totalExpenditureFood / 20;

    let countA = 0;
    let countB = 0;
    let countC = 0;
    let profitFood = d3.sum(file2Data.map(year => year.Net_Profit_Loss));
    profitFood += d3.sum(file3Data.map(year => year.Net_Profit_Loss));
    profitFood += d3.sum(file1Data.map(year => year.Net_Profit_Loss));
    profitFood += d3.sum(file4Data.map(year => year.Net_Profit_Loss));
    if (profitFood < 0) {
        countA = 1;
        profitFood = profitFood * (-1);
    }
    profitFood = profitFood / 20;

    let totalExpenditurePharm = d3.sum(ph1Data.map(year =>
        year.Consumption_of_Raw_Materials + year.Purchase_of_Traded_goods + year.Employees_Cost + year.Other_Expenses
    ));

    totalExpenditurePharm += d3.sum(ph2Data.map(year =>
        year.Consumption_of_Raw_Materials + year.Purchase_of_Traded_goods + year.Employees_Cost + year.Other_Expenses
    ));
    totalExpenditurePharm += d3.sum(ph3Data.map(year =>
        year.Consumption_of_Raw_Materials + year.Purchase_of_Traded_goods + year.Employees_Cost + year.Other_Expenses
    ));
    totalExpenditurePharm += d3.sum(ph4Data.map(year =>
        year.Consumption_of_Raw_Materials + year.Purchase_of_Traded_goods + year.Employees_Cost + year.Other_Expenses
    ));

    let profitPharm = d3.sum(ph1Data.map(year => year.Net_Profit_Loss));
    profitPharm += d3.sum(ph2Data.map(year => year.Net_Profit_Loss));
    profitPharm += d3.sum(ph3Data.map(year => year.Net_Profit_Loss));
    profitPharm += d3.sum(ph4Data.map(year => year.Net_Profit_Loss));

    if (profitPharm < 0) {
        countB = 1;
        profitPharm = profitPharm * (-1);
    }
    totalExpenditurePharm = totalExpenditurePharm / 20;
    profitPharm = profitPharm / 20;

    console.log(mnm1Data);


    let totalExpenditureMnM = d3.sum(mnm1Data.map(year =>
        year.Consumption_of_Raw_Materials + year.Purchase_of_Traded_goods + year.Employees_Cost + year.Other_Expenses
    ));

    totalExpenditureMnM += d3.sum(mnm2Data.map(year =>
        year.Consumption_of_Raw_Materials + year.Purchase_of_Traded_goods + year.Employees_Cost + year.Other_Expenses
    ));
    totalExpenditureMnM += d3.sum(mnm3Data.map(year =>
        year.Consumption_of_Raw_Materials + year.Purchase_of_Traded_goods + year.Employees_Cost + year.Other_Expenses
    ));
    totalExpenditureMnM += d3.sum(mnm4Data.map(year =>
        year.Consumption_of_Raw_Materials + year.Purchase_of_Traded_goods + year.Employees_Cost + year.Other_Expenses
    ));

    let profitMnM = d3.sum(mnm1Data.map(year => year.Net_Profit_Loss));
    profitMnM += d3.sum(mnm2Data.map(year => year.Net_Profit_Loss));
    profitMnM += d3.sum(mnm3Data.map(year => year.Net_Profit_Loss));
    profitMnM += d3.sum(mnm4Data.map(year => year.Net_Profit_Loss));

    if (profitMnM < 0) {
        countC = 1;
        profitMnM = profitMnM * (-1);
    }
    totalExpenditureMnM = totalExpenditureMnM / 20;
    profitMnM = profitMnM / 20;

    console.log("hi");
    console.log(totalExpenditureMnM);
    console.log(profitMnM);

    const data = [
        { letter: 'Food and Beverages', expenditure: totalExpenditureFood, profit: profitFood },
        { letter: 'Pharmaceuticals', expenditure: totalExpenditurePharm, profit: profitPharm },
        { letter: 'Metals and Mining', expenditure: totalExpenditureMnM, profit: profitMnM },
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
        loadData().then(([file1Data, file2Data, file3Data, file4Data, ph1Data, ph2Data, ph3Data, ph4Data, mnm1Data, mnm2Data, mnm3Data, mnm4Data]) => {
            if (d.letter == 'Food and Beverages') {
                drawChartA(file1Data, file2Data, file3Data, file4Data);
            }
            else if (d.letter == 'Pharmaceuticals') {
                drawChartB(ph1Data, ph2Data, ph3Data, ph4Data);
            }
            else if (d.letter == 'Metals and Mining') {
                console.log("done");
                drawChartC(mnm1Data, mnm2Data, mnm3Data, mnm4Data);
            }

        }).catch(function (error) {
            console.log(error);
        });
    }


    // Attach event listener to the SVG container for clicks
    svg.on("click", function (event, d) {
        // Determine the clicked element
        const target = event.target;
        console.log("hi");

        // Check if the clicked element has the class "bar"
        if (target.classList.contains("bar")) {
            // Extract data bound to the clicked element
            const d = d3.select(target).datum();
            console.log(d);
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
        .attr("x", d => x(d.letter) + 30)
        .attr("width", x.bandwidth() / 2 + 10)
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
        .attr("y", d => y(d.expenditure)) // Final position
        .attr("height", d => height - y(d.expenditure)); // Final height

    // Create and append the bars for profit
    svg.selectAll(".profit")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar profit")
        .attr("x", d => x(d.letter) + 35)
        .attr("width", x.bandwidth() / 2)
        .attr("y", height) // Initial position at the bottom
        .attr("height", 0) // Initial height of 0
        .attr("stroke", "black") // Add border color
        .attr("stroke-width", 1) // Add border width
        .on("mouseover", function (event, d) {
            if (d.letter == 'Food and Beverages' && countA == 1) {
                showTooltip(event, `Loss: ${d.profit}`);
            }
            else if (d.letter == 'Pharmaceuticals' && countB == 1) {
                showTooltip(event, `Loss: ${d.profit}`);
            }
            else if (d.letter == 'Metals and Mining' && countC == 1) {
                showTooltip(event, `Loss: ${d.profit}`);
            } else {
                showTooltip(event, `Profit: ${d.profit}`);
            }
        })
        .on("mouseout", hideTooltip)
        .on("click", barClickHandler) // Add click event listener
        .transition() // Add transition for smooth animation
        .duration(1500) // Set transition duration
        .attr("y", d => y(d.profit)) // Final position
        .attr("height", d => height - y(d.profit)); // Final height


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
        .attr("transform", "translate(" + (width - 120) + "," + 5 + ")")
        .style("padding", "5px");

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
// Load data and draw chart
loadData().then(([file1Data, file2Data, file3Data, file4Data, ph1Data, ph2Data, ph3Data, ph4Data, mnm1Data, mnm2Data, mnm3Data, mnm4Data]) => {
    drawChart(file1Data, file2Data, file3Data, file4Data, ph1Data, ph2Data, ph3Data, ph4Data, mnm1Data, mnm2Data, mnm3Data, mnm4Data);
}).catch(function (error) {
    console.log(error);
});