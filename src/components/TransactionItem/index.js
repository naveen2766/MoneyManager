// Write your code here
import './index.css'

const TransactionItem = props => {
  const {transDetails, deleteTransaction} = props
  const {id, title, amount, type} = transDetails

  const deleteTrans = () => {
    deleteTransaction(id)
  }

  return (
    <li className="trans-tab">
      <p>{title}</p>
      <p>{amount}</p>
      <p>{type}</p>
      <button
        className="deleteButton"
        type="button"
        onClick={deleteTrans}
        data-testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
          className="delete"
        />
      </button>
    </li>
  )
}

export default TransactionItem
