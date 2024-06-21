// Across Protocol


import dotenv from "dotenv";
dotenv.config()


const execution_id_across = 3843341;
const api_key = process.env.API_KEY || undefined


if (!api_key) {
    console.log("Api key not found.");
    process.exit(1);
}


const options = { method: 'GET', headers: { 'X-DUNE-API-KEY': api_key } };

const AcrossFunction = async () => {

    const res = fetch(`https://api.dune.com/api/v1/query/${execution_id_across}/results`, options)
        .then(response => response.json()
            .then(response => console.log(response.result)))

}

AcrossFunction()


// Stargate Protocol


const execution_id_stargate = 3800468;

const StargateFunction = async () => {

    const res = fetch(`https://api.dune.com/api/v1/query/${execution_id_stargate}/results?limit=1000`, options)
        .then(response => response.json()
            .then(response => console.log(response.result)))

}

StargateFunction()