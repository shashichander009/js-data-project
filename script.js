"use strict";

//  PROBLEM NO 1
//  This function prepares a Bar Plot of India's population vs. years.

function prepIndiaChart() {
  fetch("/json/data1.json")
    .then(res => {
      return res.json();
    })
    .then(indiaData => {
      indiaData = Object.entries(indiaData);
      Highcharts.chart("container", {
        chart: {
          type: "column"
        },
        title: {
          text: "India's Population Over the Years"
        },
        subtitle: {
          text: `Source: <a href='https://datahub.io/core/
          population-growth-estimates-and-projections/r/
          population-estimates.csv'>United Nations</a>`
        },
        xAxis: {
          type: "category",
          labels: {
            rotation: -45,
            style: {
              fontSize: "10px",
              fontFamily: "Verdana, sans-serif"
            }
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: "Population (crores)"
          }
        },
        legend: {
          enabled: true
        },
        tooltip: {
          pointFormat: "Population : <b>{point.y:.1f} crores</b>"
        },
        series: [
          {
            name: "Year (1950-2015)",
            data: indiaData
          }
        ]
      });
    });
}

//  PROBLEM NO 2
//  This function prepares the Bar Chart of population of ASEAN countries in 2014
//  ASEAN is a collection of South East Asian countries.

function prepAseanChart() {
  fetch("/json/data2.json")
    .then(response => {
      return response.json();
    })
    .then(aseanData => {
      aseanData = Object.entries(aseanData);

      for (let i = 0; i < aseanData.length; i++) {
        let country = aseanData[i][0];

        if (country == "Viet Nam") aseanData[i][0] = "VietNam";
        if (country == "Brunei Darussalam") aseanData[i][0] = "Brunei";
        if (country == "Lao People's Democratic Republic")
          aseanData[i][0] = "Laos";
      }

      Highcharts.chart("container", {
        chart: {
          type: "column"
        },
        title: {
          text: "ASEAN Countries Population in 2014"
        },
        subtitle: {
          text: `Source: <a href='https://datahub.io/core/
          population-growth-estimates-and-projections/r/
          population-estimates.csv'>United Nations</a>`
        },
        xAxis: {
          type: "category",
          labels: {
            style: {
              fontSize: "13px",
              fontFamily: "Verdana, sans-serif"
            }
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: "Population (crores)"
          }
        },
        legend: {
          enabled: true
        },
        tooltip: {
          pointFormat: "Population : <b>{point.y:.2f} crores</b>"
        },
        series: [
          {
            name: "Countries",
            data: aseanData
          }
        ]
      });
    });
}

//  PROBLEM NO 3
//  TOTAL population of SAARC countries over the past years
//  In this case for each year we have to calculate total
//  population of all SAARC countries.
//  Then plot a BAR CHART of Total SAARC population vs. year.

function prepSaarcChart() {
  fetch("/json/data3.json")
    .then(response => {
      return response.json();
    })
    .then(saarcData => {
      saarcData = Object.entries(saarcData);
      Highcharts.chart("container", {
        chart: {
          type: "column"
        },
        title: {
          text: "SAARC Countries Population Over the Years"
        },
        subtitle: {
          text: `Source: <a href='https://datahub.io/core/
          population-growth-estimates-and-projections/r/
          population-estimates.csv'>United Nations</a>`
        },
        xAxis: {
          type: "category",
          labels: {
            rotation: -45,
            style: {
              fontSize: "10px",
              fontFamily: "Verdana, sans-serif"
            }
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: "Population (crores)"
          }
        },
        legend: {
          enabled: true
        },
        tooltip: {
          pointFormat: "Population : <b>{point.y:.2f} crores</b>"
        },
        series: [
          {
            name: "Year (1950-2015)",
            data: saarcData
          }
        ]
      });
    });
}

//  PROBLEM NO 4
//  Grouped Bar Chart - ASEAN population vs. years
//  We will plot population of ASEAN countries as
//  groups over the years 2011 - 2015.

function prepAseanGroupChart() {
  fetch("/json/data4.json")
    .then(response => {
      return response.json();
    })
    .then(aseanGroupData => {
      aseanGroupData = Object.entries(aseanGroupData);

      let seriesArray = [];

      let counter = 0;
      for (let i = 0; i < aseanGroupData.length; i += 5) {
        var country = aseanGroupData[i][0].split("-")[0];

        if (country == "Viet Nam") country = "VietNam";
        if (country == "Brunei Darussalam") country = "Brunei";
        if (country == "Lao People's Democratic Republic") country = "Laos";

        let obj = {
          name: country,
          data: []
        };

        for (let j = 0; j < 5; j++) {
          obj.data.push(aseanGroupData[counter][1]);
          counter++;
        }

        seriesArray.push(obj);
      }
      Highcharts.chart("container", {
        chart: {
          type: "column"
        },
        title: {
          text: "ASEAN Population (2011-2015)"
        },
        subtitle: {
          text: `Source: <a href='https://datahub.io/core/
          population-growth-estimates-and-projections/r/
          population-estimates.csv'>United Nations</a>`
        },
        xAxis: {
          categories: ["2011", "2012", "2013", "2014", "2015"],
          crosshair: true
        },
        yAxis: {
          min: 0,
          title: {
            text: "Population (cr)"
          }
        },
        tooltip: {
          headerFormat:
            '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat:
            '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.2f} cr</b></td></tr>',
          footerFormat: "</table>",
          shared: true,
          useHTML: true
        },
        plotOptions: {
          column: {
            pointPadding: 0.2,
            borderWidth: 0
          }
        },
        series: seriesArray
      });
    });
}
