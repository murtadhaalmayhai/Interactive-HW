// @TODO: Complete the following function that builds the metadata panel



function buildMetadata(sample) {

  // Use `d3.json` to fetch the metadata for a sample

  const meta_url = "/metadata/" + sample;

  // Use d3 to select the panel with id of `#sample-metadata`

  const meta_data = d3.select("#sample-metadata");

  // Use `.html("") to clear any existing metadata

  meta_data.html("");

  // Use `Object.entries` to add each key and value pair to the panel

  // Hint: Inside the loop, you will need to use d3 to append new

  // tags for each key-value in the metadata.

  d3.json(meta_url).then(function (data) {

    Object.entries(data).forEach(([key, value]) => {

      meta_data.append("h6").text(`${key}: ${value}`

      );

    })

  })

}



function buildCharts(sample) {

// @TODO: Use `d3.json` to fetch the sample data for the plots

  const chart_url = "/samples/" + sample;

  d3.json(chart_url).then(function (data) {

// @TODO: Build a Bubble Chart using the sample data

 

//  @TODO: Build a Pie Chart

    // HINT: You will need to use slice() to grab the top 10 sample_values,

    // otu_ids, and labels (10 each).

    var data = [{

      values: data.sample_values.slice(0, 10),

      labels: data.otu_ids.slice(0, 10),

      hovertext: data.otu_labels.slice(0, 10),

      type: 'pie',

    }];

    const layout = {

      showlegend: true,

    };

    Plotly.newPlot('pie', data, layout);

  }

)}





function init() {

// Grab a reference to the dropdown select element

const selector = d3.select("#selDataset");



// Use the list of sample names to populate the select options

d3.json("/names").then((sampleNames) => {

  sampleNames.forEach((sample) => {

    selector

      .append("option")

      .text(sample)

      .property("value", sample);

  });



  // Use the first sample from the list to build the initial plots

  const firstSample = sampleNames[0];

  buildCharts(firstSample);

  buildMetadata(firstSample);

});

}



function optionChanged(newSample) {

// Fetch new data each time a new sample is selected

buildCharts(newSample);

buildMetadata(newSample);

}



// Initialize the dashboard

init();