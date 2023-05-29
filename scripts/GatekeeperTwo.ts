import { TransactionResponse } from '@ethersproject/providers';
import { ethers } from 'hardhat';

const CONTRACT_NAME = 'GatekeeperTwo';
const ATTACKER_NAME = 'GatekeeperTwoAttacker';
const CONTRACT_ADDRESS = '0xc92466b0ba28aFf1D9F9f5178e0cF8DEb8f0A739';

export async function main() {
  let tx: TransactionResponse;

  const factory = await ethers.getContractFactory(CONTRACT_NAME);
  const contract = factory.attach(CONTRACT_ADDRESS);

  const attackerFactory = await ethers.getContractFactory(ATTACKER_NAME);
  const attackerContract = await attackerFactory.deploy(contract.address);
  await attackerContract.deployed();
  await attackerContract.deployTransaction.wait(1);
  console.log('Attacker Contract deployed to:', attackerContract.address);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
