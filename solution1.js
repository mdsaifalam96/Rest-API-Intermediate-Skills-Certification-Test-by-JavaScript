'use strict';

const fs = require('fs');
const fetch = require('node-fetch');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');
    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'getTotalGoals' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. STRING team
 *  2. INTEGER year
 */

async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(HTTP error! Status: ${response.status});
        }
        return await response.json();
    } catch (error) {
        console.error(Failed to fetch data from ${url}: ${error.message});
        return { data: [], total_pages: 0, per_page: 0 }; // Return empty data on error
    }
}

async function getTotalGoals(team, year) {
    let totalGoals = 0;

    // Get total pages for team1
    let r = await fetchData(https://jsonmock.hackerrank.com/api/football_matches?year=${year}&team1=${team}&page=1);
    let totalPages1 = r.total_pages;
    let perPage1 = r.per_page;

    // Iterate through all pages for team1
    for (let j = 1; j <= totalPages1; j++) {
        r = await fetchData(https://jsonmock.hackerrank.com/api/football_matches?year=${year}&team1=${team}&page=${j});
        for (let i = 0; i < r.data.length; i++) {
            totalGoals += parseInt(r.data[i].team1goals, 10) || 0;
        }
    }

    // Get total pages for team2
    let r1 = await fetchData(https://jsonmock.hackerrank.com/api/football_matches?year=${year}&team2=${team}&page=1);
    let totalPages2 = r1.total_pages;
    let perPage2 = r1.per_page;

    // Iterate through all pages for team2
    for (let j = 1; j <= totalPages2; j++) {
        r1 = await fetchData(https://jsonmock.hackerrank.com/api/football_matches?year=${year}&team2=${team}&page=${j});
        for (let i = 0; i < r1.data.length; i++) {
            totalGoals += parseInt(r1.data[i].team2goals, 10) || 0;
        }
    }

    return totalGoals;
}

async function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const team = readLine();
    const year = parseInt(readLine().trim(), 10);

    try {
        const result = await getTotalGoals(team, year);
        ws.write(result + '\n');
    } catch (error) {
        console.error(Failed to calculate total goals: ${error.message});
        ws.write('0\n'); // Write 0 in case of failure
    } finally {
        ws.end();
    }
}