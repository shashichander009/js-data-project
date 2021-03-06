from os import path
import csv
import json
import requests


UN_DATA_URL = 'https://datahub.io/core/population-\
growth-estimates-and-projections/r/population-estimates.csv'


ASEAN_COUNTRIES = [
    'Brunei Darussalam',
    'Cambodia',
    'Indonesia',
    "Lao People's Democratic Republic",
    'Malaysia',
    'Myanmar',
    'Philippines',
    'Singapore',
    'Thailand',
    'Viet Nam',
]

SAARC_COUNTRIES = [
    'Afghanistan',
    'Bangladesh',
    'Bhutan',
    'India',
    'Maldives',
    'Nepal',
    'Pakistan',
    'Sri Lanka',
]


# This function downloads UN population data from given URL

def download_data():
    response = requests.get(UN_DATA_URL)
    with open('data.csv', 'wb') as fs:
        fs.write(response.content)


# These are global lists that will hold region, year and population

region = []
year = []
population = []

# This function iniatilizes these global lists


def read_data():
    with open('data.csv', 'r') as csv_file:
        csv_reader = csv.reader(csv_file)
        for line in csv_reader:
            region.append(line[0])
            year.append(line[2])
            population.append(line[3])


# PROBLEM NO 1
# This function prepares a Bar Plot of India's population vs. years.

def india_data_process():
    india_data = {}
    # This dictionary will store India's data with year as Key
    # and Population as Values. We will keep only last two digits of year and
    # store population in crores
    read_data()
    for i in range(len(region)):
        if region[i] == 'India':
            population_in_crores = round(float(population[i]) / 10000, 2)
            this_year = year[i]
            india_data[this_year] = population_in_crores

    with open('./json/data1.json', 'w') as fs:
        fs.write(json.dumps(india_data))


# PROBLEM NO 2
# This function prepares the Bar Chart of population of ASEAN countries in 2014
# ASEAN is a collection of South East Asian countries.

def asean_data_process():
    asean_data = {}

    read_data()

    for i in range(len(region)):
        if region[i] in ASEAN_COUNTRIES and year[i] == '2014':
            population_in_crores = round(float(population[i]) / 10000, 2)
            asean_data[region[i]] = population_in_crores

    with open('./json/data2.json', 'w') as fs:
        fs.write(json.dumps(asean_data))


# PROBLEM NO 3
# TOTAL population of SAARC countries over the past years
# In this case for each year we have to calculate total
# population of all SAARC countries.
# Then plot a BAR CHART of Total SAARC population vs. year.

def saarc_data_process():
    saarc_data = {}

    read_data()

    for i in range(len(region)):
        if region[i] in SAARC_COUNTRIES:
            population_in_crores = float(population[i]) / 10000
            current_year = year[i]
            if saarc_data.get(current_year) is None:
                saarc_data[current_year] = population_in_crores
            else:
                saarc_data[current_year] += population_in_crores

    for x, y in saarc_data.items():
        saarc_data[x] = round(float(y), 2)

    with open('./json/data3.json', 'w') as fs:
        fs.write(json.dumps(saarc_data))


# PROBLEM NO 4
# Grouped Bar Chart - ASEAN population vs. years
# We will plot population of ASEAN countries as
# groups over the years 2011 - 2015.

def asean_group_data_process():
    asean_grp_data = {}
    # In this dictionary we will store data of asean countries population
    # The key will be concat of Year + Country
    # The value will be population

    read_data()

    for i in range(len(region)):
        if region[i] in ASEAN_COUNTRIES and int(year[i]) >= 2011 and \
                int(year[i]) <= 2015:
            population_in_crores = round(float(population[i]) / 10000, 2)
            asean_grp_data[str(region[i]) + '-' + str(year[i])
                           ] = population_in_crores

    with open('./json/data4.json', 'w') as fs:
        fs.write(json.dumps(asean_grp_data))


# This is our main function which will allow users
# to Download Data as well as view those charts


# def main():
#     india_data_process()
#     asean_data_process()
#     saarc_data_process()
#     asean_group_data_process()


def data_clear():
    region.clear()
    population.clear()
    year.clear()


def main():
    if path.exists('data.csv') is not True:
        data_file_status = 'No'
    else:
        data_file_status = 'Yes'

    while True:
        if data_file_status == 'No':
            print('0: Download Data')
            print('5: Quit')
        else:
            print('\n....Data Downloaded....')
            print('1: Generate JSON Data')
            print('5: Quit')
        try:

            # Here we reset all global lists
            data_clear()

            choice = int(input('Choose an option: '))
            if choice == 0 and data_file_status == 'No':
                download_data()
                data_file_status = 'Yes'
            elif choice == 1 and data_file_status == 'Yes':
                india_data_process()
                data_clear()
                asean_data_process()
                data_clear()
                saarc_data_process()
                data_clear()
                asean_group_data_process()
                print("######...JSON DATA PREPARED. RUN SERVER...######")
                break
            elif choice == 5:
                break
            else:
                print('\nInvalid input!')
        except ValueError:

            print('\nInput not an Integer')


if __name__ == '__main__':
    main()
