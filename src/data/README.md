# Snugg Tech Task

In the electricity and gas folders, you will find smart meter data for 1 day of a single users smart meters.
Please create a small web based application in Typescript/React which will visualise this data in any way you choose. 
This could be a bar chart, graph, or some other visualisation. You are free to use any libraries or frameworks of 
your choice within this Typescript/React application.

The backend can be any typescript webserver of your choice.
The endpoint to retrieve the data should accept a user id and a date range.

It should work generically such that it could support more days of data and a larger number of users' data 
where the data is stored in a file system with the following structure:


{userId1}
    /electricity
        /consumption
            /1
                20240124-20240125.csv
                20240125-20240126.csv
                ...{date}-{next_day}.csv
        /tariff
            /1
                20240124-20240125.csv
                20240125-20240126.csv
                ...{date}-{next_day}.csv
    /gas
        /consumption
            /1
                20240124-20240125.csv
                20240125-20240126.csv
                ...{date}-{next_day}.csv
        /tariff
            /1
                20240124-20240125.csv
                20240125-20240126.csv
                ...{date}-{next_day}.csv
