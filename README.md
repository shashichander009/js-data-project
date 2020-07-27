# UN Population Data Analysis

Do you want to understand how the world population has grown over the years? This project will show you the world population growth story through beautiful charts.  

## Data

We are using data released by [United Nations]( https://datahub.io/core/population-growth-estimates-and-projections/r/population-estimates.csv) to understand the population growth.

## Language and Libraries

This project is built with HTML, CSS, JavaScript and Python 3.7.4. For charting, have used [highcharts]( https://www.highcharts.com/)


## Installation

clone this repo

create a virtual environment and activate it (if you need help,please refer to this [link]( https://packaging.python.org/guides/installing-using-pip-and-virtual-environments/))

install all dependencies

```bash
pip install -r requirements.txt
```

Last Step, run the program 

```bash
python un_data_analysis.py
```

## Usage
When you run this first time, you will get two options

```bash
0: Download Data
5: Quit
```


Enter 0 to download data. We can't process data without downloading it.

Once data is downloaded, you can enter the first option to prepare JSON data

```bash
1: Generate JSON Data
5: Quit 
```

Once you are done, run the http server

```bash
python3 -m http.server
```


Thank you 


