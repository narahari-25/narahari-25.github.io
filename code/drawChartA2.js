function drawChartA2(file2Data) {
    d3.select("#chart").selectAll("svg").remove();
    d3.selectAll(".tooltip").remove();
    d3.select("#chart").selectAll("g").remove();

    console.log("YYYY")

    

    // Create SVG element
    const svg = d3
        .select("#chart")
        .html("")
        .append("svg")
        .attr("width", 800)
        .attr("height", 600)
        .attr("transform", `translate(${300}, ${0})`)
        .style('padding', '20px');

    // Define keys for stacked bar chart, edit data
    const keys = ['Consumption_of_Raw_Materials', 'Purchase_of_Traded_goods', 'Employees_Cost', 'Other_Expenses'];
    file2Data = file2Data.filter(item => item.year.trim() != "");
    file2Data.forEach(item => {
        item.total_expenditure = keys.reduce((sum, key) => sum + (item[key] || 0), 0);
    });

    // Stack the data
    const stackedData = d3.stack()
        .keys(keys)
        .value((d, key) => d[key])
        (file2Data);

    console.log("file2Data");
    console.log(file2Data);
    console.log("stackedData");
    console.log(stackedData);

    // Set up dimensions and margins
    const margin = { top: 20, right: 100, bottom: 100, left: 100, legend: 200 };
    const width = +svg.attr("width") - margin.left - margin.right - margin.legend;
    const height = +svg.attr("height") - margin.top - margin.bottom;

    // Create x and y axes
    const g = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
        .domain(file2Data.map(d => d.year))
        .range([0, width])
        .padding(0.1);
    g.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

    var y_maxBar = d3.max(file2Data, d => d.total_expenditure);
    var y_maxLine = d3.max(file2Data, d => d.Net_Profit_Loss);
    var y_max = d3.max([y_maxBar, y_maxLine])

    const y = d3.scaleLinear()
        .domain([0, y_max + y_max * 0.10])
        .range([height, 0]);
    g.append("g")
        .call(d3.axisLeft(y));

    // Add labels to x and y axes

    g.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("y", -margin.left + margin.left / 4)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text(`Earnings`);

    g.append("text")
        .attr("x", width / 2)
        .attr("y", height + margin.bottom / 2)
        .attr("text-anchor", "middle")
        .text(`Year`);

    // Define colors for stacked bars
    const colorScheme = d3.scaleOrdinal()
        .domain(keys)
        .range(d3.schemePastel2);

    // Define tooltip

    const tooltip = d3
        .select("#chart")
        .append("div")
        .attr("class", "tooltip")
        .style('position', 'absolute')
        .style('opacity', 0)
        .style('background-color', 'white')
        .style('color', 'black')
        .style('text-align', 'center')
        .style('font-size', '12px')
        .style('padding', '9px')
        .style('padding-top', '5px')
        .style('padding-bottom', '5px')
        .style('border-radius', '9px');

    // Add stacked bars

    const gBars = svg.append("g");

    gBars.append("g")
        .selectAll("g")
        .data(stackedData)
        .join("g")
        .attr("fill", d => colorScheme(d.key))
        .selectAll("rect")
        .data(d => d)
        .join("rect")
        .attr("x", d => x(d.data.year) + margin.left)
        .attr("y", height) // Initial position at the bottom
        .attr("height", 0) // Initial height of 0

        .attr("width", x.bandwidth())
        .attr("stroke", "grey")
        .on("mousemove", (event, d) => {
            const parentD = d3.select(event.currentTarget.parentNode).datum();
            tooltip
                .html(`${parentD.key.replace(/_/g, " ")}: <br> ${d.data[parentD.key]}`)
                .style("opacity", 1)
                .style("top", event.pageY - 10 + "px")
                .style("left", event.pageX + 10 + "px");
        })
        .on("mouseout", () => {
            tooltip
                .style("opacity", 0);
        })
        .transition() // Add transition for smooth animation
        .duration(1500) // Set transition duration
        .attr("y", d => y(d[1]) + margin.top)
        .attr("height", d => y(d[0]) - y(d[1]));

    // Add legend
    const legend = svg => {

        const g = svg
            .attr("transform", `translate(${width + margin.left + margin.legend}, ${margin.top})`)
            .attr("text-anchor", "end")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .selectAll("g")
            .data(colorScheme.domain().slice().reverse())
            .join("g")
            .attr("transform", (d, i) => `translate(0,${i * 20})`);

        g.append("rect")
            .attr("x", -19)
            .attr("width", 17)
            .attr("height", 17)
            .attr("stroke", "grey")
            .attr("fill", colorScheme);

        g.append("text")
            .attr("x", -24)
            .attr("y", 8)
            .attr("dy", "0.35em")
            .text(d => d.replace(/_/g, " "));
    };

    const gLegend = svg.append("g");
    gLegend.call(legend);

    // Draw line chart for net profit/loss

    const line = d3.line()
        .x(d => x(d.year) + margin.left + x.bandwidth() / 2)
        .y(d => y(d.Net_Profit_Loss) + margin.top); // Adjusted to include margin.top

    const gLine = svg.append("g");

    gLine.append("path")
        .datum(file2Data)
        .attr("fill", "none")
        .attr("stroke", "dimgrey")
        .attr("stroke-width", 1.5)
        .attr("d", line);

    gLine.selectAll('.dot')
        .data(file2Data)
        .enter().append('circle')
        .attr('class', 'dot')
        .attr('cx', d => x(d.year) + margin.left + x.bandwidth() / 2)
        .attr('cy', d => y(d.Net_Profit_Loss) + margin.top)
        .attr('r', 3)
        .attr('fill', 'dimgrey')
        .style('opacity', 0) // Initially hidden
        .on('mouseover', function (event, d) {
            d3.select(this).style('opacity', 1); // Show dot on mouseover
            tooltip.style('opacity', 1)
                .html(`Year: ${d.year}<br>Net Profit/Loss: ${d.Net_Profit_Loss}`)
                .style('top', (event.pageY - 10) + 'px')
                .style('left', (event.pageX + 10) + 'px');
        })
        .on('mouseout', function () {
            d3.select(this).style('opacity', 0); // Hide dot on mouseout
            tooltip.style('opacity', 0);
        });

    gLine.selectAll('.label')
        .data(file2Data)
        .enter().append('text')
        .attr('class', 'label')
        .attr('x', d => x(d.year) + margin.left + x.bandwidth() / 2)
        .attr('y', d => y(d.Net_Profit_Loss) + margin.top - 10)
        .text(d => d.Net_Profit_Loss)
        .attr('text-anchor', 'middle')
        .attr('font-size', '10px')
        .attr('fill', 'black')
        .style('opacity', 0); // Initially hidden

    // Add event listeners to show/hide labels and dots on line chart
    gLine.on('mouseover', function () {
        gLine.selectAll('.dot').style('opacity', 1);
        gLine.selectAll('.label').style('opacity', 1);
    }).on('mouseout', function () {
        gLine.selectAll('.dot').style('opacity', 0);
        gLine.selectAll('.label').style('opacity', 0);
    });
}

