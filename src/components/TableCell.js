import React from "react";

function TableCell({ cellData, header }) {
  function renderContent() {
    switch (header.type) {
      case "string":
        return cellData[header.id];
      case "number":
        return cellData[header.id];
      case "percentage":
        return `${cellData[header.id]} %`;
      case "date":
        return new Date(cellData[header.id]).toDateString();
      case "url":
        return (
          <a href={cellData[header.id]} target="_blank">
            View
          </a>
        );
      case "boolean":
        return <p>{cellData[header.id].toString()} </p>;
      case "image":
        return (
          <img src={cellData[header.id]} alt={header.label} width="30px" />
        );
      case "currency":
        return <p style={{ textAlign: "right" }}>{cellData[header.id]}</p>;
      case "object":
        return <pre>{JSON.stringify(cellData[header.id])}</pre>;
      default:
        return "-";
    }
  }
  return (
    <td>
      {cellData[header.id] !== undefined &&
      cellData[header.id] !== null &&
      cellData[header.id] !== "" ? (
        <span>{renderContent()}</span>
      ) : (
        <span> - </span>
      )}
    </td>
  );
}

export default TableCell;
