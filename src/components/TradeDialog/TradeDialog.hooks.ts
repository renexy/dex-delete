import { useState } from "react";

export const useTradeDialog = () => {
  const [tradeDialogOpened, setTradeDialogOpened] = useState<boolean>(false);
  const [inputs, setInputs] = useState({
    eurAmount: "",
    ethAmount: "",
  });

  const toggleDialog = () => setTradeDialogOpened((prev) => !prev);

  const updateInput = (name: "eurAmount" | "ethAmount", value: string) => {
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetInputs = () => {
    setInputs({
      eurAmount: "",
      ethAmount: "",
    });
  };

  return {
    tradeDialogOpened,
    toggleDialog,
    inputs,
    updateInput,
    resetInputs,
  };
};
