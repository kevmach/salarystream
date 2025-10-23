import { useState } from 'react'
import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseUnits, formatUnits } from 'viem'
import { SALARYSTREAM_ADDRESS, SALARYSTREAM_ABI } from '../constants'

export default function EmployeeDashboard({ address }) {
  const [withdrawAmount, setWithdrawAmount] = useState('')

  const { data: employeeData } = useReadContract({
    address: SALARYSTREAM_ADDRESS,
    abi: SALARYSTREAM_ABI,
    functionName: 'getEmployee',
    args: [address],
  })

  const { writeContract: withdrawWages, data: withdrawHash } = useWriteContract()
  const { isLoading: isWithdrawing } = useWaitForTransactionReceipt({ hash: withdrawHash })

  const handleWithdraw = () => {
    if (!withdrawAmount) return
    try {
      withdrawWages({
        address: SALARYSTREAM_ADDRESS,
        abi: SALARYSTREAM_ABI,
        functionName: 'withdrawWages',
        args: [parseUnits(withdrawAmount, 6)],
      })
      setWithdrawAmount('')
    } catch (error) {
      alert('Failed to withdraw')
    }
  }

  const isActive = employeeData?.[4]
  const available = employeeData?.[5]
  const monthlySalary = employeeData?.[0]
  const withdrawn = employeeData?.[2]

  return (
    <div className="space-y-6">
      {isActive ? (
        <>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Available</p>
              <p className="text-2xl font-bold text-green-600">{available ? formatUnits(available, 6) : '0'} USDC</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Monthly Salary</p>
              <p className="text-2xl font-bold text-blue-600">{monthlySalary ? formatUnits(monthlySalary, 6) : '0'} USDC</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Withdrawn</p>
              <p className="text-2xl font-bold text-purple-600">{withdrawn ? formatUnits(withdrawn, 6) : '0'} USDC</p>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-3">💸 Withdraw Wages</h3>
            <input
              type="number"
              placeholder="Amount"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg mb-3"
            />
            <div className="flex gap-2">
              <button onClick={() => setWithdrawAmount(available ? formatUnits(available, 6) : '0')} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
                Max
              </button>
              <button onClick={handleWithdraw} disabled={isWithdrawing || !withdrawAmount} className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 disabled:bg-gray-300">
                {isWithdrawing ? 'Withdrawing...' : 'Withdraw'}
              </button>
            </div>
            <p className="text-sm text-gray-600 mt-2">Fee: 2% • You get: {withdrawAmount ? (withdrawAmount * 0.98).toFixed(2) : '0'} USDC</p>
          </div>
        </>
      ) : (
        <div className="bg-yellow-50 p-6 rounded-lg text-center">
          <p className="text-lg font-semibold mb-2">⚠️ Not Registered</p>
          <p className="text-gray-600 mb-4">Ask your employer to register you</p>
          <p className="font-mono text-sm bg-white p-2 rounded">{address}</p>
        </div>
      )}
    </div>
  )
}

