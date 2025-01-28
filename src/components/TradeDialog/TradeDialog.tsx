import { usePortfolio } from "../../hooks/usePortfolio";
import Button from "../Button";
import Input from "../Input";
import { useTradeDialog } from "./TradeDialog.hooks";

interface TradeDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const TradeDialog: React.FC<TradeDialogProps> = ({ isOpen, onClose }) => {
  const { inputs, updateInput } = useTradeDialog();
  const { handleBuy, handleSell, error } = usePortfolio();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateInput(name as "eurAmount" | "ethAmount", value);
  };

  const handleTrade = (type: 'buy' | 'sell') => {
    switch (type) {
      case 'buy': 
        handleBuy(+inputs.ethAmount, +inputs.eurAmount)
        break;
      default:
        handleSell(+inputs.ethAmount, + inputs.eurAmount)
        break;
    }
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white px-[24px] pt-[12px] pb-[24px] rounded-[12px] shadow-lg w-[324px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-[12px] w-full">
          <h2
            className="font-semiboldtext-right cursor-pointer text-right"
            onClick={onClose}
          >
            X
          </h2>

          <Input name="eurAmount" text="eur" onChange={handleInputChange} />
          <Input name="ethAmount" text="eth" onChange={handleInputChange} />

          {error && <p className="text-red-500 text-center">{error}</p>}

          <div className="flex w-full items-center w-full gap-[24px] pt-[12px]">
            <Button
              callback={() => handleTrade('buy')}
              buttonText="Buy"
            ></Button>
            <Button
              callback={() => handleTrade('sell')}
              buttonText="Sell"
            ></Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradeDialog;
