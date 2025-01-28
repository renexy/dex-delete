import { usePortfolio } from "../hooks/usePortfolio";

function Header() {
  const { ethBalance, eurBalance } = usePortfolio();
  return (
    <div className="global-main-grid-layout relative">
      <div className="col-content h-20 w-full items-center justify-between flex">
        <img src="../public/logo.png" alt="logo" width={56} height={52} />
        <div className="flex flex-col text-[12px] h-[52px] text-right">
          <span>Available</span>
          <span>
            {new Intl.NumberFormat("en-US", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 8,
            }).format(ethBalance)}{" "}
            <span className="font-bold">ETH</span>
          </span>
          <span>
            {" "}
            {new Intl.NumberFormat("en-GB", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(eurBalance)}{" "}
            <span className="font-bold">€</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Header;
