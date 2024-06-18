"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Across Protocol - Smart Contract Adress
const ETHER_SCAN_ETHEREUM_1 = '0x30B44C676A05F1264d1dE9cC31dB5F2A945186b6';
const ETHER_SCAN_ETHEREUM_2 = 0xc186fA914353c44b2E33eBE05f21846F1048bEda;
const amountThreshold = 5000;
const apiKey = 'XF1TBF5DRWSAFTETSGK6FRCV6T4TRQ6JRA';
function fetchDailyTransactions(ETHER_SCAN_ETHEREUM_1, apiKey) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const apiUrl = `
            https://api.etherscan.io/api
            ?module=account
            &action=tokentx
            &contractaddress=${ETHER_SCAN_ETHEREUM_1}
            &apikey=${apiKey}
        `;
            const response = yield axios_1.default.get(apiUrl);
            if (response.data.status === '1') {
                return response.data.result;
            }
            else {
                throw new Error(response.data.message);
            }
        }
        catch (error) {
            console.error("Error fetching the data: ", error);
            return null;
        }
    });
}
function filterTransactionsOverAmount(transactions, amountInUSD) {
    const amountInWei = amountInUSD * 10 ** 18;
    const filteredTransactions = transactions.filter(tx => {
        const valueWei = parseFloat(tx.value);
        return valueWei > amountInWei;
    });
    console.log(`Transactions over $${amountInUSD}: `, filteredTransactions);
}
fetchDailyTransactions(ETHER_SCAN_ETHEREUM_1, apiKey)
    .then(transactions => {
    if (transactions) {
        console.log('Fetched transactions: ', transactions);
        filterTransactionsOverAmount(transactions, amountThreshold);
    }
    else {
        console.log('Failed.');
    }
})
    .catch(err => {
    console.error('Error: ', err);
});
