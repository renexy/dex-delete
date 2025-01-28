interface InputProps {
  name: string;
  text: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ name, text, onChange }) => {

  return (
    <div className="relative">
      <div className="flex items-center w-full h-[48px] bg-[#0000000A] rounded-[4px]">
        <input
          type="text"
          name={name}
          className="flex-1 text-black bg-transparent pr-[10px] text-right focus:outline-none"
          onChange={onChange}
          placeholder="Enter amount"
        />
        <span className="text-[#74CDDC] top-[1px] relative text-[12px] font-bold mr-[12px] capitalize">
          {text}
        </span>
      </div>
      <div className="absolute bottom-[8px] left-3 right-[46px] border-b border-[#0000003D]"></div>
    </div>
  );
};

export default Input;
