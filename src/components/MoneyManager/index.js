import './index.css'
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here
class MoneyManager extends Component {
  state = {
    historyList: [],
    title: '',
    amount: '',
    type: transactionTypeOptions[0].optionId,
  }

  onTitleChange = event => {
    this.setState({title: event.target.value})
  }

  onAmountChange = event => {
    // console.log(typeof event.target.value)
    this.setState({amount: parseInt(event.target.value)})
  }

  onTypeChange = event => {
    this.setState({type: event.target.value})
  }

  onAddTransaction = event => {
    event.preventDefault()
    const {title, amount, type} = this.state
    const newTransaction = {
      id: uuidv4(),
      title,
      amount,
      type: type === 'INCOME' ? 'Income' : 'Expenses',
    }

    this.setState(prevState => ({
      historyList: [...prevState.historyList, newTransaction],
      amount: '',
      type: transactionTypeOptions[0].optionId,
      title: '',
    }))
  }

  getExpenses = () => {
    const {historyList} = this.state
    let expensesAmount = 0

    historyList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[1].displayText) {
        expensesAmount += eachTransaction.amount
      }
    })

    return expensesAmount
  }

  getIncome = () => {
    const {historyList} = this.state
    let incomeAmount = 0
    historyList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      }
    })

    return incomeAmount
  }

  getBalance = () => {
    const {historyList} = this.state
    let balanceAmount = 0
    let incomeAmount = 0
    let expensesAmount = 0

    historyList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      } else {
        expensesAmount += eachTransaction.amount
      }
    })

    balanceAmount = incomeAmount - expensesAmount

    return balanceAmount
  }

  deleteTransaction = async id => {
    this.setState(prevState => ({
      historyList: prevState.historyList.filter(
        eachTrans => eachTrans.id !== id,
      ),
    }))
  }

  render() {
    const {historyList, title, amount, type} = this.state
    const totalAmount = this.getBalance()
    const incomeAmount = this.getIncome()
    const expenseAmount = this.getExpenses()
    console.log(historyList)
    return (
      <div className="container">
        <div className="welcome-section">
          <h1>Hi, Richard</h1>
          <p>
            Welcome back to your <span>Money Manager</span>
          </p>
        </div>
        <ul className="amount-details-section">
          <li className="each-details-box">
            <img
              src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
              alt="balance"
            />
            <div className="type-balance">
              <p>Your Balance</p>
              <p data-testid="balanceAmount">Rs {totalAmount}</p>
            </div>
          </li>
          {transactionTypeOptions.map(eachType => (
            <MoneyDetails
              key={eachType.optionId}
              typeDetails={eachType}
              expenseAmount={expenseAmount}
              incomeAmount={incomeAmount}
            />
          ))}
        </ul>
        <div className="transaction-history">
          <form className="transaction-form" onSubmit={this.onAddTransaction}>
            <h1>Add Transaction</h1>
            <label htmlFor="title">TITLE</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={this.onTitleChange}
            />
            <label htmlFor="amount">AMOUNT</label>
            <input
              type="text"
              id="amount"
              value={amount}
              onChange={this.onAmountChange}
            />
            <label htmlFor="label-type">TYPE</label>
            <select id="label-type" value={type} onChange={this.onTypeChange}>
              <option value={transactionTypeOptions[0].optionId}>
                {transactionTypeOptions[0].displayText}
              </option>
              <option value={transactionTypeOptions[1].optionId}>
                {transactionTypeOptions[1].displayText}
              </option>
            </select>
            <button type="button" onClick={this.onAddTransaction}>
              Add
            </button>
          </form>
          <div className="history-details">
            <h1 className="history-heading">History</h1>
            <ul className="transactions-list-history">
              <li className="history-tabs">
                <p>Title</p>
                <p>Amount</p>
                <p>Type</p>
              </li>
              {/* <ul className="unordered-list"> */}
              {historyList.map(eachTransaction => (
                <TransactionItem
                  key={eachTransaction.id}
                  transDetails={eachTransaction}
                  deleteTransaction={this.deleteTransaction}
                />
              ))}
              {/* </ul> */}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
