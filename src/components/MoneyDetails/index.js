// Write your code here
import './index.css'

const MoneyDetails = props => {
  const {typeDetails, expenseAmount, incomeAmount} = props
  const {optionId, displayText} = typeDetails
  const imgUrl =
    optionId === 'INCOME'
      ? 'https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png'
      : 'https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png'
  const alt = optionId === 'INCOME' ? 'income' : 'expenses'
  const amount = optionId === 'INCOME' ? incomeAmount : expenseAmount
  const backgroundColor =
    optionId === 'INCOME'
      ? 'income-background-color'
      : 'expense-background-color'
  const borderColor =
    optionId === 'INCOME' ? 'income-border-color' : 'expense-border-color'
  const dataTestId = optionId === 'INCOME' ? 'incomeAmount' : 'expensesAmount'

  return (
    <li className={`each-details-box ${backgroundColor} ${borderColor}`}>
      <img src={imgUrl} alt={alt} />
      <div className="type-balance">
        <p>Your {displayText}</p>
        <p data-testid={dataTestId}>Rs {amount}</p>
      </div>
    </li>
  )
}

export default MoneyDetails
