import Button from "../Button";
import Input from "../Input";
import { useTradeDialog } from "./TradeDialog.hooks";

interface TradeDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const TradeDialog: React.FC<TradeDialogProps> = ({ isOpen, onClose }) => {
  const { updateInput } = useTradeDialog();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateInput(name as "eurAmount" | "ethAmount", value);
  };

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

          <div className="flex w-full items-center w-full gap-[24px] pt-[12px]">
            <Button
              callback={() => {
                console.log("test");
              }}
              buttonText="Buy"
            ></Button>
            <Button
              callback={() => {
                console.log("test");
              }}
              buttonText="Sell"
            ></Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradeDialog;
