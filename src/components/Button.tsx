interface ButtonProps {
  callback: () => void;
  buttonText: string;
  customStyles?: string;
}

const Button: React.FC<ButtonProps> = ({ callback, buttonText, customStyles }) => {
  return (
    <div
      className={`bg-[#153243] rounded-[4px] w-full h-[48px] flex justify-center items-center cursor-pointer ${customStyles}`}
      onClick={callback}
    >
      <span className="font-bold text-center text-[#fff] capitalize">{buttonText}</span>
    </div>
  );
};

export default Button;
