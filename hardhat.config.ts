import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import 'dotenv/config';
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-etherscan';

const PRIVATE_KEY = process.env.PRIVATE_KEY || '';
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY;

const config: HardhatUserConfig = {
  defaultNetwork: 'sepolia',
  networks: {
    hardhat: {},
    polygon_mumbai: {
      url: 'https://rpc-mumbai.maticvigil.com',
      accounts: [PRIVATE_KEY],
    },
    sepolia: {
      url: 'https://sepolia.infura.io/v3/',
      accounts: [PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: POLYGONSCAN_API_KEY,
  },
  solidity: {
    compilers: [
      {
        version: '0.6.0',
      },
      {
        version: '0.8.0',
      },
    ],
    // version: '^0.6.0',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};

export default config;
