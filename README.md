# 🚀 SalaryStream

**On-Demand Wage Access Protocol on Base**

![Base](https://img.shields.io/badge/Built%20on-Base-0052FF?style=for-the-badge&logo=coinbase&logoColor=white)
![Solidity](https://img.shields.io/badge/Solidity-0.8.20-363636?style=for-the-badge&logo=solidity&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Deployed](https://img.shields.io/badge/Status-LIVE-success?style=for-the-badge)

---

## 🎯 Overview

SalaryStream enables employees to withdraw earned wages on-demand with just **2% fee** - **90% cheaper than payday loans**.

**Built for Base Batches 002 - Southern Africa**

---

## 🔗 Live Demo

**🌐 Try it now:** https://salarystream-git-main-kevs-projects-35c24d26.vercel.app

**📜 Smart Contract:** `0x944ad7517d1a13A670E9b7E4275ff5993184f96E`

**🔍 Block Explorer:** [View on BaseScan](https://sepolia.basescan.org/address/0x944ad7517d1a13A670E9b7E4275ff5993184f96E)

---

# The Problem: Financial Exclusion & Predatory Lending in Africa

## Key Statistics
- **85%+** of sub-Saharan Africans lack access to formal financial services
- **70%** of Africa's workforce operates in the informal economy with irregular pay
- **63%** of Africans live on less than $3.20/day, making wage delays devastating
- **$10B+** flows through informal lending channels annually

## The Debt Trap
- **20-400%** interest rates from informal moneylenders and mobile loan apps
- Mobile lending apps charge **15-40%** interest for 30-day loans
- Traditional "shylocks" charge **20-30%** per month
- Workers lose **30-50%** of monthly income to interest and fees

## The Core Issue
Workers (domestic staff, casual laborers, gig workers) wait weeks or months for wages, forcing them to take predatory loans for basic needs like food, rent, school fees, and medical emergencies. With no credit history and limited financial access, they're trapped in a vicious cycle of debt that compounds poverty rather than relieving it.

## The Opportunity
Break the cycle by giving workers instant access to their earned wages, eliminating the need for predatory loans entirely.

---

## ✨ The Solution

SalaryStream provides **instant access to earned wages** through blockchain technology:

- ⚡ **Instant Withdrawals** - Access earned wages anytime
- 💰 **2% Fee Only** - 90% cheaper than payday loans  
- 🌍 **Global Access** - No bank account required
- 🔐 **Secure** - Battle-tested OpenZeppelin contracts
- 📊 **Transparent** - All transactions on-chain

---

## 🎬 How It Works

### For Employers 👔

1. **Connect Wallet** - MetaMask or Coinbase Wallet
2. **Deposit USDC** - Add funds to contract
3. **Register Employees** - Set monthly salaries
4. **Done!** - Wages accrue automatically

### For Employees 💼

1. **Connect Wallet** - Use registered wallet address
2. **View Earnings** - See real-time available wages
3. **Withdraw Anytime** - Pay just 2% fee
4. **Receive Instantly** - USDC in your wallet

---

## 🏗️ Technical Architecture

```
┌─────────────────────────────────────────┐
│   Frontend Layer                        │
│   React + Vite + TailwindCSS           │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│   Web3 Integration                      │
│   Wagmi v2 + Viem v2                   │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│   Base Sepolia (L2 Ethereum)           │
│   Chain ID: 84532                       │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│   SalaryStream Smart Contract          │
│   Solidity 0.8.20 + OpenZeppelin       │
│   USDC Token (ERC-20)                  │
└─────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

**Frontend:**
- React 18
- Vite 5.4
- TailwindCSS 3
- Wagmi v2
- Viem v2

**Smart Contract:**
- Solidity 0.8.20
- OpenZeppelin (Ownable, ReentrancyGuard)
- USDC Token (ERC-20)

**Blockchain:**
- Base Sepolia Testnet
- Chain ID: 84532
- RPC: Base Sepolia RPC

**Deployment:**
- Frontend: Vercel
- Contract: Base Sepolia

---

## 🔐 Smart Contract Details

| Property | Value |
|----------|-------|
| **Network** | Base Sepolia Testnet |
| **Chain ID** | 84532 |
| **Contract Address** | `0x944ad7517d1a13A670E9b7E4275ff5993184f96E` |
| **USDC Token** | `0x036CbD53842c5426634e7929541eC2318f3dCF7e` |
| **Compiler** | Solidity 0.8.20 |
| **License** | MIT |

### Core Functions

```solidity
// Employer Functions
function depositSalary(uint256 _amount) external
function registerEmployee(address _employee, uint256 _monthlySalary) external

// Employee Functions  
function withdrawWages(uint256 _amount) external nonReentrant
function getAvailableWages(address _employee) external view returns (uint256)

// View Functions
function getEmployee(address _employee) external view returns (Employee memory)
```

### Security Features

- ✅ ReentrancyGuard protection
- ✅ OpenZeppelin battle-tested libraries
- ✅ Time-based wage validation
- ✅ No admin backdoors
- ✅ Ownable access control

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- MetaMask or Coinbase Wallet
- Base Sepolia ETH (for gas fees)

### Installation

```bash
# Clone repository
git clone https://github.com/kevmach/salarystream.git
cd salarystream

# Install frontend dependencies
cd frontend
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173`

### Environment Setup

**Get Test ETH:**
- Visit [Base Sepolia Faucet](https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet)
- Enter your wallet address
- Receive test ETH for gas fees

---

## 📊 Financial Model

### Fee Structure

| Type | Fee |
|------|-----|
| **Platform Fee** | 2% per withdrawal |
| **Employer Deposit** | Gas only (~$0.01) |
| **Employee Registration** | Gas only (~$0.01) |

### Cost Comparison

| Service | Fee | Settlement Time |
|---------|-----|----------------|
| **SalaryStream** | **2%** | **Instant** |
| Traditional EWA | 3-5% + tips | 1-2 days |
| Payday Loans | 15-20% | Same day |

### Unit Economics Example

```
Employee Monthly Salary: $3,000
Days Elapsed: 15
Available Wages: $1,500

Withdrawal Amount: $500
Platform Fee (2%): $10
Employee Receives: $490

vs. Payday Loan (15%): $75 fee
💰 Savings: $65 (87% cheaper!)
```

---

# 🎯 Market Opportunity (African Context)

## Target Market

**Primary Users:**
- **Gig economy workers** (18M+ in Africa, growing 130% annually)
- **Informal sector workers** (85% of Africa's workforce - 700M+ people)
- **Mobile money users** (475M+ mobile internet users across Africa)
- **Urban youth** (highest youth unemployment globally: 60-76% in key markets)
- **Key sectors:** Ride-hailing, delivery, domestic work, construction, retail

**Priority Markets:**
- Kenya (1.2M gig workers, 216% growth in 5 years)
- Nigeria (largest population, rapid digital adoption)
- South Africa (mature fintech infrastructure)
- Ghana, Egypt, Rwanda (emerging digital economies)

## Market Size

- **$18M+** active gig workers in Africa (2024)
- **130%** annual growth in gig job postings (vs 14% in North America)
- **700M+** informal workers lacking financial access
- **$180M** African Development Bank investment in gig economy (2023-2026)
- **65%** of African gig activity concentrated in Kenya, Nigeria, South Africa
- **2.4%** contribution to Kenya's GDP from gig economy (2021, up from 1.4% in 2017)

## Growth Drivers

- **Mobile-first economy:** 475M+ mobile internet users
- **Fastest urbanization globally:** 3.5% annual

### Competitive Advantages

1. **90% Cost Reduction** - vs payday loans
2. **Instant Settlement** - vs 1-2 day delays
3. **Global Access** - No geographic restrictions
4. **No Bank Required** - Just crypto wallet
5. **Complete Transparency** - All on-chain

---

## 🗺️ Roadmap

### ✅ Phase 1: MVP (Q4 2025) - COMPLETED
- Core smart contract deployed ✅
- Frontend application live ✅
- Employer/Employee dashboards ✅
- MetaMask integration ✅
- Deployed on Base Sepolia ✅

### 🔄 Phase 2: Beta Launch (Q1 2026)
- Base mainnet deployment
- Professional security audit
- Pilot with 2-3 Web3 companies
- Enhanced UI/UX improvements
- Bug fixes and optimizations

### ⏳ Phase 3: Growth (Q2 2026)
- Multi-token support (DAI, EURC)
- Mobile app (iOS/Android)
- Employer analytics dashboard
- Payroll API integration
- Self-service onboarding

### 🔮 Phase 4: Scale (Q3 2026)
- Cross-chain deployment (Polygon, Arbitrum)
- Fiat on/off ramps (Stripe, Ramp)
- Enterprise API
- Governance token launch
- DAO formation

### 🌟 Phase 5: Ecosystem (Q4 2026)
- DeFi yield integration (Aave, Compound)
- Credit score building
- Financial wellness tools
- Global expansion (50+ countries)
- 100,000+ users

---

## 💼 Use Cases

### 1. Gig Economy Workers
**Problem:** Uber driver needs gas money before weekly payout  
**Solution:** Withdraw earned wages instantly with 2% fee

### 2. Hourly Retail Workers
**Problem:** Unexpected medical bill before payday  
**Solution:** Access earned wages immediately, avoid payday loan

### 3. Remote Contractors
**Problem:** International contractor waiting 30 days for payment  
**Solution:** Daily wage accrual with instant withdrawal

### 4. Web3 Companies
**Problem:** Complex multi-currency payroll for global team  
**Solution:** Simple USDC payments with employee flexibility

---

## 🔥 Hyper-Financialization Features

### Financial Loops
```
Employer Deposit → Employee Earning → Wage Withdrawal → 
Platform Fee → Protocol Growth → Enhanced Features → 
Better Employer Benefits → Loop Continues
```

### Key Elements

1. **Instant Liquidity** - Real-time wage access
2. **Fee-Based Revenue** - Sustainable 2% model
3. **Capital Circulation** - Continuous wage flow
4. **DeFi Integration** - Future yield on idle funds
5. **Transparent Economics** - All transactions visible

---

## 📚 Documentation

- [📄 Whitepaper](docs/SalaryStream_Whitepaper.docx) - Comprehensive project overview
- [📊 System Diagrams](docs/SalaryStream_Diagrams.html) - Architecture visualizations
- [📝 Submission Guide](docs/BASE_BATCHES_SUBMISSION_GUIDE.md) - Base Batches walkthrough
- [⚡ Quick Reference](docs/QUICK_REFERENCE.md) - Key facts and FAQs

---

## 🧪 Testing Guide

### Test on Base Sepolia

1. **Get Test ETH**
   ```
   Visit: https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet
   Enter your wallet address
   Receive test ETH
   ```

2. **Test Employer Flow**
   ```
   1. Connect wallet (MetaMask)
   2. Deposit 3000 USDC (test tokens)
   3. Register employee: 0x742d35Cc6634C0532925a3b844Bc454e4438f44e
   4. Set monthly salary: 3000 USDC
   5. Verify employee dashboard
   ```

3. **Test Employee Flow**
   ```
   1. Connect as employee wallet
   2. View available wages (updates daily)
   3. Withdraw 500 USDC
   4. Verify 2% fee (10 USDC)
   5. Receive 490 USDC instantly
   ```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

### Development Guidelines

- Follow existing code style
- Write clear commit messages
- Add tests for new features
- Update documentation
- Ensure all tests pass

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🏆 Built For

**Base Batches 002** - Hyper-Financialization Track  
**Base Southern Africa** - [@BasedSouthernAF](https://twitter.com/BasedSouthernAF)

### Why Base?

- **Low Fees** - Makes micro-withdrawals economically viable
- **Fast Settlement** - Instant wage access
- **Growing Ecosystem** - Future integration opportunities
- **Developer-Friendly** - Excellent tooling and support

---

## 🔗 Links

- **Live App:** https://salarystream-git-main-kevs-projects-35c24d26.vercel.app
- **GitHub:** https://github.com/kevmach/salarystream
- **Contract:** https://sepolia.basescan.org/address/0x944ad7517d1a13A670E9b7E4275ff5993184f96E
- **Base Batches:** https://basebatches.xyz
- **Base Network:** https://base.org

---

## 📞 Contact

**Project:** SalaryStream  
**Developer:** Kelvin Macharia (kevmach)  
**GitHub:** [@kevmach](https://github.com/kevmach)  
**Built:** October 2025  
**Location:** Harare, Zimbabwe

---

## 🙏 Acknowledgments

- Built during **Base Batches 002**
- Powered by **Base** blockchain
- Inspired by the need for financial inclusion
- Special thanks to **Base Southern Africa** team
- Thanks to **Gugu Base** for technical support

---

## 📈 Stats

- **Contract Address:** `0x944ad7517d1a13A670E9b7E4275ff5993184f96E`
- **Network:** Base Sepolia
- **Deployment Date:** October 23, 2025
- **Status:** ✅ Live & Working
- **Platform Fee:** 2%
- **Target Market:** 150M+ users

---

<div align="center">

**Built with ❤️ on Base**

### 🚀 Try SalaryStream Today!

[**Launch App**](https://salarystream-git-main-kevs-projects-35c24d26.vercel.app) | [**View Contract**](https://sepolia.basescan.org/address/0x944ad7517d1a13A670E9b7E4275ff5993184f96E) | [**Star on GitHub**](https://github.com/kevmach/salarystream)

---

[![Star on GitHub](https://img.shields.io/github/stars/kevmach/salarystream?style=social)](https://github.com/kevmach/salarystream)

**Empowering Financial Freedom Through Blockchain**

</div>
