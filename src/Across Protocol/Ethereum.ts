import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();


interface EtherscanResponse {
    status: string;
    message: string;
    result: Transaction[];
}

interface Transaction {
    blockNumber: string;
    timeStamp: string;
    hash: string;
    from: string;
    to: string;
    value: string;
    contractAddress: string;
    isError: string;
    txreceipt_status: string;
}


// Across Protocol - Smart Contract Adress

const ETHER_SCAN_ETHEREUM_1 = '0x30B44C676A05F1264d1dE9cC31dB5F2A945186b6';
const amountThreshold = 5000;
const apiKey = 'XF1TBF5DRWSAFTETSGK6FRCV6T4TRQ6JRA';


async function fetchDailyTransactions(ETHER_SCAN_ETHEREUM_1: string, apiKey: string): Promise<Transaction[] | null> {
    try {
        const apiUrl = `
            https://api.etherscan.io/api
            ?module=account
            &action=tokentx
            &contractaddress=${ETHER_SCAN_ETHEREUM_1}
            &apikey=${apiKey}
        `;
        const response = await axios.get<EtherscanResponse>(apiUrl);

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

function filterTransactionsOverAmount(transactions: Transaction[], amountInUSD: number): void {
    const amountInWei = amountInUSD * 10 **18;

    const filteredTransactions = transactions.filter( tx => {
        const valueWei = parseFloat(tx.value)
        return valueWei > amountInWei;
    });

    console.log(`Transactions over $${amountInUSD}: `, filteredTransactions);
}


fetchDailyTransactions(ETHER_SCAN_ETHEREUM_1, apiKey) 
    .then(transactions => {
        if (transactions) {
            console.log('Fetched transactions: ', transactions);
            filterTransactionsOverAmount(transactions, amountThreshold)
        } else {
            console.log('Failed.');
        }
    })

    .catch(err => {
        console.error('Error: ', err);
    })