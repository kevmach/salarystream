const hre = require("hardhat");
require("dotenv").config();

async function main() {
  console.log("🚀 Deploying SalaryStream to Base Sepolia...");

  const USDC_ADDRESS = process.env.USDC_ADDRESS || "0x036CbD53842c5426634e7929541eC2318f3dCF7e";
  console.log("📍 Using USDC address:", USDC_ADDRESS);

  const SalaryStream = await hre.ethers.getContractFactory("SalaryStream");
  const salaryStream = await SalaryStream.deploy(USDC_ADDRESS);

  await salaryStream.waitForDeployment();
  const address = await salaryStream.getAddress();

  console.log("✅ SalaryStream deployed to:", address);
  console.log("🔗 View on BaseScan: https://sepolia.basescan.org/address/" + address);
  console.log("📝 COPY THIS ADDRESS TO frontend/src/constants.js");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });