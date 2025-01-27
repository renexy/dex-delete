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
        className="bg-white p-6 rounded-lg shadow-lg w-[324px]" 
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4">Dialog</h2>
        <input 
          type="text" 
          placeholder="First Input" 
          className="w-full p-2 mb-4 border border-gray-300 rounded-md"
        />
        <input 
          type="text" 
          placeholder="Second Input" 
          className="w-full p-2 mb-4 border border-gray-300 rounded-md"
        />
        <button 
          onClick={onClose} 
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TradeDialog;
