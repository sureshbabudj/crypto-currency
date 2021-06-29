import React from "react";
import TableCell from "./TableCell";
import "./Table.css";

function Table({ tableHeaders, shownHeaders, data }) {
  tableHeaders = tableHeaders || [];
  shownHeaders = shownHeaders || tableHeaders;
  data = data || [];

  return (
    <div className="column-scroll-table-wrap">
      <table className="column-scroll-table">
        <thead>
          <tr>
            {shownHeaders.map((header) => (
              <th key={`th-${header.id}`}>{header.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((val, i) => (
            <tr key={`tr-${i}`}>
              {shownHeaders.map((header) => (
                <TableCell
                  key={`td-${header.id}`}
                  cellData={val}
                  header={header}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
