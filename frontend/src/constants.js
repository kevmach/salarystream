// ⚠️ UPDATE THIS AFTER DEPLOYING YOUR CONTRACT!
export const SALARYSTREAM_ADDRESS = "0x944ad7517d1a13A670E9b7E4275ff5993184f96E";
export const USDC_ADDRESS = "0x036CbD53842c5426634e7929541eC2318f3dCF7e";

export const SALARYSTREAM_ABI = [
  "function registerEmployee(address _employee, uint256 _monthlySalary) external",
  "function depositSalary(uint256 _amount) external",
  "function withdrawWages(uint256 _amount) external",
  "function getAvailableWages(address _employee) external view returns (uint256)",
  "function getEmployee(address _employee) external view returns (uint256 monthlySalary, uint256 startDate, uint256 withdrawn, address employer, bool isActive, uint256 available)",
  "function employerBalances(address) external view returns (uint256)"
];

export const USDC_ABI = [
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function balanceOf(address account) external view returns (uint256)"
];