# Bridge Explorer

Bridge Explorer is a project aimed at analyzing daily transactions across various blockchain protocols, focusing initially on Across Protocol and Stargate. The primary goal is to perform specific queries on transaction data to gain insights, such as identifying the number of transactions exceeding $5000 in value over the last 6-7 months.

## Features

- Query and analyze daily transactions from Across Protocol and Stargate.
- Identify transactions exceeding $5000.
- Utilize Dune API for data fetching and analysis.

## Installation

1. **Clone the repository:**
    ```sh
    git clone https://github.com/ShivankK26/Bridge-Explorer.git
    ```

2. **Install dependencies:**
    ```sh
    npm install dotenv @duneanalytics/client-sdk
    ```

3. **Set up Dune API credentials:**
    - Sign up on [Dune](https://dune.com/) if you haven't already.
    - Generate an API key from your Dune account settings.
    - Create a `.env` file in the project root directory and add your API key:
        ```sh
        API_KEY=your_api_key
        ```

## Usage

1. **Run the analysis script:**
    ```sh
    node index.js
    ```

2. **View the results:**
    - The script will output the number of transactions exceeding $5000 for each day over the last 6-7 months or even more.