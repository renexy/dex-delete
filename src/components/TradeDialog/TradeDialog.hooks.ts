import { useState } from 'react';

export const useTradeDialog = () => {
  const [tradeDialogOpened, setTradeDialogOpened] = useState<boolean>(false);

  const toggleDialog = () => setTradeDialogOpened(prev => !prev);

  return {
    tradeDialogOpened,
    toggleDialog,
  };
};
