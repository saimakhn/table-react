import "./DataTable.css";
import React, { useState, useMemo } from "react";

const DataTable = ({ data }) => {
  /** Color mapping for Asset class field */
  const ROW_COLOR_MAPPING = {
    macro: "whiteBackground",
    equities: "blueBackground",
    credit: "greenBackground"
  };

  const DESCENDING = "descending";
  const ASCENDING = "ascending";

  const HEADER_CONFIG = [
    { key: "ticker", displayName: "Ticker" },
    { key: "price", displayName: "Price" },
    { key: "assetClass", displayName: "Asset Class" }
  ];

  /**
   * Returns object containing data sort utility and sorted data
   * @param {Array.<Object>} data
   * @param {?Object} [config]
   * @returns {Object}
   */
  const useSortedData = (data, config = null) => {
    const [sortConfig, setSortConfig] = useState(config);

    const sortedData = useMemo(() => {
      let unsortedData = [...data];
      let assetClassSortConfig = { equities: 0, macro: 1, credit: 2 };
      if (sortConfig !== null) {
        if (sortConfig.sortBy === "assetClass") {
          unsortedData.sort((a, b) => {
            let firstElem = a[sortConfig.sortBy].toLowerCase();
            let secondElem = b[sortConfig.sortBy].toLowerCase();

            if (
              assetClassSortConfig[firstElem] < assetClassSortConfig[secondElem]
            ) {
              return sortConfig.direction === ASCENDING ? -1 : 1;
            }
            if (
              assetClassSortConfig[firstElem] > assetClassSortConfig[secondElem]
            ) {
              return sortConfig.direction === ASCENDING ? 1 : -1;
            }
            return 0;
          });
        } else {
          unsortedData.sort((a, b) => {
            let firstElem = a[sortConfig.sortBy];
            let secondElem = b[sortConfig.sortBy];

            if (firstElem < secondElem) {
              return sortConfig.direction === ASCENDING ? -1 : 1;
            }
            if (firstElem > secondElem) {
              return sortConfig.direction === ASCENDING ? 1 : -1;
            }
            return 0;
          });
        }
      }
      return unsortedData;
    }, [data, sortConfig]);

    const SortField = sortBy => {
      let direction = ASCENDING;
      if (
        sortConfig &&
        sortConfig.sortBy === sortBy &&
        sortConfig.direction === ASCENDING
      ) {
        direction = DESCENDING;
      }
      setSortConfig({ sortBy, direction });
    };

    return { sortedData, SortField, sortConfig };
  };

  /**
   * Returns current sort order of the selected field
   * @param {string} sortBy
   * @returns {string}
   */
  const getSortDirection = sortBy => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.sortBy === sortBy ? sortConfig.direction : "";
  };

  const { sortedData, SortField, sortConfig } = useSortedData(data);

  return (
    <table>
      <thead>
        <tr>
          {HEADER_CONFIG.map(field => (
            <th key={field.key}>
              <button
                className={getSortDirection(field.key)}
                onClick={() => SortField(field.key)}
                type="button"
              >
                {field.displayName}
              </button>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map(data => (
          <tr
            key={data.id}
            className={ROW_COLOR_MAPPING[data.assetClass.toLowerCase()]}
          >
            <td>{data.ticker}</td>
            <td className={data.price < 0 ? "redText" : ""}>{data.price}</td>
            <td>{data.assetClass}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
