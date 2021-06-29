import React, { useEffect, useState } from "react";
import "./Pagination.css";

function Pagination({
  totalItems,
  limit,
  startPage,
  limits,
  maxShownPages,
  onUpdatePage,
  showMoreLabel,
  onLimitChange
}) {
  // initialize props
  limits = limits || [5, 10, 15, 20, 25, 50, 100];
  totalItems = totalItems || 1;
  limit = limit || 10;
  startPage = startPage || 1;
  maxShownPages = maxShownPages || 24;
  showMoreLabel = showMoreLabel || "...";

  // states
  const [currentPage, setCurrentPage] = useState(startPage);
  const [pages, setPages] = useState(1);
  const [indices, setIndices] = useState([]);

  function handlePageNumberClick(page) {
    if (page.id <= 0 || page.id > pages) {
      return;
    }
    if (page.reRender) {
      setIndices(populatePageNumbers(pages, page.id));
    }
    setCurrentPage(page.id);
    if (typeof onUpdatePage === "function") {
      onUpdatePage(page.id);
    }
  }

  function handleDirectionClick(pageNo) {
    if (isNaN(pageNo) || pageNo <= 0 || pageNo > pages) {
      return;
    }
    const page = indices.find((i) => i.id === pageNo);
    if (!page) {
      return;
    }
    handlePageNumberClick(page);
  }

  function renderScrollPageNumbers(
    totalPages = pages,
    activePage = currentPage
  ) {
    const pageNos = [];
    const historyPagesCount = Math.round(maxShownPages / 4);
    if (activePage > maxShownPages - 2) {
      let start = activePage - historyPagesCount;
      let limit = start + maxShownPages - 5;
      if (limit > pages) {
        limit = pages;
        start = pages - maxShownPages + 3;
      }
      for (let i = start; i <= limit; i++) {
        pageNos.push({ id: i, label: i });
      }
      pageNos.unshift(
        { id: 1, label: 1, reRender: true },
        { id: start - 1, label: showMoreLabel, reRender: true }
      );
      if (limit !== pages) {
        pageNos.push(
          {
            id: start + maxShownPages - 4,
            label: showMoreLabel,
            reRender: true
          },
          { id: totalPages, label: totalPages, reRender: true }
        );
      }
    } else {
      for (let i = 1; i <= maxShownPages - 2; i++) {
        pageNos.push({ id: i, label: i });
      }
      pageNos.push(
        { id: maxShownPages - 1, label: showMoreLabel, reRender: true },
        { id: totalPages, label: totalPages, reRender: true }
      );
    }
    return pageNos;
  }

  function populatePageNumbers(totalPages = pages, activePage = currentPage) {
    let pageNos = [];
    if (totalPages > maxShownPages) {
      pageNos = renderScrollPageNumbers(totalPages, activePage);
    } else {
      for (let i = 1; i <= totalPages; i++) {
        pageNos.push({ id: i, label: i });
      }
    }
    return pageNos;
  }

  function renderPagination() {
    const totalPages = Math.ceil(totalItems / limit);
    setPages(totalPages);
    setIndices(populatePageNumbers(totalPages));
  }

  function handleLimitChange(elm) {
    const value = parseInt(elm.target.value);
    if (isNaN(value)) {
      return;
    }
    if (typeof onLimitChange === "function") {
      onLimitChange(value);
    }
  }

  useEffect(() => {
    renderPagination();
  }, [totalItems, limit]);

  return (
    <div className="pagination">
      <div className="page-limit-wrap">
        <label for="pageLimit">Items Per Page: </label>
        <select
          id="pageLimit"
          className="page-limit"
          onChange={(e) => handleLimitChange(e)}
        >
          {limits.map((i) => (
            <option value={i} selected={i === limit}>
              {i}
            </option>
          ))}
        </select>
      </div>
      <ul>
        <li
          className="pagination-scroll-btn"
          onClick={() => handleDirectionClick(currentPage - 1)}
        >
          {"<"}
        </li>
        {indices.map((i, index) => (
          <li
            className={`${i.id === currentPage ? "active" : ""} pagination-dot`}
            key={index}
            onClick={() => handlePageNumberClick(i)}
          >
            {i.label}
          </li>
        ))}
        <li
          className="pagination-scroll-btn"
          onClick={() => handleDirectionClick(currentPage + 1)}
        >
          {">"}
        </li>
      </ul>
    </div>
  );
}

export default Pagination;
