

// create canvas element
var canvasOne = document.createElement("canvas");
canvasOne.id = "canvasOne";
canvasOne.style.width = "800px";
canvasOne.style.height = "500px";
let captionOne = document.querySelector("#table1 > caption");
captionOne.insertBefore(canvasOne, captionOne.childNodes[0]);


// Select the table cells containing the data
var dataCells = document.querySelectorAll("td");

var data = {};
var currentCountry;
for (var i = 0; i < dataCells.length; i++) {
  // Check if the current cell is the first cell in a new row
  if (i % 12 === 0) {
    // If it is, set the current country to the value of the cell
    currentCountry = dataCells[i].textContent;
    // Create an array for the current country in the data object
    data[currentCountry] = [];
  } else {
    // If it's not, push the value of the cell into the array for the current country
    data[currentCountry].push(parseFloat(dataCells[i].textContent));
  }
}

var datasets = []
var colors = ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5", "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#17becf", "#9edae5", "#fd8d3c", "#b3de69", "#fdb462", "#bc80bd", "#ccebc5", "#ffed6f", "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#c7c7c7", "#bcbd22", "#dbdb8d", "#9edae5", "#fd8d3c", "#b3de69", "#fdb462", "#d9d9d9", "#bc80bd", "#ccebc5", "#ffed6f"];
var colorIndex = 0;
for (var country in data) {
    datasets.push({
        label: country,
        data: data[country],
        backgroundColor: colors[colorIndex]
    });
    colorIndex++;
}

// Create the chart 
var ctx = document.getElementById("canvasOne").getContext("2d");
var myChart = new Chart(ctx, {
    type: "bar",
    data: {
        labels: ["2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012"], // x-axis labels
        datasets: datasets
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

