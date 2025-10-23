import { useState } from 'react'
import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseUnits, formatUnits } from 'viem'
import { SALARYSTREAM_ADDRESS, SALARYSTREAM_ABI, USDC_ADDRESS, USDC_ABI } from '../constants'

export default function EmployerDashboard({ address }) {
  const [employeeAddress, setEmployeeAddress] = useState('')
  const [monthlySalary, setMonthlySalary] = useState('')
  const [depositAmount, setDepositAmount] = useState('')

  const { data: balance } = useReadContract({
    address: SALARYSTREAM_ADDRESS,
    abi: SALARYSTREAM_ABI,
    functionName: 'employerBalances',
    args: [address],
  })

  const { data: usdcBalance } = useReadContract({
    address: USDC_ADDRESS,
    abi: USDC_ABI,
    functionName: 'balanceOf',
    args: [address],
  })

  const { writeContract: approveUSDC, data: approveHash } = useWriteContract()
  const { writeContract: depositSalary, data: depositHash } = useWriteContract()
  const { writeContract: registerEmployee, data: registerHash } = useWriteContract()

  const { isLoading: isApproving } = useWaitForTransactionReceipt({ hash: approveHash })
  const { isLoading: isDepositing } = useWaitForTransactionReceipt({ hash: depositHash })
  const { isLoading: isRegistering } = useWaitForTransactionReceipt({ hash: registerHash })

  const handleApprove = () => {
    if (!depositAmount) return
    try {
      approveUSDC({
        address: USDC_ADDRESS,
        abi: USDC_ABI,
        functionName: 'approve',
        args: [SALARYSTREAM_ADDRESS, parseUnits(depositAmount, 6)],
      })
    } catch (error) {
      alert('Failed to approve')
    }
  }

  const handleDeposit = () => {
    if (!depositAmount) return
    try {
      depositSalary({
        address: SALARYSTREAM_ADDRESS,
        abi: SALARYSTREAM_ABI,
        functionName: 'depositSalary',
        args: [parseUnits(depositAmount, 6)],
      })
    } catch (error) {
      alert('Failed to deposit')
    }
  }

  const handleRegister = () => {
    if (!employeeAddress || !monthlySalary) return
    try {
      registerEmployee({
        address: SALARYSTREAM_ADDRESS,
        abi: SALARYSTREAM_ABI,
        functionName: 'registerEmployee',
        args: [employeeAddress, parseUnits(monthlySalary, 6)],
      })
    } catch (error) {
      alert('Failed to register')
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Contract Balance</p>
          <p className="text-2xl font-bold text-blue-600">{balance ? formatUnits(balance, 6) : '0'} USDC</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Your USDC</p>
          <p className="text-2xl font-bold text-green-600">{usdcBalance ? formatUnits(usdcBalance, 6) : '0'} USDC</p>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-3">💰 Deposit Funds</h3>
        <input
          type="number"
          placeholder="Amount (USDC)"
          value={depositAmount}
          onChange={(e) => setDepositAmount(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg mb-3"
        />
        <div className="flex gap-2">
          <button onClick={handleApprove} disabled={isApproving || !depositAmount} className="flex-1 bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 disabled:bg-gray-300">
            {isApproving ? 'Approving...' : '1. Approve'}
          </button>
          <button onClick={handleDeposit} disabled={isDepositing || !depositAmount} className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 disabled:bg-gray-300">
            {isDepositing ? 'Depositing...' : '2. Deposit'}
          </button>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-3">👤 Register Employee</h3>
        <input
          type="text"
          placeholder="Employee Address (0x...)"
          value={employeeAddress}
          onChange={(e) => setEmployeeAddress(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg mb-3 font-mono text-sm"
        />
        <input
          type="number"
          placeholder="Monthly Salary (USDC)"
          value={monthlySalary}
          onChange={(e) => setMonthlySalary(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg mb-3"
        />
        <button onClick={handleRegister} disabled={isRegistering || !employeeAddress || !monthlySalary} className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-300">
          {isRegistering ? 'Registering...' : 'Register'}
        </button>
      </div>
    </div>
  )
}