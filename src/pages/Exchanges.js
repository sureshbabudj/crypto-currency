import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import ColumnScroll from "../components/ColumnScroll";
import Pagination from "../components/Pagination";
import "./Coins.css";

const tableHeaders = [
  { label: "Id", id: "id", type: "string" },
  { label: "Name", id: "name", type: "string" },
  { label: "Year Established", id: "year_established", type: "number" },
  { label: "Country", id: "country", type: "string" },
  { label: "Description", id: "description", type: "string" },
  { label: "Url", id: "url", type: "url" },
  { label: "Image", id: "image", type: "image" },
  {
    label: "Has Trading Incentive",
    id: "has_trading_incentive",
    type: "boolean"
  },
  { label: "Trust Score", id: "trust_score", type: "number" },
  { label: "trust_score_rank", id: "trust_score_rank", type: "number" },
  {
    label: "Trade Volume 24 Hours BTC",
    id: "trade_volume_24h_btc",
    type: "currency"
  },
  {
    label: "Trade Volume 24 Hours BTC Normalized",
    id: "trade_volume_24h_btc_normalized",
    type: "currency"
  }
];

function Coins() {
  // states
  const [exchanges, setExchanges] = useState([]);
  const [apiParams, setApiParams] = useState({
    vs_currency: "eur",
    order: "market_cap_desc",
    per_page: 10,
    page: 1,
    sparkline: false
  });
  const [shownHeaders, setShownHeaders] = useState([]);
  let [totalExchanges, setTotalExchanges] = useState(0);

  function handleShownHeaders(headers) {
    setShownHeaders(headers);
  }

  function setCurrentPage(currentPage) {
    setApiParams({ ...apiParams, page: currentPage });
  }

  function setLimit(limit) {
    setApiParams({ ...apiParams, per_page: limit });
  }

  async function fetchExchanges() {
    const paramsString = Object.entries(apiParams)
      .map(([key, val]) => `${key}=${val}`)
      .join("&");
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/exchanges?${paramsString}`
      );
      setTotalExchanges(parseInt(res.headers.get("total")));
      const data = await res.json();
      setExchanges([...data]);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchExchanges();
  }, [apiParams]);

  return (
    <div>
      <h3>Exchanges</h3>
      <ColumnScroll
        columnShown={7}
        fixLeftColumns={1}
        tableHeaders={tableHeaders}
        onUpdateShownHeaders={handleShownHeaders}
      />
      <Table
        tableHeaders={tableHeaders}
        data={exchanges}
        shownHeaders={shownHeaders}
      />
      <Pagination
        totalItems={totalExchanges}
        limit={apiParams.per_page}
        startPage={apiParams.page}
        limits={[10, 25, 50, 100, 150, 200, 250]}
        maxShownPages={15}
        onUpdatePage={setCurrentPage}
        onLimitChange={setLimit}
      />
    </div>
  );
}

export default Coins;
