const profitColor = "#82CAFF";
const expenditureColor = "#4361EE";

function drawChart(file1Data, file2Data, file3Data, file4Data, ph1Data, ph2Data, ph3Data, ph4Data, mnm1Data, mnm2Data, mnm3Data, mnm4Data) {


   // Define an array of container IDs
var containerIDs = ["#parallel", "#piechart-container", "#allchart-container", "#linegraph-container","#heatmap-container"];

// Iterate over each container
containerIDs.forEach(function(containerID) {
    // Remove all SVG elements within the container
    d3.select(containerID).selectAll("svg").remove();

    // Remove all tooltips within the container
    d3.selectAll(containerID + " .tooltip").remove();

    // Remove all back buttons within the container
    d3.select(containerID).selectAll(".back-button").remove();

    // Remove all groups within the container
    d3.select(containerID).selectAll("g").remove();
});

    
    
    const margin = { top: 80, right: 0, bottom: 200, left: 60 };
    const width = 500 - margin.left - margin.right;
    const height = 850 - margin.top - margin.bottom;


    // console.log("file data:  ", file1Data);
    // console.log("ph data:  ", ph1Data);
    // console.log("mn data:  ", mnm1Data);


    const allData = [file1Data, file2Data, file3Data, file4Data, ph1Data, ph2Data, ph3Data, ph4Data, mnm1Data, mnm2Data, mnm3Data, mnm4Data];

    const treeData = [];

    allData.forEach(array => {
        array.forEach(obj => {
            // Find the index of the category that matches the object's category
            const existingCategoryIndex = treeData.findIndex(category => category.name === obj.category);

            if (existingCategoryIndex !== -1) {
                // Category exists, check if the company exists under this category
                const existingCompanyIndex = treeData[existingCategoryIndex].children.findIndex(company => company.companyName === obj.companyName);

                if (existingCompanyIndex !== -1) {
                    // Company exists, update its expenditure and profit
                    treeData[existingCategoryIndex].children[existingCompanyIndex].expenditure += parseFloat(obj.Consumption_of_Raw_Materials) + parseFloat(obj.Purchase_of_Traded_goods) + parseFloat(obj.Employees_Cost) + parseFloat(obj.Other_Expenses);
                    treeData[existingCategoryIndex].children[existingCompanyIndex].profit += parseFloat(obj.Net_Profit_Loss);
                } else {
                    // Company doesn't exist under this category, create a new company object
                    const newCompany = {
                        companyName: obj.companyName,
                        expenditure: parseFloat(obj.Consumption_of_Raw_Materials) + parseFloat(obj.Purchase_of_Traded_goods) + parseFloat(obj.Employees_Cost) + parseFloat(obj.Other_Expenses),
                        profit: parseFloat(obj.Net_Profit_Loss)
                    };

                    // Add the new company object to the children array of the existing category
                    treeData[existingCategoryIndex].children.push(newCompany);
                }
            } else {
                // Category doesn't exist, create a new category with the company as its first child
                const newCategory = {
                    name: obj.category,
                    children: [{
                        companyName: obj.companyName,
                        expenditure: parseFloat(obj.Consumption_of_Raw_Materials) + parseFloat(obj.Purchase_of_Traded_goods) + parseFloat(obj.Employees_Cost) + parseFloat(obj.Other_Expenses),
                        profit: parseFloat(obj.Net_Profit_Loss)
                    }]
                };

                // Add the new category object to the treeData array
                treeData.push(newCategory);
            }
        });
    });




    // console.log(treeData);

    const svg = d3.select("#chart-container")
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

    const xAxis = d3.axisBottom(x)
        .tickSize(10) // Increase tick size
        .tickPadding(10); // Increase padding between ticks and labels

    // Define y-axis generator function with ticks
    const yAxis = d3.axisLeft(y)
        .tickSize(10) // Increase tick size
        .tickPadding(10); // Increase padding between ticks and labels

    // Append x-axis with labels
    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis)
        .selectAll("text")
        .attr("font-size", "14px"); // Increase font size of x-axis labels
        
    // Append y-axis with labels
    svg.append("g")
        .call(yAxis)
        .selectAll("text")
        .attr("font-size", "14px");

    // Create and append the bars for expenditure
    function barClickHandler(d) {
        loadData().then(([file1Data, file2Data, file3Data, file4Data, ph1Data, ph2Data, ph3Data, ph4Data, mnm1Data, mnm2Data, mnm3Data, mnm4Data]) => {
            if (d.letter == 'Food and Beverages') {
                drawParallelA(file1Data, file2Data, file3Data, file4Data);
            }
            else if (d.letter == 'Pharmaceuticals') {
                drawParallelB(ph1Data, ph2Data, ph3Data, ph4Data);
            }
            else if (d.letter == 'Metals and Mining') {
                // console.log("done");
                drawParallelC(mnm1Data, mnm2Data, mnm3Data, mnm4Data);
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


    drawTreemap(treeData);
}

// Load data and draw chart
loadData().then(([file1Data, file2Data, file3Data, file4Data, ph1Data, ph2Data, ph3Data, ph4Data, mnm1Data, mnm2Data, mnm3Data, mnm4Data]) => {
    drawChart(file1Data, file2Data, file3Data, file4Data, ph1Data, ph2Data, ph3Data, ph4Data, mnm1Data, mnm2Data, mnm3Data, mnm4Data);
}).catch(function (error) {
    console.log(error);
});



// function treeClickHandler(d) {
//     console.log(d.value);
//     // loadData().then(([file1Data, file2Data, file3Data, file4Data, ph1Data, ph2Data, ph3Data, ph4Data, mnm1Data, mnm2Data, mnm3Data, mnm4Data]) => {
//     //     if (d.letter == 'Food and Beverages') {
//     //         drawParallelA(file1Data, file2Data, file3Data, file4Data);
//     //     }
//     //     else if (d.letter == 'Pharmaceuticals') {
//     //         drawParallelB(ph1Data, ph2Data, ph3Data, ph4Data);
//     //     }
//     //     else if (d.letter == 'Metals and Mining') {
//     //         console.log("done");
//     //         drawParallelC(mnm1Data, mnm2Data, mnm3Data, mnm4Data);
//     //     }

//     // }).catch(function (error) {
//     //     console.log(error);
//     // });
// }





function drawTreemap(treeData) {
    const margin = { top: 130, right: 0, bottom: 200, left: 40 };
    const width = 500 - margin.left - margin.right;
    const height = 850 - margin.top - margin.bottom;

    const svg = d3.select("#treemap")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const dataHierarchy = {
        name: "Categories", // Root node name
        children: treeData.map(company => ({
            name: company.category, // Assuming company has a category property
            children: company.children.map(child => ({
                name: child.companyName,
                value: child.expenditure,
                profit: child.profit

            }))
        }))
    };

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

    const root = d3.hierarchy(dataHierarchy)
        .sum(d => d.value) // Size based on profit
        .sort((a, b) => b.value - a.value); // Sort by value

    const treemap = d3.treemap()
        .size([width, height])
        .padding(0);

    treemap(root);

    const color = d3.scaleOrdinal()
        .domain(["Food and Beverages", "Pharmaceuticals", "Metals and Mining"])
        .range(["#1f77b4", "#ff7f0e", "#2ca02c"]);

    // console.log(root.leaves())
    const cell = svg.selectAll("g")
        .data(root.leaves())
        .join("g")
        .attr("transform", d => `translate(${d.x0},${d.y0})`)
        .on("mouseover", function (event, d) {
            const content = `Company: ${d.data.name}<br>Expenditure: ${d.value}<br>Profit: ${d.data.profit}`;
            showTooltip(event, content);
        })
        .on("mouseout", hideTooltip)
        .on("click", function (event, d) {
            if (event) {
                // Get the actual DOM element that was clicked
                const targetElement = event.target;

                // Get the data associated with the clicked element
                const clickedData = d3.select(this).datum();

                console.log(clickedData.data.name);
                loadData().then(([file1Data, file2Data, file3Data, file4Data, ph1Data, ph2Data, ph3Data, ph4Data, mnm1Data, mnm2Data, mnm3Data, mnm4Data]) => {
                    if (clickedData.data.name == 'KRBL') {
                        console.log("hi");
                        drawThird(file1Data);
                    }
                    else if (clickedData.data.name == 'LT') {
                        drawThird(file2Data);
                    }
                    else if (clickedData.data.name == 'Harrisons Malayalam') {
                        drawThird(file3Data);
                    }
                    else if (clickedData.data.name == 'ADF') {
                        drawThird(file4Data);
                    }
                    else if (clickedData.data.name == 'Hester Biosciences') {
                        drawThird(ph1Data);
                    }
                    else if (clickedData.data.name == 'Kopran') {
                        drawThird(ph2Data);
                    }
                    else if (clickedData.data.name == 'Themis Medicare') {
                        drawThird(ph3Data);
                    }
                    else if (clickedData.data.name == 'Ind-Swift') {
                        drawThird(ph4Data);
                    }
                    else if (clickedData.data.name == 'Godawari Power & Ispat') {
                        drawThird(mnm1Data);
                    }
                    else if (clickedData.data.name == 'Impex Ferro Tech') {
                        drawThird(mnm2Data);
                    }
                    else if (clickedData.data.name == 'Precision Wires India') {
                        drawThird(mnm3Data);
                    }
                    else if (clickedData.data.name == 'Technocraft Industries') {
                        drawThird(mnm4Data);
                    }

                }).catch(function (error) {
                    console.log(error);
                });
            }
        });


    cell.append("rect")
        .attr("width", d => d.x1 - d.x0)
        .attr("height", d => d.y1 - d.y0)
        .attr("fill", d => getColor(d.data.name)) // Assign color based on category
        .attr("stroke", "white");

    cell.append("text")
        .attr("x", 5) // Adjust the x-coordinate to move the text slightly away from the left edge
        .attr("y", 10) // Adjust the y-coordinate to center the text vertically
        .attr("fill", "white")
        .style("font-size", "10px")
        .style("font-weight", "bold")
        .text(d => `${d.data.name}`);

    // Add legend
    const legend = svg.append("g")
        .attr("class", "legend")
        .attr("transform", "translate(" + (width - 150) + "," + -70 + ")");

    const legendData = ["Food and Beverages", "Pharmaceuticals", "Metals and Mining"];

    legend.selectAll("rect")
        .data(legendData)
        .enter()
        .append("rect")
        .attr("x", 0)
        .attr("y", (d, i) => i * 20)
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill", d => color(d))
        .attr("stroke", "black")
        .attr("stroke-width", 1);;

    legend.selectAll("text")
        .data(legendData)
        .enter()
        .append("text")
        .attr("x", 15)
        .attr("y", (d, i) => i * 20 + 9)
        .text(d => d);

    function getColor(category) {
        // Define color scheme here based on categories
        const categoryColors = {
            "KRBL": "#1f77b4",
            "ADF": "#1f77b4",
            "Harrisons Malayalam": "#1f77b4",
            "LT": "#1f77b4",
            "Hester Biosciences": "#ff7f0e",
            "Themis Medicare": "#ff7f0e",
            "Kopran": "#ff7f0e",
            "Ind-Swift": "#ff7f0e",
            "Godawari Power & Ispat": "#2ca02c",
            "Impex Ferro Tech": "#2ca02c",
            "Precision Wires India": "#2ca02c",
            "Technocraft Industries": "#2ca02c"
        };

        // Return the color based on the category
        return categoryColors[category] || "gray"; // Default color for unknown categories
    }
}
