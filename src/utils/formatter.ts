export const formatEthBalance = (ethBalance: number) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 8,
    }).format(ethBalance);
  };
  
  export const formatEurBalance = (eurBalance: number) => {
    return new Intl.NumberFormat("en-GB", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(eurBalance);
  };
  