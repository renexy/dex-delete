import { usePortfolio } from "../../hooks/usePortfolio";
import { Transaction } from "../../services/state/portfolioSlice";
import { formatEthBalance, formatEurBalance } from "../../utils/formatter";

function TradeHistory() {
  const { transactions } = usePortfolio();

  const renderTrade = (transaction: Transaction) => {
    if (transaction.type === 'buy') {
        return `+${formatEthBalance(transaction.amount)} ETH / - ${formatEurBalance(transaction.price)} €`
    } else {
        return `-${formatEthBalance(transaction.amount)} ETH / + ${formatEurBalance(transaction.price)} €`
    }
  }


  const last10Transactions = transactions.slice(-10);

  if (transactions.length < 1) return null;

  return (
    <div className="col-content w-full items-center flex flex-col bg-[#F3F3F3] rounded-[4px] p-[16px] w-full">
      {last10Transactions.map((transaction, index) => (
        <div key={index} className="w-full justify-between items-center flex">
          <span className="capitalize">{transaction.type}</span>
          <span className="font-bold">
            {renderTrade(transaction)}
          </span>
          <span>{new Date(transaction.datetime!).toLocaleTimeString()}</span>
        </div>
      ))}
    </div>
  );
}

export default TradeHistory;
