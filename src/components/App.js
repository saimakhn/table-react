import DataTable from "./DataTable";
import ErrorPage from "./ErrorPage";
import React, { useState, useEffect } from "react";

/**  Static sample data Json  */

const SAMPLE_DATA_URL = "./sampleData.json";

function App() {
  const [sampledata, setSampleData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [err, setError] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  /**  Fetches data and sets error and loading state */

  async function getData() {
    try {
      const response = await fetch(SAMPLE_DATA_URL);
      const data = await response.json();
      setLoading(false);
      setSampleData(data);

      // uncomment to test error page here
      // throw new Error("Server responds with error!");
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <a className="logo" href="#">
          &#9819;
        </a>
        <nav>
          <a>&#9827;</a>
          <a>&#9728;</a>
          <a>&#9743;</a>
        </nav>
      </header>
      <div className="app-content">
        {err && <ErrorPage err={err.message} />}
        {isLoading && <div className="loader"></div>}
        {sampledata && <DataTable data={sampledata} />}
      </div>
    </div>
  );
}

export default App;
