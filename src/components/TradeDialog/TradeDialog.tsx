import Button from "../Button";

interface TradeDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const TradeDialog: React.FC<TradeDialogProps> = ({ isOpen, onClose }) => {
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
          <h2 className="font-semiboldtext-right cursor-pointer text-right">
            X
          </h2>
          <div className="relative">
            <div className="flex items-center w-full h-[48px] bg-[#0000000A] rounded-[4px]">
              <input
                type="text"
                className="flex-1 text-black bg-transparent pr-[10px] text-right focus:outline-none"
                placeholder="Enter amount"
              />
              <span className="text-[#74CDDC] top-[1px] relative text-[12px] font-bold mr-[12px]">
                EUR
              </span>
            </div>
            <div className="absolute bottom-[8px] left-3 right-[46px] border-b border-[#0000003D]"></div>
          </div>
          <div className="relative">
            <div className="flex items-center w-full h-[48px] bg-[#0000000A] rounded-[4px]">
              <input
                type="text"
                className="flex-1 text-black bg-transparent pr-[10px] text-right focus:outline-none"
                placeholder="Enter amount"
              />
              <span className="text-[#74CDDC] top-[1px] relative text-[12px] font-bold mr-[12px]">
                BTC
              </span>
            </div>
            <div className="absolute bottom-[8px] left-3 right-[46px] border-b border-[#0000003D]"></div>
          </div>
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
