////////////// Check if JavaScript is enabled, if not hide the chart
if (!(window.Promise && window.fetch)) {
  var chart = document.getElementById("myChart");
  chart.style.display = "none";
}


//////////////  create canvas elements

var canvasOne = document.createElement("canvas");
canvasOne.id = "canvasOne";
canvasOne.style.width = "800px";
canvasOne.style.height = "500px";
let captionOne = document.querySelector("#table1 > caption");
captionOne.insertBefore(canvasOne, captionOne.childNodes[0]);

var canvasTwo = document.createElement("canvas");
canvasTwo.id = "canvasTwo";
canvasTwo.style.width = "800px";
canvasTwo.style.height = "500px";
let captionTwo = document.querySelector("#table2 > caption");
captionTwo.insertBefore(canvasTwo, captionTwo.childNodes[0]);

////////////// CHART 1:

var dataCells = document.querySelectorAll("td"); // Select the table cells containing the data

var data = {};                                  // create a variable and assign an empty object to it
var currentCountry;                             // create undefined variable
for (var i = 0; i < dataCells.length; i++) {    // create for loop to iterate over array of dataCells
  if (i % 12 === 0) {                           // check if the current cell is the first cell in a new row
    currentCountry = dataCells[i].textContent;  // if it is, set the value of currentCountry to the value of the current cell
    data[currentCountry] = [];                  // create an empty array for the current country in the data object
  } else {
    data[currentCountry].push(parseFloat(dataCells[i].textContent));  // If it's not, push the value of the cell into the array for the current country in the data object

  }
}

var datasets = []                               // create empty array 
var colors = ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5", "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#17becf", "#9edae5", "#fd8d3c", "#b3de69", "#fdb462", "#bc80bd", "#ccebc5", "#ffed6f", "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#c7c7c7", "#bcbd22", "#dbdb8d", "#9edae5", "#fd8d3c", "#b3de69", "#fdb462", "#d9d9d9", "#bc80bd", "#ccebc5", "#ffed6f", "#ffa07a", "#20b2aa", "#228b22", "#f0fff0", "#90ee90", "#ffb6c1", "#ffc0cb", "#e6e6fa"];
var colorIndex = 0;                             // create variable colorIndex initialized at 0
for (var country in data) {                     // create a for-in loop to iterate over the properties of the data object
    datasets.push({   
        label: country,                         // sets label property to current country
        data: data[country],                   // sets data property to the array of data associated with that country in the data object
        backgroundColor: colors[colorIndex]    // sets backgroundColor property to the color at the current index in the colors array
    });
    colorIndex++;                              // increment the colorIndex variable by 1 after each iteration 
}

// Create the chart 
var ctx = document.getElementById("canvasOne").getContext("2d");
datasets.sort(function(a, b) {
  return b.data[0] - a.data[0];
  });
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


////////////// CHART 2: 

var dataCells = document.querySelectorAll("td");                      // Select the table cells containing the data

var data = {};                                                        // create a variable and assign an empty object to it
var currentCountry;                                                   // create undefined variable
for (var i = 0; i < dataCells.length; i++) {                          // create for loop to iterate over array of dataCells
  if (!isNaN(parseFloat(dataCells[i].textContent))){                  //  if the data inside the cell is a number
    data[currentCountry].push(parseFloat(dataCells[i].textContent));  //  push it into the array for the current country in the data object
}
  else {                                                              // else, if it's not a number
    currentCountry = dataCells[i].textContent;                        // set the value of currentCountry to the value of the current cell
    data[currentCountry] = [];                                        // create an empty array for the current country in the data object
  }};


var datasets = []                               
var colors = ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5", "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#17becf", "#9edae5", "#fd8d3c", "#b3de69", "#fdb462", "#bc80bd", "#ccebc5", "#ffed6f", "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#c7c7c7", "#bcbd22", "#dbdb8d", "#9edae5", "#fd8d3c", "#b3de69", "#fdb462", "#d9d9d9", "#bc80bd", "#ccebc5", "#ffed6f", "#ffa07a", "#20b2aa", "#228b22", "#f0fff0", "#90ee90", "#ffb6c1", "#ffc0cb", "#e6e6fa"];
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
var ctx = document.getElementById("canvasTwo").getContext("2d");
  datasets.sort(function(a, b) {
  return b.data[0] - a.data[0];
  });
var myChart = new Chart(ctx, {
    type: "bar",
    data: {
        labels: ["2007-09", "2010-12"], // x-axis labels
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

