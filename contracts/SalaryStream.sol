// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title SalaryStream
 * @dev On-demand wage access system for Base Batches 002
 */
contract SalaryStream is Ownable, ReentrancyGuard {

    IERC20 public immutable usdcToken;
    uint256 public feePercentage = 200; // 2% fee
    uint256 public constant FEE_DENOMINATOR = 10000;

    struct Employee {
        uint256 monthlySalary;
        uint256 startDate;
        uint256 withdrawn;
        address employer;
        bool isActive;
    }

    mapping(address => Employee) public employees;
    mapping(address => uint256) public employerBalances;

    event EmployeeRegistered(address indexed employee, address indexed employer, uint256 monthlySalary);
    event SalaryDeposited(address indexed employer, uint256 amount);
    event WageWithdrawn(address indexed employee, uint256 amount, uint256 fee);

    constructor(address _usdcToken) Ownable(msg.sender) {
        usdcToken = IERC20(_usdcToken);
    }

    function registerEmployee(address _employee, uint256 _monthlySalary) external {
        require(_employee != address(0), "Invalid employee address");
        require(_monthlySalary > 0, "Salary must be positive");
        require(!employees[_employee].isActive, "Employee already registered");

        employees[_employee] = Employee({
            monthlySalary: _monthlySalary,
            startDate: block.timestamp,
            withdrawn: 0,
            employer: msg.sender,
            isActive: true
        });

        emit EmployeeRegistered(_employee, msg.sender, _monthlySalary);
    }

    function depositSalary(uint256 _amount) external nonReentrant {
        require(_amount > 0, "Amount must be positive");
        require(usdcToken.transferFrom(msg.sender, address(this), _amount), "USDC transfer failed");

        employerBalances[msg.sender] += _amount;
        emit SalaryDeposited(msg.sender, _amount);
    }

    function getAvailableWages(address _employee) public view returns (uint256) {
        Employee memory emp = employees[_employee];
        if (!emp.isActive) return 0;

        uint256 timeElapsed = block.timestamp - emp.startDate;
        uint256 monthInSeconds = 30 days;

        if (timeElapsed >= monthInSeconds) {
            return emp.monthlySalary - emp.withdrawn;
        }

        uint256 earnedAmount = (emp.monthlySalary * timeElapsed) / monthInSeconds;
        return earnedAmount > emp.withdrawn ? earnedAmount - emp.withdrawn : 0;
    }

    function withdrawWages(uint256 _amount) external nonReentrant {
        Employee storage emp = employees[msg.sender];
        require(emp.isActive, "Not registered");
        require(_amount > 0, "Amount must be positive");

        uint256 available = getAvailableWages(msg.sender);
        require(available >= _amount, "Insufficient wages");

        uint256 fee = (_amount * feePercentage) / FEE_DENOMINATOR;
        uint256 totalCost = _amount + fee;
        require(employerBalances[emp.employer] >= totalCost, "Employer insufficient balance");

        uint256 timeElapsed = block.timestamp - emp.startDate;
        if (timeElapsed >= 30 days) {
            emp.startDate = block.timestamp;
            emp.withdrawn = 0;
        }

        emp.withdrawn += _amount;
        employerBalances[emp.employer] -= totalCost;

        require(usdcToken.transfer(msg.sender, _amount), "Transfer failed");
        emit WageWithdrawn(msg.sender, _amount, fee);
    }

    function getEmployee(address _employee) external view returns (
        uint256 monthlySalary,
        uint256 startDate,
        uint256 withdrawn,
        address employer,
        bool isActive,
        uint256 available
    ) {
        Employee memory emp = employees[_employee];
        return (emp.monthlySalary, emp.startDate, emp.withdrawn, emp.employer, emp.isActive, getAvailableWages(_employee));
    }
}