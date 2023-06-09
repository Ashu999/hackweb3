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
      url: 'https://eth-sepolia.g.alchemy.com/v2/sTnv_4QBL2A-1ILbEvsC9gpECMxr7S1L',
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
      {
        version: '0.6.12',
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
  mocha: {
    timeout: 1000000000000000,
  },
};

export default config;
