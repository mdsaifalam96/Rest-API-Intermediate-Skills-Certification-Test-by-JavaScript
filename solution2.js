'use strict';

const fs = require('fs');
const fetch = require('node-fetch'); // Import node-fetch

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
 * Complete the 'getWinnerTotalGoals' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. STRING competition
 *  2. INTEGER year
 */

let goals = [];
for (let i = 0; i <= 10; i++) {
    goals.push(i);
}

async function getWinnerTotalGoals(competition, year) {
    let ans = 0;
    let response = await fetch(https://jsonmock.hackerrank.com/api/football_competitions?year=${year}&name=${competition});
    let data = await response.json();
    let winner = data.data[0].winner;
    console.log(winner);

    await Promise.all(
        goals.map(async (goal) => {
            const respone = await fetch(https://jsonmock.hackerrank.com/api/football_matches?competition=${competition}&year=${year}&team1=${winner}&team1goals=${goal});
            const data = await respone.json();
            ans += data.total * goal;
        })
    );
    await Promise.all(
        goals.map(async (goal) => {
            const respone = await fetch(https://jsonmock.hackerrank.com/api/football_matches?competition=${competition}&year=${year}&team2=${winner}&team2goals=${goal});
            const data = await respone.json();
            ans += data.total * goal;
        })
    );
    return ans;
}

async function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const competition = readLine();

    const year = parseInt(readLine().trim(), 10);

    const result = await getWinnerTotalGoals(competition, year);

    ws.write(result + '\n');

    ws.end();
}