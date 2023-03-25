import React, { useEffect, useState } from "react";
const mySecret = import.meta.env.VITE_API_KEY;

const CoinInfo = ({ image, name, symbol }) => {
  const [price, setPrice] = useState("");
  useEffect(() => {
    const getCoinPrice = async () => {
      const priceURL =
        `https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=USD&api_key=` +
        mySecret;
      const res = await fetch(priceURL);
      const data = await res.json();
      setPrice(data);
    };
    getCoinPrice().catch(console.error);
  }, [symbol]);
  return (
    <div>
      {price ? ( // rendering only if API call actually returned us data
        <li className="main-list" key={symbol}>
          <img
            className="icons"
            src={`https://www.cryptocompare.com${image}`}
            alt={`Small icon for ${name} crypto coin`}
          />
          {name} <span className="tab"></span> ${price.USD} USD
        </li>
      ) : null}
    </div>
  );
};
export default CoinInfo;
