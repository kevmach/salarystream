import { useState } from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import EmployerDashboard from './components/EmployerDashboard'
import EmployeeDashboard from './components/EmployeeDashboard'

function App() {
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()
  const [activeTab, setActiveTab] = useState('employer')

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">💰 SalaryStream</h1>
          <p className="text-gray-600 mb-4">On-demand wage access on Base Sepolia</p>

          <div className="flex items-center justify-between">
            {isConnected ? (
              <div className="flex items-center gap-4">
                <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-mono text-sm">
                  {address?.slice(0, 6)}...{address?.slice(-4)}
                </div>
                <button onClick={() => disconnect()} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
                  Disconnect
                </button>
              </div>
            ) : (
              <button onClick={() => connect({ connector: connectors[0] })} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                Connect Wallet
              </button>
            )}
          </div>
        </div>

        {isConnected && (
          <div className="bg-white rounded-lg shadow-lg mb-6">
            <div className="flex border-b">
              <button
                onClick={() => setActiveTab('employer')}
                className={`flex-1 py-4 px-6 font-medium ${activeTab === 'employer' ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                🏢 Employer
              </button>
              <button
                onClick={() => setActiveTab('employee')}
                className={`flex-1 py-4 px-6 font-medium ${activeTab === 'employee' ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                👤 Employee
              </button>
            </div>

            <div className="p-6">
              {activeTab === 'employer' ? <EmployerDashboard address={address} /> : <EmployeeDashboard address={address} />}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App