import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import ColumnScroll from "../components/ColumnScroll";
import Pagination from "../components/Pagination";
import "./Coins.css";

const tableHeaders = [
  { id: "name", label: "Name", type: "string" },
  { id: "id", label: "ID", type: "string" },
  { id: "symbol", label: "Symbol", type: "string" },
  { id: "image", label: "Image", type: "image" },
  { id: "current_price", label: "Current Price", type: "currency" },
  { id: "market_cap", label: "Market Capital", type: "number" },
  { id: "market_cap_rank", label: "Market Capital Rank", type: "number" },
  {
    id: "fully_diluted_valuation",
    label: "Fully Diluted Valuation",
    type: "number"
  },
  { id: "total_volume", label: "Total volume", type: "currency" },
  { id: "high_24h", label: "High 24 Hours", type: "currency" },
  { id: "low_24h", label: "Low 24 Hours", type: "currency" },
  {
    id: "price_change_24h",
    label: "Price Change 24 Hours",
    type: "currency"
  },
  {
    id: "price_change_percentage_24h",
    label: "Price Change Percentage 24 Hours",
    type: "percentage"
  },
  {
    id: "market_cap_change_24h",
    label: "Market Capital Change 24 Hours",
    type: "number"
  },
  {
    id: "market_cap_change_percentage_24h",
    label: "Market Capital Change Percentage 24 Hours",
    type: "percentage"
  },
  { id: "circulating_supply", label: "Circulating Supply", type: "number" },
  { id: "total_supply", label: "Total Supply", type: "number" },
  { id: "max_supply", label: "Max Supply", type: "number" },
  { id: "ath", label: "ATH", type: "number" },
  {
    id: "ath_change_percentage",
    label: "ATH Change Percentage",
    type: "percentage"
  },
  { id: "atl", label: "ATL", type: "number" },
  {
    id: "atl_change_percentage",
    label: "ATL Change Percentage",
    type: "percentage"
  },
  { id: "atl_date", label: "ATL Date", type: "date" },
  { id: "roi", label: "ROI", type: "object" },
  { id: "last_updated", label: "Last Updated", type: "date" }
];

const sortBy = [
  "gecko_desc",
  "gecko_asc",
  "market_cap_asc",
  "market_cap_desc",
  "volume_asc",
  "volume_desc",
  "id_asc",
  "id_desc"
];

function Coins() {
  // states
  const [coins, setCoins] = useState([]);
  const [apiParams, setApiParams] = useState({
    vs_currency: "eur",
    order: "market_cap_desc",
    per_page: 25,
    page: 1,
    sparkline: false
  });
  const [shownHeaders, setShownHeaders] = useState([]);
  let [totalCoins, setTotalCoins] = useState(0);

  function handleShownHeaders(headers) {
    setShownHeaders(headers);
  }

  function setCurrentPage(currentPage) {
    setApiParams({ ...apiParams, page: currentPage });
  }

  function setLimit(limit) {
    setApiParams({ ...apiParams, per_page: limit });
  }

  async function fetchCoins() {
    const params = {
      include_platform: true
    };
    const paramsString = Object.entries(params)
      .map(([key, val]) => `${key}=${val}`)
      .join("&");
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/list?${paramsString}`
    );
    const data = await res.json();
    setTotalCoins(data.length);
  }

  async function fetchCoinsData() {
    const paramsString = Object.entries(apiParams)
      .map(([key, val]) => `${key}=${val}`)
      .join("&");
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?${paramsString}`
    );
    const data = await res.json();
    setCoins([...data]);
  }

  useEffect(() => {
    fetchCoins();
  }, []);

  useEffect(() => {
    fetchCoinsData();
  }, [apiParams]);

  return (
    <div>
      <h3>Coins</h3>
      <ColumnScroll
        columnShown={7}
        fixLeftColumns={1}
        tableHeaders={tableHeaders}
        onUpdateShownHeaders={handleShownHeaders}
      />
      <Table
        tableHeaders={tableHeaders}
        data={coins}
        shownHeaders={shownHeaders}
      />
      <Pagination
        totalItems={totalCoins}
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
