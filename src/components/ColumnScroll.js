import React, { useEffect, useState } from "react";
import "./ColumnScroll.css";

let start = 0;

function ColumnScroll({
  tableHeaders,
  fixLeftColumns,
  columnShown,
  onUpdateShownHeaders
}) {
  // states
  const [shownHeaders, setShownHeaders] = useState([]);

  // initialize props
  fixLeftColumns = fixLeftColumns || null;
  tableHeaders = tableHeaders || [];
  columnShown = columnShown || 5;

  function moveRight() {
    if (start + columnShown === tableHeaders.length) {
      return;
    }
    start = start + 1;
    renderColumns();
  }

  function moveLeft() {
    if (start === 0) {
      return;
    }
    start = start - 1;
    renderColumns();
  }

  function moveToColumn(index) {
    let moveTo = index - 1;
    if (moveTo < 0) {
      moveTo = 0;
    }
    if (moveTo + columnShown >= tableHeaders.length) {
      moveTo = tableHeaders.length - columnShown;
    }
    start = moveTo;
    renderColumns();
  }

  function renderColumns(limit = columnShown) {
    let columns = [];
    if (fixLeftColumns && fixLeftColumns > 0) {
      const headers = [];
      tableHeaders.forEach((header, i) => {
        if (i >= fixLeftColumns) {
          headers.push(header);
        } else {
          columns.push(header);
        }
      });
      columns = [...columns, ...headers.splice(start, limit - fixLeftColumns)];
    } else {
      columns = tableHeaders.splice(start, limit);
    }
    setShownHeaders(columns);
    onUpdateShownHeaders(columns);
  }

  useEffect(() => {
    renderColumns();
  }, []);

  return (
    <div className="column-scroll-wrap">
      <ul className="column-scroll">
        <li className="column-scroll-btn" onClick={() => moveLeft()}>
          {"<"}
        </li>
        {tableHeaders.map((header, index) => (
          <li
            onClick={() => moveToColumn(index)}
            className={`column-dot ${
              shownHeaders.findIndex((i) => i.id === header.id) > -1
                ? "active"
                : ""
            }`}
            key={index}
            title={header.label}
          ></li>
        ))}
        <li className="column-scroll-btn" onClick={() => moveRight()}>
          {">"}
        </li>
      </ul>
    </div>
  );
}

export default ColumnScroll;
