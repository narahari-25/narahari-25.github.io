function loadData() {
    let file1Data = [];
    let file2Data = [];
    let file3Data = [];
    let file4Data = [];
    let ph1Data = [];
    let ph2Data = [];
    let ph3Data = [];
    let ph4Data = [];
    let mnm1Data = [];
    let mnm2Data = [];
    let mnm3Data = [];
    let mnm4Data = [];
    return Promise.all([
        d3.csv("food/KRBL_annual_results.csv").then(function (csvData1) {
            const years1 = Object.keys(csvData1[0]).slice(1);
            console.log("this should ah");
            console.log(years1  );
            years1.forEach(year => {
                let yearData = {
                    year: year,
                    Consumption_of_Raw_Materials: parseFloat(csvData1.find(row => row["Yearly Results of KRBL (in Rs. Cr.)"] === "Consumption of Raw Materials")[year].replace(/,/g, '').replace('(', '-').replace(')', '')),
                    Purchase_of_Traded_goods: parseFloat(csvData1.find(row => row["Yearly Results of KRBL (in Rs. Cr.)"] === "Purchase of Traded Goods")[year].replace(/,/g, '').replace('(', '-').replace(')', '')),
                    Employees_Cost: parseFloat(csvData1.find(row => row["Yearly Results of KRBL (in Rs. Cr.)"] === "Employees Cost")[year].replace(/,/g, '').replace('(', '-').replace(')', '')),
                    Other_Expenses: parseFloat(csvData1.find(row => row["Yearly Results of KRBL (in Rs. Cr.)"] === "Other Expenses")[year].replace(/,/g, '').replace('(', '-').replace(')', '')),
                    Net_Profit_Loss: parseFloat(csvData1.find(row => row["Yearly Results of KRBL (in Rs. Cr.)"] === "Net Profit/(Loss) For the Period")[year].replace(/,/g, '').replace('(', '-').replace(')', ''))
                };
                file1Data.push(yearData);
            });
            return file1Data;
        }),
        d3.csv("food/LT Foods_annual_results.csv").then(function (csvData2) {
            const years2 = Object.keys(csvData2[0]).slice(1);
            years2.forEach(year => {
                let yearData = {
                    year: year,
                    Consumption_of_Raw_Materials: parseFloat(csvData2.find(row => row["Yearly Results of LT Foods (in Rs. Cr.)"] === "Consumption of Raw Materials")[year].replace(/,/g, '').replace('(', '-').replace(')', '')),
                    Purchase_of_Traded_goods: parseFloat(csvData2.find(row => row["Yearly Results of LT Foods (in Rs. Cr.)"] === "Purchase of Traded Goods")[year].replace(/,/g, '').replace('(', '-').replace(')', '')),
                    Employees_Cost: parseFloat(csvData2.find(row => row["Yearly Results of LT Foods (in Rs. Cr.)"] === "Employees Cost")[year].replace(/,/g, '').replace('(', '-').replace(')', '')),
                    Other_Expenses: parseFloat(csvData2.find(row => row["Yearly Results of LT Foods (in Rs. Cr.)"] === "Other Expenses")[year].replace(/,/g, '').replace('(', '-').replace(')', '')),
                    Net_Profit_Loss: parseFloat(csvData2.find(row => row["Yearly Results of LT Foods (in Rs. Cr.)"] === "Net Profit/(Loss) For the Period")[year].replace(/,/g, '').replace('(', '-').replace(')', ''))
                };
                file2Data.push(yearData);
            });
            return file2Data;
        }),
        d3.csv("food/Harrisons Malay_annual_results.csv").then(function (csvData3) {
            const years3 = Object.keys(csvData3[0]).slice(1);
            years3.forEach(year => {
                let yearData = {
                    year: year,
                    Consumption_of_Raw_Materials: parseFloat(csvData3.find(row => row["Yearly Results of Harrisons Malyalam (in Rs. Cr.)"] === "Consumption of Raw Materials")[year].replace(/,/g, '').replace('(', '-').replace(')', '')),
                    Purchase_of_Traded_goods: parseFloat(csvData3.find(row => row["Yearly Results of Harrisons Malyalam (in Rs. Cr.)"] === "Purchase of Traded Goods")[year].replace(/,/g, '').replace('(', '-').replace(')', '')),
                    Employees_Cost: parseFloat(csvData3.find(row => row["Yearly Results of Harrisons Malyalam (in Rs. Cr.)"] === "Employees Cost")[year].replace(/,/g, '').replace('(', '-').replace(')', '')),
                    Other_Expenses: parseFloat(csvData3.find(row => row["Yearly Results of Harrisons Malyalam (in Rs. Cr.)"] === "Other Expenses")[year].replace(/,/g, '').replace('(', '-').replace(')', '')),
                    Net_Profit_Loss: parseFloat(csvData3.find(row => row["Yearly Results of Harrisons Malyalam (in Rs. Cr.)"] === "Net Profit/(Loss) For the Period")[year].replace(/,/g, '').replace('(', '-').replace(')', ''))
                };
                file3Data.push(yearData);
            });
            return file3Data;
        }),
        d3.csv("food/ADF Foods_annual_results.csv").then(function (csvData4) {
            const years4 = Object.keys(csvData4[0]).slice(1);
            years4.forEach(year => {
                let yearData = {
                    year: year,
                    Consumption_of_Raw_Materials: parseFloat(csvData4.find(row => row["Yearly Results of ADF Foods Industries (in Rs. Cr.)"] === "Consumption of Raw Materials")[year].replace(/,/g, '').replace('(', '-').replace(')', '')),
                    Purchase_of_Traded_goods: parseFloat(csvData4.find(row => row["Yearly Results of ADF Foods Industries (in Rs. Cr.)"] === "Purchase of Traded Goods")[year].replace(/,/g, '').replace('(', '-').replace(')', '')),
                    Employees_Cost: parseFloat(csvData4.find(row => row["Yearly Results of ADF Foods Industries (in Rs. Cr.)"] === "Employees Cost")[year].replace(/,/g, '').replace('(', '-').replace(')', '')),
                    Other_Expenses: parseFloat(csvData4.find(row => row["Yearly Results of ADF Foods Industries (in Rs. Cr.)"] === "Other Expenses")[year].replace(/,/g, '').replace('(', '-').replace(')', '')),
                    Net_Profit_Loss: parseFloat(csvData4.find(row => row["Yearly Results of ADF Foods Industries (in Rs. Cr.)"] === "Net Profit/(Loss) For the Period")[year].replace(/,/g, '').replace('(', '-').replace(')', ''))
                };
                file4Data.push(yearData);
            });
            return file4Data;
        }),
        d3.csv("pharmaceuticals/HB_annual_results.csv").then(function (csvData5) {
            const years5 = Object.keys(csvData5[0]).slice(1);
            years5.forEach(year => {
                let yearData = {
                    year: year,
                    Consumption_of_Raw_Materials: parseFloat(csvData5.find(row => row["Yearly Results of Hester Biosciences (in Rs. Cr.)"] === "Consumption of Raw Materials")[year].replace(/,/g, '').replace('(', '-').replace(')', '')),
                    Purchase_of_Traded_goods: parseFloat(csvData5.find(row => row["Yearly Results of Hester Biosciences (in Rs. Cr.)"] === "Purchase of Traded Goods")[year].replace(/,/g, '').replace('(', '-').replace(')', '')),
                    Employees_Cost: parseFloat(csvData5.find(row => row["Yearly Results of Hester Biosciences (in Rs. Cr.)"] === "Employees Cost")[year].replace(/,/g, '').replace('(', '-').replace(')', '')),
                    Other_Expenses: parseFloat(csvData5.find(row => row["Yearly Results of Hester Biosciences (in Rs. Cr.)"] === "Other Expenses")[year].replace(/,/g, '').replace('(', '-').replace(')', '')),
                    Net_Profit_Loss: parseFloat(csvData5.find(row => row["Yearly Results of Hester Biosciences (in Rs. Cr.)"] === "Net Profit/(Loss) For the Period")[year].replace(/,/g, '').replace('(', '-').replace(')', ''))
                };
                ph1Data.push(yearData);
            });
            return ph1Data;
        }),
        d3.csv("pharmaceuticals/Kopran_annual_results.csv").then(function (csvData6) {
            const years6 = Object.keys(csvData6[0]).slice(1);
            years6.forEach(year => {
                let yearData = {
                    year: year,
                    Consumption_of_Raw_Materials: parseFloat(csvData6.find(row => row["Yearly Results of Kopran (in Rs. Cr.)"] === "Consumption of Raw Materials")[year].replace(/,/g, '').replace('(', '-').replace(')', '')),
                    Purchase_of_Traded_goods: parseFloat(csvData6.find(row => row["Yearly Results of Kopran (in Rs. Cr.)"] === "Purchase of Traded Goods")[year].replace(/,/g, '').replace('(', '-').replace(')', '')),
                    Employees_Cost: parseFloat(csvData6.find(row => row["Yearly Results of Kopran (in Rs. Cr.)"] === "Employees Cost")[year].replace(/,/g, '').replace('(', '-').replace(')', '')),
                    Other_Expenses: parseFloat(csvData6.find(row => row["Yearly Results of Kopran (in Rs. Cr.)"] === "Other Expenses")[year].replace(/,/g, '').replace('(', '-').replace(')', '')),
                    Net_Profit_Loss: parseFloat(csvData6.find(row => row["Yearly Results of Kopran (in Rs. Cr.)"] === "Net Profit/(Loss) For the Period")[year].replace(/,/g, '').replace('(', '-').replace(')', ''))
                };
                ph2Data.push(yearData);
            });
            return ph2Data;
        }),
        d3.csv("pharmaceuticals/TM_annual_results.csv").then(function (csvData7) {
            const years7 = Object.keys(csvData7[0]).slice(1);
            years7.forEach(year => {
                let yearData = {
                    year: year,
                    Consumption_of_Raw_Materials: parseFloat(csvData7.find(row => row["Yearly Results of Themis Medicare (in Rs. Cr.)"] === "Consumption of Raw Materials")[year].replace(/,/g, '').replace('(', '-').replace(')', '')),
                    Purchase_of_Traded_goods: parseFloat(csvData7.find(row => row["Yearly Results of Themis Medicare (in Rs. Cr.)"] === "Purchase of Traded Goods")[year].replace(/,/g, '').replace('(', '-').replace(')', '')),
                    Employees_Cost: parseFloat(csvData7.find(row => row["Yearly Results of Themis Medicare (in Rs. Cr.)"] === "Employees Cost")[year].replace(/,/g, '').replace('(', '-').replace(')', '')),
                    Other_Expenses: parseFloat(csvData7.find(row => row["Yearly Results of Themis Medicare (in Rs. Cr.)"] === "Other Expenses")[year].replace(/,/g, '').replace('(', '-').replace(')', '')),
                    Net_Profit_Loss: parseFloat(csvData7.find(row => row["Yearly Results of Themis Medicare (in Rs. Cr.)"] === "Net Profit/(Loss) For the Period")[year].replace(/,/g, '').replace('(', '-').replace(')', ''))
                };
                ph3Data.push(yearData);
            });
            return ph3Data;
        }),
        d3.csv("pharmaceuticals/IS_annual_results.csv").then(function (csvData8) {
            const years8 = Object.keys(csvData8[0]).slice(1);
            console.log("this should");
            console.log(years8);
            years8.forEach(year => {
                let yearData = {
                    year: year,
                    Consumption_of_Raw_Materials: parseFloat(csvData8.find(row => row["Yearly Results of Ind-Swift (in Rs. Cr.)"] === "Consumption of Raw Materials")[year].replace(/,/g, '').replace('(', '-').replace(')', '')),
                    Purchase_of_Traded_goods: parseFloat(csvData8.find(row => row["Yearly Results of Ind-Swift (in Rs. Cr.)"] === "Purchase of Traded Goods")[year].replace(/,/g, '').replace('(', '-').replace(')', '')),
                    Employees_Cost: parseFloat(csvData8.find(row => row["Yearly Results of Ind-Swift (in Rs. Cr.)"] === "Employees Cost")[year].replace(/,/g, '').replace('(', '-').replace(')', '')),
                    Other_Expenses: parseFloat(csvData8.find(row => row["Yearly Results of Ind-Swift (in Rs. Cr.)"] === "Other Expenses")[year].replace(/,/g, '').replace('(', '-').replace(')', '')),
                    Net_Profit_Loss: parseFloat(csvData8.find(row => row["Yearly Results of Ind-Swift (in Rs. Cr.)"] === "Net Profit/(Loss) For the Period")[year].replace(/,/g, '').replace('(', '-').replace(')', ''))
                };
                ph4Data.push(yearData);
            });
            return ph4Data;
        }),
        d3.csv("metalsAndMining/Godawari Power_annual_results.csv").then(function (csvData9) {
            const years9 = Object.keys(csvData9[0]).slice(1);
            console.log("this");
            console.log(years9);
            years9.forEach(year => {
                let yearData = {
                    year: year,
                    Consumption_of_Raw_Materials: parseFloat(csvData9.find(row => row["Yearly Results of Godawari Power & Ispat (in Rs. Cr.)"] === "Consumption of Raw Materials")[year].replace(/,/g, '').replace('(', '-').replace(')', '')),
                    Purchase_of_Traded_goods: parseFloat(csvData9.find(row => row["Yearly Results of Godawari Power & Ispat (in Rs. Cr.)"] === "Purchase of Traded Goods")[year].replace(/,/g, '').replace('(', '-').replace(')', '')),
                    Employees_Cost: parseFloat(csvData9.find(row => row["Yearly Results of Godawari Power & Ispat (in Rs. Cr.)"] === "Employees Cost")[year].replace(/,/g, '').replace('(', '-').replace(')', '')),
                    Other_Expenses: parseFloat(csvData9.find(row => row["Yearly Results of Godawari Power & Ispat (in Rs. Cr.)"] === "Other Expenses")[year].replace(/,/g, '').replace('(', '-').replace(')', '')),
                    Net_Profit_Loss: parseFloat(csvData9.find(row => row["Yearly Results of Godawari Power & Ispat (in Rs. Cr.)"] === "Net Profit/(Loss) For the Period")[year].replace(/,/g, '').replace('(', '-').replace(')', ''))
                };
                mnm1Data.push(yearData);
                console.log(mnm1Data);
            });
            return mnm1Data;
        }),
        d3.csv("metalsAndMining/Impex FerroTech_annual_results.csv").then(function (csvData10) {
            const years10 = Object.keys(csvData10[0]).slice(1);
            years10.forEach(year => {
                let yearData = {
                    year: year,
                    Consumption_of_Raw_Materials: parseFloat(csvData10.find(row => row["Yearly Results of Impex Ferro Tech (in Rs. Cr.)"] === "Consumption of Raw Materials")[year].replace(/,/g, '').replace('(', '-').replace(')', '')),
                    Purchase_of_Traded_goods: parseFloat(csvData10.find(row => row["Yearly Results of Impex Ferro Tech (in Rs. Cr.)"] === "Purchase of Traded Goods")[year].replace(/,/g, '').replace('(', '-').replace(')', '')),
                    Employees_Cost: parseFloat(csvData10.find(row => row["Yearly Results of Impex Ferro Tech (in Rs. Cr.)"] === "Employees Cost")[year].replace(/,/g, '').replace('(', '-').replace(')', '')),
                    Other_Expenses: parseFloat(csvData10.find(row => row["Yearly Results of Impex Ferro Tech (in Rs. Cr.)"] === "Other Expenses")[year].replace(/,/g, '').replace('(', '-').replace(')', '')),
                    Net_Profit_Loss: parseFloat(csvData10.find(row => row["Yearly Results of Impex Ferro Tech (in Rs. Cr.)"] === "Net Profit/(Loss) For the Period")[year].replace(/,/g, '').replace('(', '-').replace(')', ''))
                };
                mnm2Data.push(yearData);
            });
            return mnm2Data;
        }),
        d3.csv("metalsAndMining/Precision Wires_annual_results.csv").then(function (csvData11) {
            const years11 = Object.keys(csvData11[0]).slice(1);
            years11.forEach(year => {
                let yearData = {
                    year: year,
                    Consumption_of_Raw_Materials: parseFloat(csvData11.find(row => row["Yearly Results of Precision Wires India (in Rs. Cr.)"] === "Consumption of Raw Materials")[year].replace(/,/g, '').replace('(', '-').replace(')', '')),
                    Purchase_of_Traded_goods: parseFloat(csvData11.find(row => row["Yearly Results of Precision Wires India (in Rs. Cr.)"] === "Purchase of Traded Goods")[year].replace(/,/g, '').replace('(', '-').replace(')', '')),
                    Employees_Cost: parseFloat(csvData11.find(row => row["Yearly Results of Precision Wires India (in Rs. Cr.)"] === "Employees Cost")[year].replace(/,/g, '').replace('(', '-').replace(')', '')),
                    Other_Expenses: parseFloat(csvData11.find(row => row["Yearly Results of Precision Wires India (in Rs. Cr.)"] === "Other Expenses")[year].replace(/,/g, '').replace('(', '-').replace(')', '')),
                    Net_Profit_Loss: parseFloat(csvData11.find(row => row["Yearly Results of Precision Wires India (in Rs. Cr.)"] === "Net Profit/(Loss) For the Period")[year].replace(/,/g, '').replace('(', '-').replace(')', ''))
                };
                mnm3Data.push(yearData);
            });
            return mnm3Data;
        }),
        d3.csv("metalsAndMining/Technocraft Ind_annual_results.csv").then(function (csvData12) {
            const years12 = Object.keys(csvData12[0]).slice(1);
            years12.forEach(year => {
                let yearData = {
                    year: year,
                    Consumption_of_Raw_Materials: parseFloat(csvData12.find(row => row["Yearly Results of Technocraft Industries (India) (in Rs. Cr.)"] === "Consumption of Raw Materials")[year].replace(/,/g, '').replace('(', '-').replace(')', '')),
                    Purchase_of_Traded_goods: parseFloat(csvData12.find(row => row["Yearly Results of Technocraft Industries (India) (in Rs. Cr.)"] === "Purchase of Traded Goods")[year].replace(/,/g, '').replace('(', '-').replace(')', '')),
                    Employees_Cost: parseFloat(csvData12.find(row => row["Yearly Results of Technocraft Industries (India) (in Rs. Cr.)"] === "Employees Cost")[year].replace(/,/g, '').replace('(', '-').replace(')', '')),
                    Other_Expenses: parseFloat(csvData12.find(row => row["Yearly Results of Technocraft Industries (India) (in Rs. Cr.)"] === "Other Expenses")[year].replace(/,/g, '').replace('(', '-').replace(')', '')),
                    Net_Profit_Loss: parseFloat(csvData12.find(row => row["Yearly Results of Technocraft Industries (India) (in Rs. Cr.)"] === "Net Profit/(Loss) For the Period")[year].replace(/,/g, '').replace('(', '-').replace(')', ''))
                };
                mnm4Data.push(yearData);
            });
            return mnm4Data;
        }),

    ]);
}