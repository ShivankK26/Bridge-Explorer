const axios = require('axios');
require('dotenv').config();

// Across Protocol - Smart Contract Adress

const ETHERSCAN_ETHEREUM_1 = '0x30B44C676A05F1264d1dE9cC31dB5F2A945186b6';
const amountThreshold = 5000;
const apiKey = `XF1TBF5DRWSAFTETSGK6FRCV6T4TRQ6JRA`; 

async function fetchTransactionsForDateRange(contractAddress, apiKey, startTime, endTime) {
    try {
        const apiUrl = `https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=${contractAddress}&apikey=${apiKey}`;
        const response = await axios.get(apiUrl);

        if (response.data.status === '1') {
            return response.data.result;
        } else {
            throw new Error(response.data.message);
        }
    } catch (error) {
        console.error("Error fetching the data: ", error);
        return null;
    }
}

function filterTransactionsOverAmount(transactions, amountInUSD) {
    const amountInWei = amountInUSD * 10 ** 18;

    const filteredTransactions = transactions.filter(tx => {
        const valueWei = parseFloat(tx.value);
        return valueWei > amountInWei;
    });

    console.log(`Transactions over $${amountInUSD}: `, filteredTransactions);
}

const startTime = Math.floor(new Date('2024-07-10T00:00:00Z').getTime() / 1000); // July 10, 2024
const endTime = Math.floor(new Date('2024-07-19T23:59:59Z').getTime() / 1000); // July 19, 2024

fetchTransactionsForDateRange(ETHERSCAN_ETHEREUM_1, apiKey, startTime, endTime)
    .then(transactions => {
        if (transactions) {
            console.log('Fetched transactions: ', transactions);
            filterTransactionsOverAmount(transactions, amountThreshold);
        } else {
            console.log('No transactions found.');
        }
    })
    .catch(err => {
        console.error('Error: ', err);
    });
