import Chart from 'chart.js/auto'

////////////// Check if JavaScript is enabled, if not hide the chart
if (!(window.Promise && window.fetch)) {
  let chart = document.getElementById("myChart");
  chart.style.display = "none";
}

//////////////  create canvas elements

const canvasZero = document.createElement("canvas");
canvasZero.id = "canvasZero";
canvasZero.style.width = "800px";
canvasZero.style.height = "500px";
let body = document.getElementById("bodyContent");
body.insertBefore(canvasZero, body.childNodes[0]);

const canvasOne = '<canvas id="canvasOne" width="800" height="500" class="graph"></canvas>';
table1.insertAdjacentHTML ('beforebegin', canvasOne);

const canvasTwo = '<canvas id="canvasTwo" width="800" height="500" class="graph"></canvas>';
table2.insertAdjacentHTML ('beforebegin', canvasTwo);


////////////// CHART 1:

const dataCells = document.querySelectorAll("td"); // Select the table cells containing the data

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

var countries = [...table2.querySelectorAll("td")].filter(td => td.cellIndex === 1).map(td => td.innerText);
var thirdColumn = [...table2.querySelectorAll("td")].filter(td => td.cellIndex === 2).map(td => td.innerText);
var fourthColumn = [...table2.querySelectorAll("td")].filter(td => td.cellIndex === 3).map(td => td.innerText);
var years = [...table2.querySelectorAll("thead th")].map(th => th.innerText)

var ctx = document.getElementById("canvasTwo").getContext("2d");
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
      labels: countries,
      datasets: [{
          label: years[2],
          data: thirdColumn,
          backgroundColor: "rgba(173, 128, 255, 0.5)",
          borderColor: "rgba(173, 128, 255, 0.5)",
          borderWidth: 1
      },
      {
          label: years[3],
          data: fourthColumn,
          backgroundColor: "rgba(75, 192, 192, 0.5)",
          borderColor: "rgba(75, 192, 192, 0.5)",
          borderWidth: 1
      }]
  },
  options: {
      scales: {
          y: {
              beginAtZero: true
          }
      }
  }
});

////////////// CHART 3:

var dataPoints = [];
var chart;
chart = new Chart(canvasZero, {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "Live Chart",
        data: [],
        backgroundColor: "rgba(173, 128, 255, 0.3)",
        borderColor: "rgba(173, 128, 255, 0.7)",
        borderWidth: 1,
      },
    ],
  },
  options: {},
});
updateChart();
function updateChart() {
  dataPoints = [];
  fetch("https://canvasjs.com/services/data/datapoints.php", {
    cache: "no-cache",
  })
    .then((response) => response.json())
    .then((data) => {
      for (var i = 0; i < data.length; i++) {
        dataPoints.push({ x: data[i][0], y: parseInt(data[i][1]) });
      }
      chart.data.labels = dataPoints.map((d) => d.x);
      chart.data.datasets[0].data = dataPoints.map((d) => d.y);
      chart.update();
      setTimeout(function () {
        updateChart();
      }, 1000);
    });
}
