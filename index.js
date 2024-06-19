// Across Protocol

import dotenv from "dotenv";
dotenv.config()


const execution_id = 3843341;
const api_key = process.env.API_KEY || undefined


if (!api_key) {
    console.log("Api key not found.");
    process.exit(1);
}


const options = { method: 'GET', headers: { 'X-DUNE-API-KEY': api_key } };

const testFunction = async () => {

    const res = fetch(`https://api.dune.com/api/v1/query/${execution_id}/results`, options)
        .then(response => response.json()
            .then(response => console.log(response.result)))
}
testFunction()